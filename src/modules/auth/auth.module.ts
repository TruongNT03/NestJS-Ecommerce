import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { MailModule } from '../shared/mail/mail.module';
import { RedisModule } from '../shared/redis/redis.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtStrategy } from './strategy/jwt-strategy';
import { RefreshStrategy } from './strategy/refresh-strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { S3Module } from '../shared/s3/s3.module';
import { NotificationGateway } from '../notification/notification.gateway';
import { NotificationModule } from '../notification/notification.module';

@Module({
  imports: [
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        global: true,
        secret: configService.get<string>('JWT_SECRET'),
      }),
    }),
    TypeOrmModule.forFeature([UserEntity]),
    UserModule,
    MailModule,
    RedisModule,
    S3Module,
    NotificationModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, RefreshStrategy],
  exports: [JwtModule],
})
export class AuthModule {}
