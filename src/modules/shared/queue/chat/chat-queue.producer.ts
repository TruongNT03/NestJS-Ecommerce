import { InjectQueue } from '@nestjs/bullmq';
import { Injectable } from '@nestjs/common';
import { CHAT_QUEUE } from './chat-queue.constant';
import { Queue } from 'bullmq';
import { UserConversation } from 'src/entities/user-conversations.entity';
import { MessageResponseDto } from 'src/modules/chat/dto/response/message-response.dto';
import { AddNewClientInitChat } from './dto/add-new-client-init-chat.dto';

@Injectable()
export class ChatQueueProducer {
  constructor(@InjectQueue(CHAT_QUEUE.NAME) private readonly chatQueue: Queue) {}
  async addNewClientInitChat(dto: AddNewClientInitChat) {
    await this.chatQueue.add(CHAT_QUEUE.JOB_NAME.ADD_NEW_CLIENT_INIT_CHAT, dto, {
      delay: 5000,
    });
  }
}
