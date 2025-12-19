import { Inject, Injectable } from '@nestjs/common';
import { BaseService } from 'src/base.service';
import { AdminListRolePermissionQueryDto } from './dto/request/list-role-permission-query.dto';
import { AdminListRolePermissionResponseDto } from './dto/response/admin-list-role-permission-response.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { RolePermissionMap } from 'src/entities/role-permission-map.entity';
import { DataSource, Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { UpdateRolePermissionDto } from './dto/request/update-role-permission.dto';
import { SuccessResponseDto } from 'src/common/dto/success-response.dto';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { ServerException } from 'src/exceptions/sever.exception';
import { ERROR_RESPONSE } from 'src/common/constants/error-response.constants';

@Injectable()
export class AdminRolePermissionService extends BaseService {
  constructor(
    @InjectRepository(RolePermissionMap)
    private readonly rolePermissionMapRepo: Repository<RolePermissionMap>,
    private readonly dataSource: DataSource,
    @Inject(WINSTON_MODULE_PROVIDER)
    private readonly logger: Logger,
  ) {
    super();
  }

  async findAll(dto: AdminListRolePermissionQueryDto): Promise<AdminListRolePermissionResponseDto> {
    const { page, pageSize, module, role } = dto;

    const queryBuilder = this.rolePermissionMapRepo
      .createQueryBuilder('rpm')
      .leftJoinAndSelect('rpm.role', 'r');

    if (module) {
      queryBuilder.where('rpm.module = :module', { module });
    }
    if (role) {
      queryBuilder.andWhere('r.name = :role', { role });
    }

    const { data, paginate } = await this.paginate(queryBuilder, page, pageSize);

    return plainToInstance(AdminListRolePermissionResponseDto, {
      data,
      paginate,
    });
  }

  async updateList(dto: UpdateRolePermissionDto[]): Promise<SuccessResponseDto> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      await Promise.all(
        dto.map(async (rolePermission) => {
          await queryRunner.manager.update(
            RolePermissionMap,
            {
              id: rolePermission.id,
            },
            {
              isCreate: rolePermission.isCreate,
              isRead: rolePermission.isRead,
              isUpdate: rolePermission.isUpdate,
              isDelete: rolePermission.isDelete,
            },
          );
        }),
      );

      await queryRunner.commitTransaction();
      return this.successResponse();
    } catch (error) {
      this.logger.error('Fail to update list Role Permission', {
        context: 'AdminRolePermissionService.updateList',
        error,
      });
      await queryRunner.rollbackTransaction();
      throw new ServerException({ ...ERROR_RESPONSE.BAD_REQUEST, ...error });
    } finally {
      await queryRunner.release();
    }
  }
}
