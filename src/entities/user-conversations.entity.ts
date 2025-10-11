import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export const TableName = 'user_conversations';

@Entity(TableName)
export class UserConversation {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  userId: string;

  @Column()
  conversationId: string;
}
