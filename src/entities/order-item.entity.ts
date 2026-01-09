import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Order } from './order.entity';
import { ProductVariant } from './product-variant.entity';

export const TableName = 'order_items';

@Entity(TableName)
export class OrderItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  orderId: string;

  @Column()
  productVariantId: string;

  @Column()
  currentPrice: number;

  @Column()
  currentDiscount: number;

  @Column()
  quantity: number;

  @Column()
  isReviewed: boolean;

  @ManyToOne(() => Order, (order) => order.orderItems)
  @JoinColumn({ name: 'order_id', referencedColumnName: 'id' })
  order: Order;

  @OneToOne(() => ProductVariant, (productVariant) => productVariant.orderItem)
  @JoinColumn({ name: 'product_variant_id', referencedColumnName: 'id' })
  productVariant: ProductVariant;
}
