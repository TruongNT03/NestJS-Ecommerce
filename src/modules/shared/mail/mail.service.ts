import { Inject, Injectable } from '@nestjs/common';
import { MAIL_TRANSPORTER } from './mail.constants';
import { Transporter } from 'nodemailer';
import { render } from '@react-email/render';
import RegisterSendOTP from '../../../../templates/RegisterSendOTP';
import * as React from 'react';
import { ConfigService } from '@nestjs/config';
import AdminAccountCreated from 'templates/AdminAccountCreated';

@Injectable()
export class MailService {
  constructor(
    @Inject(MAIL_TRANSPORTER) private readonly transporter: Transporter,
    private readonly configService: ConfigService,
  ) {}

  async sendMail(otp: string, receiverEmail: string): Promise<void> {
    const senderEmail = this.configService.get('MAIL_USER');
    const htmlContent = await render(RegisterSendOTP({ verificationCode: otp }));
    this.transporter.sendMail({
      from: `My Shop <${senderEmail}>`,
      subject: 'Mã OTP đăng ký tài khoản',
      to: receiverEmail,
      html: htmlContent,
    });
  }

  async sendAccount(password: string, email: string): Promise<void> {
    const senderEmail = this.configService.get('MAIL_USER');
    const htmlContent = await render(AdminAccountCreated({ password, email }));
    this.transporter.sendMail({
      from: `My Shop <${senderEmail}>`,
      subject: 'Tài khoản được tạo',
      to: email,
      html: htmlContent,
    });
  }

  async sendForgotPasswordMail(otp: string, receiverEmail: string): Promise<void> {
    const senderEmail = this.configService.get('MAIL_USER');
    const htmlContent = await render(RegisterSendOTP({ verificationCode: otp }));
    this.transporter.sendMail({
      subject: 'Forgot password OTP',
      from: `My Shop <${senderEmail}>`,
      to: receiverEmail,
      html: htmlContent,
    });
  }

  async sendNewPassword(newPassword: string, receiverEmail: string) {
    const senderEmail = this.configService.get('MAIL_USER');
    this.transporter.sendMail({
      subject: 'New password',
      from: `My Shop <${senderEmail}>`,
      to: receiverEmail,
      html: `<div>New password: ${newPassword} </div>`,
    });
  }
}
