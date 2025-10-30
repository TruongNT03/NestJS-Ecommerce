import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AbstractEntity } from './abstract.entity';
import { UserEntity } from './user.entity';
import { Address } from './address.entity';
import { OrderItem } from './order-item.entity';
import { OrderStatus } from 'src/common/enum/order-status.enum';
import { PaymentType } from 'src/common/enum/payment-type.enum';

export const TableName = 'orders';

@Entity(TableName)
export class Order extends AbstractEntity<Order> {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  userId: string;

  @Column('uuid')
  addressId: string;

  @Column()
  status: OrderStatus;

  @Column()
  orderCode: string;

  @ManyToOne(() => UserEntity, (user) => user.order)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: UserEntity;

  @ManyToOne(() => Address, (address) => address.order)
  @JoinColumn({ name: 'address_id', referencedColumnName: 'id' })
  address: Address;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order)
  orderItems: OrderItem[];
}
