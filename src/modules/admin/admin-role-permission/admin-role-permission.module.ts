import { Module } from '@nestjs/common';
import { AdminRolePermissionService } from './admin-role-permission.service';
import { AdminRolePermissionController } from './admin-role-permission.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolePermissionMap } from 'src/entities/role-permission-map.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RolePermissionMap])],
  controllers: [AdminRolePermissionController],
  providers: [AdminRolePermissionService],
})
export class AdminRolePermissionModule {}
