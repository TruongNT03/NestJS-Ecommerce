import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from './user.entity';
import { AbstractEntity } from './abstract.entity';
import { RoleType } from '../common/enum/role.enum';

export const TableName = 'notifications';

@Entity(TableName)
export class Notification extends AbstractEntity<Notification> {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column()
  alertTo: RoleType;

  @Column()
  triggerBy: string;

  @Column()
  navigateTo: string;

  @Column()
  isRead: boolean;

  @Column({ type: 'jsonb' })
  meta: any;

  @Column()
  userId: string;

  @ManyToOne(() => UserEntity, (user) => user.notifications)
  user: UserEntity;
}
