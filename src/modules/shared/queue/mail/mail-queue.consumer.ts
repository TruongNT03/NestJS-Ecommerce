import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { MAIL_QUEUE } from './mail-queue.constant';
import { MailService } from '../../mail/mail.service';
import { Inject } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

@Processor(MAIL_QUEUE.NAME)
export class MailQueueConsumer extends WorkerHost {
  constructor(
    private readonly mailService: MailService,
    @Inject(WINSTON_MODULE_PROVIDER)
    private readonly logger: Logger,
  ) {
    super();
  }

  async process(job: Job) {
    switch (job.name) {
      case MAIL_QUEUE.JOB_NAME.SEND_OTP: {
        const data: { OTP: string; mail: string } = job.data;
        await this.mailService.sendMail(data.OTP, data.mail);
        this.logger.info(`Send mail successfully to email: ${data.mail}`);
        break;
      }

      case MAIL_QUEUE.JOB_NAME.SEND_ACCOUNT: {
        const data: { password: string; mail: string } = job.data;
        await this.mailService.sendAccount(data.password, data.mail);
        this.logger.info(`Send mail successfully to email: ${data.mail}`);
        break;
      }
    }
  }
}
