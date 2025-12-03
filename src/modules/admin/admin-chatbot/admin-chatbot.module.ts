import { Module } from '@nestjs/common';
import { AdminChatbotService } from './admin-chatbot.service';
import { AdminChatbotController } from './admin-chatbot.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatbotData } from 'src/entities/faq.entity';
import { ConfigModule } from '@nestjs/config';
import { chatbotServiceConfiguration } from 'src/config';
import { ChatBotTrainingLog } from 'src/entities/chatbot-training-log.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ChatbotData, ChatBotTrainingLog]),
    ConfigModule.forFeature(chatbotServiceConfiguration),
  ],
  controllers: [AdminChatbotController],
  providers: [AdminChatbotService],
})
export class AdminChatbotModule {}
