import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AbstractEntity } from './abstract.entity';
import { VariantValue } from 'src/entities/variant-value.entity';

export const TableName = 'variants';

@Entity(TableName)
export class Variant extends AbstractEntity<Variant> {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @OneToMany(() => VariantValue, (variantValue) => variantValue.variant)
  variantValues: VariantValue[];
}
