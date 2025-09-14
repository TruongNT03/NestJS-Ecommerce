import { Exclude } from 'class-transformer';
import { CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm';

export class AbstractEntity<T = any> {
  constructor(partial?: Partial<T>) {
    if (partial) {
      Object.assign(this, partial);
    }
  }
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Exclude()
  @DeleteDateColumn()
  deletedAt: Date;
}
