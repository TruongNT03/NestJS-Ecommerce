import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';
import { CHAT_QUEUE } from './chat-queue.constant';
import { ChatQueueProducer } from './chat-queue.producer';
import { ChatQueueConsumer } from './chat-queue.consumer';
import { OnlineUserModule } from '../../online-user/online-user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserConversation } from 'src/entities/user-conversations.entity';
import { MessageEntity } from 'src/entities/message.entity';
import { ChatSharedModule } from 'src/modules/chat/chat-shared/chat-shared.module';

@Module({
  imports: [
    BullModule.registerQueue({
      name: CHAT_QUEUE.NAME,
    }),
    OnlineUserModule,
    TypeOrmModule.forFeature([UserConversation, MessageEntity]),
    ChatSharedModule,
  ],
  providers: [ChatQueueProducer, ChatQueueConsumer],
  exports: [ChatQueueProducer],
})
export class ChatQueueModule {}
