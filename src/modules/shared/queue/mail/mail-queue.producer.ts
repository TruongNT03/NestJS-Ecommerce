import { InjectQueue } from '@nestjs/bullmq';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bullmq';
import { MAIL_QUEUE } from './mail-queue.constant';

@Injectable()
export class MailQueueProducer {
  constructor(@InjectQueue(MAIL_QUEUE.NAME) private readonly queue: Queue) {}

  async sendOTP(OTP: string, mail: string) {
    await this.queue.add(MAIL_QUEUE.JOB_NAME.SEND_OTP, { OTP, mail }, { delay: 5000 });
  }
}
