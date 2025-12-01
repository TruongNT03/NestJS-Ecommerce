import { Injectable } from '@nestjs/common';
import { UserListResponseDto } from './response/list-user-response.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { Brackets, Repository } from 'typeorm';
import {
  AdminUserQueryDto,
  AdminUserQuerySortField,
} from './request/admin-user-query.dto';
import { BaseService } from 'src/base.service';
import { plainToInstance } from 'class-transformer';
import { UserResponseDto } from 'src/modules/user/dto/response/user-response.dto';

@Injectable()
export class AdminUserService extends BaseService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
  ) {
    super();
  }
  async findAll(query: AdminUserQueryDto): Promise<UserListResponseDto> {
    return await this.queryBuilderGetAll(query);
  }

  private async queryBuilderGetAll(
    query: AdminUserQueryDto,
  ): Promise<UserListResponseDto> {
    const { page, pageSize, search, sortBy, sortOrder } = query;
    const queryBuilder = this.userRepo
      .createQueryBuilder('u')
      .leftJoinAndSelect('u.roles', 'ur');

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

    const { data, paginate } = await this.paginate(
      queryBuilder,
      page,
      pageSize,
    );

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
}
