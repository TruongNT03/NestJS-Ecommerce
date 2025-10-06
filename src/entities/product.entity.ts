import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AbstractEntity } from 'src/entities/abstract.entity';
import { Categories } from 'src/entities/categories.entity';
import { ProductVariant } from 'src/entities/product-variant.entity';
import { ProductStatus } from 'src/common/enum/product-status.enum';
import { ProductImage } from './product-image.entity';

export const TableName = 'products';

@Entity(TableName)
export class Product extends AbstractEntity<Product> {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  status: ProductStatus;

  @Column()
  hasVariant: boolean;

  @ManyToMany(() => Categories, (categories) => categories.products)
  @JoinTable({
    name: 'product_categories',
    joinColumn: { name: 'product_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'category_id', referencedColumnName: 'id' },
  })
  categories: Categories[];

  @OneToMany(() => ProductImage, (productImage) => productImage.product)
  productImages: ProductImage[];

  @OneToMany(() => ProductVariant, (productVariant) => productVariant.product)
  productVariants: ProductVariant[];
}
