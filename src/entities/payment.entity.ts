import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { AbstractEntity } from './abstract.entity';
import { PaymentType } from 'src/common/enum/payment-type.enum';
import { PaymentStatus } from 'src/common/enum/payment-status.enum';

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
  amount: number;

  @Column({ default: 'VND' })
  currency: string;

  @Column()
  status: PaymentStatus;
}
