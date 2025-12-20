import { Injectable } from '@nestjs/common';
import { UserListResponseDto } from './response/list-user-response.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { Brackets, In, Repository } from 'typeorm';
import {
  AdminUserQueryDto,
  AdminUserQueryRoleType,
  AdminUserQuerySortField,
} from './request/admin-user-query.dto';
import { BaseService } from 'src/base.service';
import { plainToInstance } from 'class-transformer';
import { UserResponseDto } from 'src/modules/user/dto/response/user-response.dto';
import { AdminCreateUserDto } from './request/admin-create-user.dto';
import { SuccessResponseDto } from 'src/common/dto/success-response.dto';
import * as passwordGenerator from 'generate-password';
import { hashingPassword } from 'src/common/utils/hash.util';
import { MailQueueProducer } from 'src/modules/shared/queue/mail/mail-queue.producer';
import { RoleEntity } from 'src/entities/role.entity';
import { LoginType } from 'src/common/enum/login-type.enum';
import { RoleType } from 'src/common/enum/role.enum';

@Injectable()
export class AdminUserService extends BaseService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
    private readonly mailQueueProducer: MailQueueProducer,
    @InjectRepository(RoleEntity)
    private readonly roleRepo: Repository<RoleEntity>,
  ) {
    super();
  }
  async findAll(query: AdminUserQueryDto): Promise<UserListResponseDto> {
    return await this.queryBuilderGetAll(query);
  }

  private async queryBuilderGetAll(query: AdminUserQueryDto): Promise<UserListResponseDto> {
    const { page, pageSize, search, sortBy, sortOrder, roleType } = query;
    const queryBuilder = this.userRepo.createQueryBuilder('u').leftJoinAndSelect('u.roles', 'ur');

    if (search) {
      queryBuilder.where(
        new Brackets((qb) =>
          qb
            .where('LOWER(u.email) LIKE :search', {
              search: `%${search.toLowerCase()}%`,
            })
            .orWhere('LOWER(u.phoneNumber) LIKE :search', {
              search: `%${search.toLowerCase()}%`,
            })
            .orWhere('LOWER(u.name) LIKE :search', {
              search: `%${search.toLowerCase()}%`,
            }),
        ),
      );
    }

    if (roleType) {
      if (roleType === AdminUserQueryRoleType.ADMIN) {
        queryBuilder.andWhere('ur.name IN (:...roles)', {
          roles: [
            RoleType.ADMIN,
            RoleType.ORDER_MANAGER,
            RoleType.TECHNICIAN,
            RoleType.PRODUCT_MANAGER,
          ],
        });
      } else if (roleType == AdminUserQueryRoleType.USER) {
        queryBuilder.andWhere('ur.name = :userRole', { userRole: RoleType.USER });
      }
    } else {
      queryBuilder.andWhere('ur.name = :userRole', { userRole: RoleType.USER });
    }

    const sortByFieldMap: Record<AdminUserQuerySortField, string> = {
      [AdminUserQuerySortField.NAME]: 'u.name',
      [AdminUserQuerySortField.EMAIL]: 'u.email',
      [AdminUserQuerySortField.GENDER]: 'u.gender',
      [AdminUserQuerySortField.PHONE]: 'u.phoneNumber',
      [AdminUserQuerySortField.CREATED_AT]: 'u.createdAt',
    };

    const sortField = sortByFieldMap[sortBy];

    if (sortField) {
      queryBuilder.orderBy(sortField, sortOrder || 'DESC');
    } else {
      queryBuilder.orderBy('u.createdAt', 'DESC');
    }

    const { data, paginate } = await this.paginate(queryBuilder, page, pageSize);

    return plainToInstance(UserListResponseDto, {
      data: data.map((user) =>
        plainToInstance(UserResponseDto, {
          ...user,
          roles: user.roles.map((role) => role.name),
        }),
      ),
      paginate,
    });
  }

  async create(dto: AdminCreateUserDto): Promise<SuccessResponseDto> {
    const { email, locationId, name, roles, gender, phoneNumber } = dto;
    const password = passwordGenerator.generate({
      length: 8,
      numbers: true,
      symbols: true,
      uppercase: true,
      lowercase: true,
      strict: true,
    });
    const hashPassword = hashingPassword(password);
    const roleEntities = await this.roleRepo.find({
      where: {
        name: In(roles),
      },
    });
    const user = await this.userRepo.save({
      email,
      password: hashPassword,
      name,
      roles: roleEntities,
      locationId,
      phoneNumber,
      gender,
      loginType: LoginType.DEFAULT,
    });

    await this.mailQueueProducer.sendAccount(password, email);

    return this.successResponse();
  }
}
