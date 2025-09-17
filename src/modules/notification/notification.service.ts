import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Notification } from 'src/entities/notification.entity';
import { Repository } from 'typeorm';
import { NotificationGateway } from 'src/modules/notification/notification.gateway';
import { SaveNotificationDto } from 'src/modules/notification/dto/request/save-notification.dto';
import { RoleType } from 'src/common/enum/role.enum';
import { UserEntity } from 'src/entities/user.entity';

@Injectable()
export class NotificationService {
  constructor(
    private readonly notificationGateway: NotificationGateway,
    @InjectRepository(Notification)
    private readonly notificationRepo: Repository<Notification>,
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
  ) {}
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
}
