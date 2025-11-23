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
import { Order } from './order.entity';

export const TableName = 'addresses';

@Entity(TableName)
export class Address extends AbstractEntity<Address> {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  userId: string;

  @Column()
  detail: string;

  @Column()
  phoneNumber: string;

  @Column()
  name: string;

  @Column()
  isDefault: boolean;

  @ManyToOne(() => UserEntity, (user) => user.addresses)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: UserEntity;

  @OneToMany(() => Order, (order) => order.address)
  order: Order[];
}
