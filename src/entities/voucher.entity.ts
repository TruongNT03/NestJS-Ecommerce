import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserVoucher } from './user-voucher.entity';
import { Order } from './order.entity';

export const TableName = 'vouchers';

export enum VoucherType {
  FIXED = 'fixed',
  PERCENT = 'percent',
}

@Entity(TableName)
export class Voucher {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  code: string;

  @Column()
  type: VoucherType;

  @Column()
  discountValue: number;

  @Column()
  maxDiscountValue?: number;

  @Column()
  minOrderValue?: number;

  @Column()
  stock: number;

  @Column()
  expiryAt: Date;

  @Column()
  totalUsed: number;

  @Column()
  campaignName: string;

  @Column()
  description: string;

  @Column()
  isPublic: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => UserVoucher, (userVoucher) => userVoucher.voucher)
  userVouchers: UserVoucher[];

  @OneToMany(() => Order, (order) => order.voucher)
  orders: Order[];
}
