import { SetMetadata } from '@nestjs/common';
import { ModuleEnum } from 'src/common/enum/module.enum';

export enum ActionPermission {
  CREATE = 'isCreate',
  READ = 'isRead',
  UPDATE = 'isUpdate',
  DELETE = 'isDelete',
}

export interface RolePermissionType {
  module: ModuleEnum;
  permission: ActionPermission;
}

export const ROLE_PERMISSION = 'role_permission';

export const RolePermission = (data: RolePermissionType) =>
  SetMetadata<string, RolePermissionType>(ROLE_PERMISSION, data);
