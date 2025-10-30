import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AbstractEntity } from './abstract.entity';
import { Conversation } from './conversation.entity';

export const TableName = 'messages';

@Entity(TableName)
export class MessageEntity extends AbstractEntity<MessageEntity> {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  content: string;

  @Column('uuid')
  senderId: string;

  @Column()
  conversationId: string;

  @ManyToOne(() => Conversation, (conversation) => conversation.messages)
  @JoinColumn({ name: 'conversation_id', referencedColumnName: 'id' })
  conversation: Conversation;
}
