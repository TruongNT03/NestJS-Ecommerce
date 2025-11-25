import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AbstractEntity } from './abstract.entity';
import { PaymentType } from 'src/common/enum/payment-type.enum';
import { PaymentStatus } from 'src/common/enum/payment-status.enum';
import { Order } from './order.entity';

export const TableName = 'payments';

@Entity(TableName)
export class Payment extends AbstractEntity<Payment> {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  orderId: string;

  @Column()
  paymentType: PaymentType;

  @Column()
  qrImageUrl: string;

  @Column()
  amount: number;

  @Column({ default: 'VND' })
  currency: string;

  @Column()
  status: PaymentStatus;

  @Column()
  orderCode: string;

  @OneToOne(() => Order, (order) => order.payment)
  @JoinColumn({ name: 'order_id', referencedColumnName: 'id' })
  order: Order;
}
