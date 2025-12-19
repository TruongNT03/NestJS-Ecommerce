import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request, Response } from 'express';
import { ERROR_RESPONSE } from 'src/common/constants/error-response.constants';
import { IS_PUBLIC } from 'src/decorators/public.decorator';
import { ROLE_PERMISSION, RolePermissionType } from 'src/decorators/role-permission.decorator';
import { RolePermissionMap } from 'src/entities/role-permission-map.entity';
import { ServerException } from 'src/exceptions/sever.exception';
import { UserRequestPayload } from 'src/modules/auth/auth.interface';
import { DataSource } from 'typeorm';

@Injectable()
export class RolePermissionGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly dataSource: DataSource,
  ) {}
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<Request>();
    const response = context.switchToHttp().getRequest<Response>();

    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC, [
      context.getClass(),
      context.getHandler(),
    ]);
    if (isPublic) {
      return true;
    }

    const user: UserRequestPayload = request.user as UserRequestPayload;
    const userRoles = user?.roles || [];

    const rolePermission = this.reflector.getAllAndOverride<RolePermissionType>(ROLE_PERMISSION, [
      context.getClass(),
      context.getHandler(),
    ]);
    if (!rolePermission) {
      return true;
    }

    const { module, permission } = rolePermission;
    let isAccept: boolean = false;
    await Promise.all(
      userRoles.map(async (role) => {
        const permissionEntity = await this.dataSource.manager.findOne(RolePermissionMap, {
          where: {
            module,
            role: {
              name: role,
            },
          },
        });
        if (permissionEntity[permission]) {
          isAccept = true;
        }
      }),
    );
    if (isAccept) {
      return true;
    }

    throw new ServerException(ERROR_RESPONSE.ACCESS_DENIED);
  }
}
