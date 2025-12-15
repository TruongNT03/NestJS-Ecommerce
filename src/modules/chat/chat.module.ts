import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Conversation } from 'src/entities/conversation.entity';
import { UserConversation } from 'src/entities/user-conversations.entity';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../user/user.module';
import { ConfigModule } from '@nestjs/config';
import { jwtConfiguration } from 'src/config';
import { ChatQueueModule } from '../shared/queue/chat/chat-queue.module';
import { MessageEntity } from 'src/entities/message.entity';
import { OnlineUserModule } from '../shared/online-user/online-user.module';
import { NotificationModule } from '../notification/notification.module';
import { ChatSharedModule } from './chat-shared/chat-shared.module';

@Module({
  imports: [
    ConfigModule.forFeature(jwtConfiguration),
    TypeOrmModule.forFeature([Conversation, UserConversation, MessageEntity]),
    JwtModule,
    UserModule,
    OnlineUserModule,
    ChatQueueModule,
    NotificationModule,
    ChatSharedModule,
  ],
  controllers: [ChatController],
  providers: [ChatService],
  exports: [ChatService],
})
export class ChatModule {}
