import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AbstractEntity } from './abstract.entity';
import { Variant } from 'src/entities/variant.entity';
import { ProductVariant } from 'src/entities/product-variant.entity';

export const TableName = 'variant_values';

@Entity(TableName)
export class VariantValue extends AbstractEntity<VariantValue> {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  value: string;

  @Column()
  variantId: number;

  @ManyToOne(() => Variant, (variant) => variant.variantValues)
  @JoinColumn()
  variant: Variant;

  @ManyToMany(() => ProductVariant)
  productVariants: ProductVariant[];
}
