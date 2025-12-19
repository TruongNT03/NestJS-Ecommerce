import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { AbstractEntity } from './abstract.entity';
import { UserEntity } from './user.entity';

export const TableName = 'location';

@Entity(TableName)
export class Location extends AbstractEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  address: string;

  @Column()
  hotline: string;

  @Column()
  openTime: string;

  @Column()
  closeTime: string;

  @Column()
  openDate: string;

  @OneToMany(() => UserEntity, (user) => user.location)
  users: UserEntity[];
}
