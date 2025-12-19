import { Module } from '@nestjs/common';
import { RolePermissionService } from './role-permission.service';
import { RolePermissionController } from './role-permission.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolePermissionMap } from 'src/entities/role-permission-map.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RolePermissionMap])],
  controllers: [RolePermissionController],
  providers: [RolePermissionService],
})
export class RolePermissionModule {}
