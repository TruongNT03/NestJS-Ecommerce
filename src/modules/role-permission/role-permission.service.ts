import { Injectable } from '@nestjs/common';
import { UserRequestPayload } from '../auth/auth.interface';
import { AdminRolePermissionResponseDto } from '../admin/admin-role-permission/dto/response/admin-role-permission-response.dto';
import { BaseService } from 'src/base.service';
import { InjectRepository } from '@nestjs/typeorm';
import { RolePermissionMap } from 'src/entities/role-permission-map.entity';
import { In, Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class RolePermissionService extends BaseService {
  constructor(
    @InjectRepository(RolePermissionMap)
    private readonly rolePermissionMapRepo: Repository<RolePermissionMap>,
  ) {
    super();
  }

  async getSelfRolePermission(user: UserRequestPayload): Promise<AdminRolePermissionResponseDto[]> {
    const userRoles = user.roles || [];

    const result = await this.rolePermissionMapRepo.find({
      where: {
        role: {
          name: In(userRoles),
        },
      },
      relations: ['role'],
    });

    return plainToInstance(AdminRolePermissionResponseDto, result);
  }
}
