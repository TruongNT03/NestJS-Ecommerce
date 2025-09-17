import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationGateway } from './notification.gateway';
import { JwtService } from '@nestjs/jwt';
import { UserModule } from '../user/user.module';
import { ConfigModule } from '@nestjs/config';
import { jwtConfiguration } from 'src/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notification } from 'src/entities/notification.entity';
import { UserEntity } from 'src/entities/user.entity';

@Module({
  imports: [
    ConfigModule.forFeature(jwtConfiguration),
    TypeOrmModule.forFeature([Notification, UserEntity]),
    UserModule,
  ],
  providers: [NotificationGateway, NotificationService, JwtService],
  exports: [NotificationService],
})
export class NotificationModule {}
