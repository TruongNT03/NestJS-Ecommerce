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
import { UserGender } from 'src/modules/auth/dto/request/update-profile.dto';
import { Review } from './review.entity';
import { LoginType } from 'src/common/enum/login-type.enum';
import { UserMetaData } from 'src/common/dto/user-meta-data.dto';
import { UserVoucher } from './user-voucher.entity';
import { Voucher } from './voucher.entity';

export const TableName = 'users';

@Entity(TableName)
export class UserEntity extends AbstractEntity<UserEntity> {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  name: string;

  @Column()
  phoneNumber: string;

  @Column()
  avatar: string;

  @Exclude()
  @Column({ nullable: true })
  password: string;

  @Column()
  gender: UserGender;

  @Column()
  loginType: LoginType;

  @Column({ type: 'jsonb' })
  metaData: UserMetaData;

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

  @OneToMany(() => Review, (review) => review.user)
  reviews: Review[];

  @OneToMany(() => UserVoucher, (userVoucher) => userVoucher.user)
  vouchers: Voucher[];
}
