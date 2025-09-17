import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { JwtService } from '@nestjs/jwt';
import { UserRequestPayload } from '../auth/auth.interface';
import { UserShareService } from '../user/user-share.service';
import { Inject, Logger } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { jwtConfiguration } from 'src/config';
import { EVENT } from './notification.constant';
import { Notification } from 'src/entities/notification.entity';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class NotificationGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  private server: Server;
  private userOnline: Map<string, string> = new Map();
  private logger = new Logger(NotificationGateway.name);
  constructor(
    private readonly jwtService: JwtService,
    private readonly userShareService: UserShareService,
    @Inject(jwtConfiguration.KEY)
    private readonly jwtConfig: ConfigType<typeof jwtConfiguration>,
  ) {}
  afterInit(server: Server) {
    this.server = server;
    this.logger.log('Socket initialized');
  }

  async handleConnection(client: Socket) {
    const token =
      client.handshake.auth.token ||
      client.handshake.headers.authorization?.replace('Bearer ', '');
    if (!token) {
      client.disconnect();
      return;
    }
    try {
      const userRequestPayload = this.jwtService.verify<UserRequestPayload>(
        token,
        {
          secret: this.jwtConfig.secret,
        },
      );
      const user = await this.userShareService.findOne(userRequestPayload.id);
      this.userOnline.set(client.id, user.id);
      client.join(`userId:${user.id}`);
      this.logger.log(`User ID: ${user.id} is connected with: ${client.id}`);
    } catch (error) {
      this.logger.error('Token is invalid', error.stack, error.context);
      client.disconnect();
    }
  }

  async handleDisconnect(client: Socket) {
    const token =
      client.handshake.auth.token ||
      client.handshake.headers.authorization?.replace('Bearer ', '');
    if (!token) {
      client.disconnect();
      return;
    }
    try {
      const userRequestPayload = this.jwtService.verify<UserRequestPayload>(
        token,
        {
          secret: this.jwtConfig.secret,
        },
      );
      const user = await this.userShareService.findOne(userRequestPayload.id);
      this.userOnline.delete(client.id);
      client.leave(`userId:${user.id}`);
      this.logger.log(`User ID: ${user.id} is disconnected with: ${client.id}`);
    } catch (error) {
      this.logger.error('Token is invalid', error.stack, error.context);
    } finally {
      client.disconnect();
    }
  }

  async sendToUserId(userId: string, notification: Notification) {
    this.server.to(`userId:${userId}`).emit(EVENT.NOTIFICATION, notification);
  }
}
