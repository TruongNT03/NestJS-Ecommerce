import { InjectQueue, Processor, WorkerHost } from '@nestjs/bullmq';
import { Job, Queue } from 'bullmq';
import { CHAT_QUEUE } from './chat-queue.constant';
import { OnlineUserService } from '../../online-user/online-user.service';
import { Repository } from 'typeorm';
import { UserConversation } from 'src/entities/user-conversations.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { AddNewClientInitChat } from './dto/add-new-client-init-chat.dto';
import { MessageEntity } from 'src/entities/message.entity';
import { ChatSharedGateway } from 'src/modules/chat/chat-shared/chat-shared.gateway';

@Processor(CHAT_QUEUE.NAME)
export class ChatQueueConsumer extends WorkerHost {
  constructor(
    private readonly onlineUserService: OnlineUserService,
    @InjectRepository(UserConversation)
    private readonly userConversationRepo: Repository<UserConversation>,
    @InjectRepository(MessageEntity)
    private readonly messageRepo: Repository<MessageEntity>,
    @InjectQueue(CHAT_QUEUE.NAME)
    private readonly chatQueue: Queue,
    private readonly chatSharedGateway: ChatSharedGateway,
  ) {
    super();
  }
  async process(job: Job): Promise<any> {
    switch (job.name) {
      case CHAT_QUEUE.JOB_NAME.ADD_NEW_CLIENT_INIT_CHAT: {
        const adminOnlines = this.onlineUserService.getAdminOnline();
        if (adminOnlines.length === 0) {
          await this.chatQueue.add(job.name, job.data, { delay: 5000 });
          return;
        }
        const ramdomAdmin = adminOnlines[Math.floor(Math.random() * adminOnlines.length)];

        const data: AddNewClientInitChat = job.data;
        const { conversation, message } = data;
        await this.userConversationRepo.save({
          id: conversation.id,
          conversationId: conversation.conversationId,
          userId: ramdomAdmin,
        });
        await this.messageRepo.save({
          id: message.id,
          senderId: ramdomAdmin,
        });

        await this.chatSharedGateway.pushUserToConversationRoom(
          ramdomAdmin,
          conversation.conversationId,
        );

        await this.chatSharedGateway.sendMessageToConversation(
          conversation.conversationId,
          message,
        );
      }
    }
  }
}
