import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { AbstractEntity } from './abstract.entity';
import { Product } from 'src/entities/product.entity';

export const TableName = 'categories';

@Entity(TableName)
export class Categories extends AbstractEntity<Categories> {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  image: string;

  @ManyToMany(() => Product, (product) => product.categories)
  products: Product[];
}
