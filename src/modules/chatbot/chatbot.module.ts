import { Module } from '@nestjs/common';
import { ChatbotService } from './chatbot.service';
import { ChatbotController } from './chatbot.controller';
import { ConfigModule } from '@nestjs/config';
import { chatbotServiceConfiguration } from 'src/config';

@Module({
  imports: [ConfigModule.forFeature(chatbotServiceConfiguration)],
  controllers: [ChatbotController],
  providers: [ChatbotService],
})
export class ChatbotModule {}
