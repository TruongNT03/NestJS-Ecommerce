import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Notification } from 'src/entities/notification.entity';
import { Brackets, Repository } from 'typeorm';
import { NotificationGateway } from 'src/modules/notification/notification.gateway';
import { SaveNotificationDto } from 'src/modules/notification/dto/request/save-notification.dto';
import { RoleType } from 'src/common/enum/role.enum';
import { UserEntity } from 'src/entities/user.entity';
import { ListNotificationQueryDto } from './dto/request/list-notification-query.dto';
import { UserRequestPayload } from '../auth/auth.interface';
import { BaseService } from 'src/base.service';
import { ListNotificationResponseDto } from './dto/response/list-notification-response.dto';
import { plainToInstance } from 'class-transformer';
import { TotalUnreadNotificationResponseDto } from './dto/response/total-unread-response.dto';
import { SuccessResponseDto } from 'src/common/dto/success-response.dto';
import { NotificationDuration } from 'src/common/enum/notification.enum';

@Injectable()
export class NotificationService extends BaseService {
  constructor(
    private readonly notificationGateway: NotificationGateway,
    @InjectRepository(Notification)
    private readonly notificationRepo: Repository<Notification>,
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
  ) {
    super();
  }

  async create(dto: SaveNotificationDto): Promise<Notification> {
    const { userId, alertTo } = dto;
    if (!userId) {
      // Notification to all user by role
      const userListByRole = await this.getUserListByRole(alertTo);
      await Promise.all(
        userListByRole.map(async (user) => {
          const notification = await this.notificationRepo.save({
            ...dto,
            userId: user.id,
          });
          // Send notification real-time by socket gateway
          await this.notificationGateway.sendToUserId(user.id, notification);
        }),
      );
    } else {
      // Notification to single userId
      const notification = await this.notificationRepo.save({
        ...dto,
      });
      // Send notification real-time by socket gateway
      await this.notificationGateway.sendToUserId(userId, notification);
    }
    return;
  }

  private async getUserListByRole(roleType: RoleType): Promise<UserEntity[]> {
    const queryBuilder = this.userRepo
      .createQueryBuilder('u')
      .leftJoinAndSelect('u.roles', 'r')
      .where('r.name = :name', { name: roleType });
    return await queryBuilder.getMany();
  }

  async findAll(
    dto: ListNotificationQueryDto,
    user: UserRequestPayload,
  ): Promise<ListNotificationResponseDto> {
    const { page, pageSize } = dto;

    const queryBuilder = this.notificationRepo
      .createQueryBuilder('notification')
      .where('notification.userId = :userId', { userId: user.id })
      .andWhere(
        new Brackets((qb) => {
          qb.where('notification.duration != :oneOff', {
            oneOff: NotificationDuration.ONE_OFF,
          }).orWhere(
            new Brackets((qb2) => {
              qb2
                .where('notification.duration = :oneOff', {
                  oneOff: NotificationDuration.ONE_OFF,
                })
                .andWhere('notification.isRead = false');
            }),
          );
        }),
      )
      .orderBy('notification.createdAt', 'DESC');

    const { data, paginate } = await this.paginate(queryBuilder, page, pageSize);

    return plainToInstance(ListNotificationResponseDto, {
      data,
      paginate,
    });
  }

  async getTotalUnreadNotification(
    user: UserRequestPayload,
  ): Promise<TotalUnreadNotificationResponseDto> {
    const totalUnreadNotification = await this.notificationRepo
      .createQueryBuilder('notification')
      .where('notification.userId = :userId', { userId: user.id })
      .andWhere('notification.isRead IS FALSE')
      .getCount();

    return plainToInstance(TotalUnreadNotificationResponseDto, {
      totalUnread: totalUnreadNotification,
    });
  }

  async markAllRead(user: UserRequestPayload): Promise<SuccessResponseDto> {
    await this.notificationRepo.update({ userId: user.id, isRead: false }, { isRead: true });

    return this.successResponse();
  }

  async markRead(user: UserRequestPayload, notificationId: string): Promise<SuccessResponseDto> {
    await this.notificationRepo.update({ id: notificationId, userId: user.id }, { isRead: true });
    return this.successResponse();
  }
}
