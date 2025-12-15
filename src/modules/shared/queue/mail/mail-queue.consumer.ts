import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { MAIL_QUEUE } from './mail-queue.constant';
import { MailService } from '../../mail/mail.service';

@Processor(MAIL_QUEUE.NAME)
export class MailQueueConsumer extends WorkerHost {
  constructor(private readonly mailService: MailService) {
    super();
  }

  async process(job: Job) {
    switch (job.name) {
      case MAIL_QUEUE.JOB_NAME.SEND_OTP: {
        const data: { OTP: string; mail: string } = job.data;
        await this.mailService.sendMail(data.OTP, data.mail);
      }
    }
  }
}
