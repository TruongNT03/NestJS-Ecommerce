import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from './product.entity';
import { UserEntity } from './user.entity';

export const TableName = 'reviews';

@Entity(TableName)
export class Review {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @Column()
  productId: string;

  @Column()
  orderItemId: string;

  @Column()
  rating: number;

  @Column()
  comment: string;

  @Column({ type: 'jsonb' })
  images: string[];

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => Product, (product) => product.reviews)
  @JoinColumn({ name: 'product_id', referencedColumnName: 'id' })
  product: Product;

  @ManyToOne(() => UserEntity, (user) => user.reviews)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: UserEntity;
}
