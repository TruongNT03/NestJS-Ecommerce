import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export const TableName = 'product_categories';

@Entity(TableName)
export class ProductCategories {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  productId: string;

  @Column()
  categoryId: number;
}
