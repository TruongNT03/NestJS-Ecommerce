import { Module } from '@nestjs/common';
import { AdminChatService } from './admin-chat.service';
import { AdminChatController } from './admin-chat.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Conversation } from 'src/entities/conversation.entity';
import { MessageEntity } from 'src/entities/message.entity';
import { ChatModule } from 'src/modules/chat/chat.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Conversation, MessageEntity]),
    ChatModule,
  ],
  controllers: [AdminChatController],
  providers: [AdminChatService],
})
export class AdminChatModule {}
