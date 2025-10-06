import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from './product.entity';

export const TableName = 'product_images';

@Entity(TableName)
export class ProductImage {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  url: string;

  @Column()
  productId: string;

  @ManyToOne(() => Product, (product) => product.productImages)
  @JoinColumn({ name: 'product_id' })
  product: Product;
}
