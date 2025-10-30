import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AbstractEntity } from 'src/entities/abstract.entity';
import { Product } from 'src/entities/product.entity';
import { VariantValue } from 'src/entities/variant-value.entity';
import { OrderItem } from './order-item.entity';

export const TableName = 'product_variants';

@Entity(TableName)
export class ProductVariant extends AbstractEntity<ProductVariant> {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  productId: string;

  @Column()
  price: number;

  @Column()
  sku: string;

  @Column()
  stock: number;

  @ManyToOne(() => Product, (product) => product.productVariants)
  @JoinColumn()
  product: Product;

  @ManyToMany(() => VariantValue)
  @JoinTable({
    name: 'product_variant_values',
    joinColumn: {
      name: 'product_variant_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'variant_value_id',
      referencedColumnName: 'id',
    },
  })
  variantValues: VariantValue[];

  @OneToOne(() => OrderItem, (orderItem) => orderItem.productVariant)
  orderItem: OrderItem;
}
