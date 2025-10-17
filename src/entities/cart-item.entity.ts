import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AbstractEntity } from 'src/entities/abstract.entity';
import { Cart } from 'src/entities/cart.entity';

export const TableName = 'cart_items';

@Entity(TableName)
export class CartItem extends AbstractEntity<CartItem> {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  cartId: string;

  @Column()
  productVariantId: string;

  @Column()
  quantity: number;

  @ManyToOne(() => Cart, (cart) => cart.cartItems)
  @JoinColumn({ name: 'cart_id', referencedColumnName: 'id' })
  cart: Cart;
}
