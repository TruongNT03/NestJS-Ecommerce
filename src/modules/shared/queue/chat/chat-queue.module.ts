import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';
import { CHAT_QUEUE } from './chat-queue.constant';
import { ChatQueueProducer } from './chat-queue.producer';
import { ChatQueueConsumer } from './chat-queue.consumer';
import { OnlineUserModule } from '../../online-user/online-user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserConversation } from 'src/entities/user-conversations.entity';

@Module({
  imports: [
    BullModule.registerQueue({
      name: CHAT_QUEUE.NAME,
    }),
    OnlineUserModule,
    TypeOrmModule.forFeature([UserConversation]),
  ],
  providers: [ChatQueueProducer, ChatQueueConsumer],
  exports: [ChatQueueProducer],
})
export class ChatQueueModule {}
