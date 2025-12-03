import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { AbstractEntity } from './abstract.entity';
import { FaqType } from 'src/common/enum/faq-type.enum';

export const TableName = 'chatbot_data';

@Entity(TableName)
export class ChatbotData extends AbstractEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  question: string;

  @Column()
  answer: string;

  @Column()
  type: FaqType;
}
