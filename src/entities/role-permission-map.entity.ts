import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { AbstractEntity } from './abstract.entity';
import { ModuleEnum } from 'src/common/enum/module.enum';
import { RoleEntity } from './role.entity';

export const TableName = 'role_permission_maps';

@Entity(TableName)
export class RolePermissionMap extends AbstractEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  roleId: number;

  @Column()
  module: ModuleEnum;

  @Column()
  isCreate: boolean;

  @Column()
  isRead: boolean;

  @Column()
  isUpdate: boolean;

  @Column()
  isDelete: boolean;

  @ManyToOne(() => RoleEntity, (role) => role.rolePermissionMaps)
  @JoinColumn({ name: 'role_id', referencedColumnName: 'id' })
  role: RoleEntity;
}
