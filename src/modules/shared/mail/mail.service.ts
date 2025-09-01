import { Inject, Injectable } from '@nestjs/common';
import { MAIL_TRANSPORTER } from './mail.constants';
import { Transporter } from 'nodemailer';
import { render } from '@react-email/render';
import RegisterSendOTP from '../../../../templates/RegisterSendOTP';
import * as React from 'react';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MailService {
  constructor(
    @Inject(MAIL_TRANSPORTER) private readonly transporter: Transporter,
    private readonly configService: ConfigService,
  ) {}

  async sendMail(otp: string, receiverEmail: string): Promise<void> {
    const senderEmail = this.configService.get('MAIL_USER');
    const htmlContent = await render(
      RegisterSendOTP({ verificationCode: otp }),
    );
    this.transporter.sendMail({
      from: `My Shop <${senderEmail}>`,
      to: receiverEmail,
      html: htmlContent,
    });
  }
}
