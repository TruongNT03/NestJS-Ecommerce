import { Module } from '@nestjs/common';
import { ChatSharedGateway } from './chat-shared.gateway';
import { JwtModule } from '@nestjs/jwt';
import { UserShareService } from 'src/modules/user/user-share.service';
import { UserModule } from 'src/modules/user/user.module';
import { ConfigModule } from '@nestjs/config';
import { jwtConfiguration } from 'src/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Conversation } from 'src/entities/conversation.entity';
import { OnlineUserModule } from 'src/modules/shared/online-user/online-user.module';

@Module({
  imports: [
    JwtModule,
    UserModule,
    ConfigModule.forFeature(jwtConfiguration),
    TypeOrmModule.forFeature([Conversation]),
    OnlineUserModule,
  ],
  providers: [ChatSharedGateway],
  exports: [ChatSharedGateway],
})
export class ChatSharedModule {}
