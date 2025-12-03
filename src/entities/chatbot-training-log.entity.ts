import { ChatbotTrainingStatus } from 'src/common/enum/chatbot-training-status.enum';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { AbstractEntity } from './abstract.entity';

export const TableName = 'chatbot_training_logs';

@Entity(TableName)
export class ChatBotTrainingLog extends AbstractEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  status: ChatbotTrainingStatus;
}
