import { InjectQueue } from '@nestjs/bullmq';
import { Injectable } from '@nestjs/common';
import { CHAT_QUEUE } from './chat-queue.constant';
import { Queue } from 'bullmq';
import { UserConversation } from 'src/entities/user-conversations.entity';

@Injectable()
export class ChatQueueProducer {
  constructor(
    @InjectQueue(CHAT_QUEUE.NAME) private readonly chatQueue: Queue,
  ) {}
  async addNewClientInitChat(payload: UserConversation) {
    await this.chatQueue.add(
      CHAT_QUEUE.JOB_NAME.ADD_NEW_CLIENT_INIT_CHAT,
      payload,
      { delay: 5000 },
    );
  }
}
