import { InjectQueue, Processor, WorkerHost } from '@nestjs/bullmq';
import { Job, Queue } from 'bullmq';
import { CHAT_QUEUE } from './chat-queue.constant';
import { OnlineUserService } from '../../online-user/online-user.service';
import { Repository } from 'typeorm';
import { UserConversation } from 'src/entities/user-conversations.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Processor(CHAT_QUEUE.NAME)
export class ChatQueueConsumer extends WorkerHost {
  constructor(
    private readonly onlineUserService: OnlineUserService,
    @InjectRepository(UserConversation)
    private readonly userConversationRepo: Repository<UserConversation>,
    @InjectQueue(CHAT_QUEUE.NAME)
    private readonly chatQueue: Queue,
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
        const ramdomAdmin =
          adminOnlines[Math.floor(Math.random() * adminOnlines.length)];
        await this.userConversationRepo.save({
          ...job.data,
          userId: ramdomAdmin,
        });
      }
    }
  }
}
