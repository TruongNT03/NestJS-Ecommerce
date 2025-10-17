import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { AbstractEntity } from 'src/entities/abstract.entity';
import { CartItem } from 'src/entities/cart-item.entity';

export const TableName = 'carts';

@Entity(TableName)
export class Cart extends AbstractEntity<Cart> {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @OneToOne(() => UserEntity, (user) => user.cart)
  user: UserEntity;

  @OneToMany(() => CartItem, (cartItem) => cartItem.cart)
  cartItems: CartItem[];
}
