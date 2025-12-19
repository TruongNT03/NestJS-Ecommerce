import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { AbstractEntity } from './abstract.entity';
import { UserEntity } from './user.entity';
import { RolePermissionMap } from './role-permission-map.entity';

export const TableName = 'roles';

@Entity(TableName)
export class RoleEntity extends AbstractEntity<RoleEntity> {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => UserEntity, (user) => user.roles)
  @JoinTable({ name: 'user_role' })
  users: UserEntity[];

  @OneToMany(() => RolePermissionMap, (rolePermissionMap) => rolePermissionMap.role)
  rolePermissionMaps: RolePermissionMap[];
}
