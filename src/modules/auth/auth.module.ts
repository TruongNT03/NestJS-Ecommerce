import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { MailModule } from '../shared/mail/mail.module';
import { RedisModule } from '../shared/redis/redis.module';

@Module({
  imports: [UserModule, MailModule, RedisModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
