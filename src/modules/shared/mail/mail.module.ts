import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MAIL_TRANSPORTER } from './mail.constants';
import { ConfigService } from '@nestjs/config';
import { createTransport } from 'nodemailer';

@Module({
  controllers: [],
  providers: [
    MailService,
    {
      provide: MAIL_TRANSPORTER,
      useFactory: (configService: ConfigService) => {
        const mailConfig = configService.get('mail');
        return createTransport(mailConfig);
      },
      inject: [ConfigService],
    },
  ],
  exports: [MailService],
})
export class MailModule {}
