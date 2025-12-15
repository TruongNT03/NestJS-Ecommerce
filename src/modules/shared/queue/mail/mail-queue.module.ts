import { Module } from '@nestjs/common';
import { MailQueueProducer } from './mail-queue.producer';
import { MailQueueConsumer } from './mail-queue.consumer';
import { BullModule } from '@nestjs/bullmq';
import { MAIL_QUEUE } from './mail-queue.constant';
import { MailModule } from '../../mail/mail.module';

@Module({
  imports: [
    BullModule.registerQueue({
      name: MAIL_QUEUE.NAME,
    }),
    MailModule,
  ],
  providers: [MailQueueProducer, MailQueueConsumer],
  exports: [MailQueueProducer],
})
export class MailQueueModule {}
