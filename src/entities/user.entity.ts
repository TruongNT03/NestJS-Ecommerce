import { Exclude } from 'class-transformer';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { RoleEntity } from './role.entity';
import { AbstractEntity } from './abstract.entity';
import { Notification } from './notification.entity';
import { Conversation } from './conversation.entity';
import { Cart } from 'src/entities/cart.entity';
import { Address } from './address.entity';
import { Order } from './order.entity';

export const TableName = 'users';

@Entity(TableName)
export class UserEntity extends AbstractEntity<UserEntity> {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    unique: true,
  })
  email: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  avatar: string;

  @Exclude()
  @Column()
  password: string;

  @OneToMany(() => Notification, (notification) => notification.user)
  notifications: Notification;

  @ManyToMany(() => RoleEntity, (role) => role.users)
  @JoinTable({
    name: 'user_role',
    joinColumn: { name: 'user_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'role_id', referencedColumnName: 'id' },
  })
  roles: RoleEntity[];

  @ManyToMany(() => Conversation, (conversation) => conversation.users)
  @JoinTable({
    name: 'user_conversations',
    joinColumn: { name: 'user_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'conversation_id', referencedColumnName: 'id' },
  })
  conversations: Conversation[];

  @OneToOne(() => Cart, (cart) => cart.user)
  cart: Cart;

  @OneToMany(() => Address, (address) => address.user)
  addresses: Address[];

  @OneToMany(() => Order, (order) => order.user)
  order: Order[];
}
