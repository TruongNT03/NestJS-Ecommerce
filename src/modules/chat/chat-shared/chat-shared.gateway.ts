import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { JwtService } from '@nestjs/jwt';
import { Inject, Logger } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { jwtConfiguration } from 'src/config';
import { RoleType } from 'src/common/enum/role.enum';
import { InjectRepository } from '@nestjs/typeorm';
import { Conversation } from 'src/entities/conversation.entity';
import { Repository } from 'typeorm';
import { UserShareService } from 'src/modules/user/user-share.service';
import { OnlineUserService } from 'src/modules/shared/online-user/online-user.service';
import { UserRequestPayload } from 'src/modules/auth/auth.interface';
import { MessageResponseDto } from '../dto/response/message-response.dto';
import { CONSTANTS } from '../chat.constant';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
  namespace: 'chat',
})
export class ChatSharedGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userShareService: UserShareService,
    @Inject(jwtConfiguration.KEY)
    private readonly jwtConfig: ConfigType<typeof jwtConfiguration>,
    @InjectRepository(Conversation)
    private readonly conversationRepo: Repository<Conversation>,
    private readonly onlineUserService: OnlineUserService,
  ) {}

  @WebSocketServer()
  private server: Server;
  private logger = new Logger(ChatSharedGateway.name);

  afterInit(server: Server) {
    // Init server
    this.server = server;
    this.logger.log('Socket initialized');
  }

  async handleConnection(client: Socket) {
    const token =
      client.handshake.auth.token || client.handshake.headers.authorization?.replace('Bearer ', '');
    if (!token) {
      client.disconnect();
      return;
    }
    try {
      const userRequestPayload = this.jwtService.verify<UserRequestPayload>(token, {
        secret: this.jwtConfig.secret,
      });
      const user = await this.userShareService.findOne(userRequestPayload.id);

      this.onlineUserService.addAccountOnline(user.id, client);

      // Find all conversation of user
      const conversations = await this.conversationRepo.find({
        where: {
          users: {
            id: user.id,
          },
        },
      });

      // Push user to conversations
      await Promise.all(
        conversations.map(async (conversation) => {
          await client.join(`conversation:${conversation.id}`);
        }),
      );

      // Check role ADMIN
      if (userRequestPayload.roles.includes(RoleType.ADMIN)) {
        this.onlineUserService.addAdminOnline(user.id, client);
      }

      this.logger.log(`User ID: ${user.id} is connected with: ${client.id}`);
    } catch (error) {
      this.logger.error('Token is invalid', error.stack, error.context);
      client.disconnect();
    }
  }

  async handleDisconnect(client: Socket) {
    const token =
      client.handshake.auth.token || client.handshake.headers.authorization?.replace('Bearer ', '');
    if (!token) {
      client.disconnect();
      return;
    }
    try {
      const userRequestPayload = this.jwtService.verify<UserRequestPayload>(token, {
        secret: this.jwtConfig.secret,
      });
      const user = await this.userShareService.findOne(userRequestPayload.id);
      this.onlineUserService.deleteAccountOnline(user.id, client);

      // Check if admin
      if (userRequestPayload.roles && userRequestPayload.roles.includes(RoleType.ADMIN)) {
        this.onlineUserService.deleteAdminOnline(user.id, client);
      }
      client.leave(`userId:${user.id}`);
      this.logger.log(`User ID: ${user.id} is disconnected with: ${client.id}`);
    } catch (error) {
      this.logger.error('Token is invalid', error.stack, error.context);
    } finally {
      client.disconnect();
    }
  }

  async sendMessageToConversation(conversationId: string, message: MessageResponseDto) {
    this.server.to(`conversation:${conversationId}`).emit(CONSTANTS.EVENT.CHAT, message);
  }

  async pushUserToConversationRoom(userId: string, conversationId: string) {
    const userSockets = this.onlineUserService.getAccountOnline(userId);
    await Promise.all(
      userSockets.map(async (userSocket) => {
        await userSocket.join(`conversation:${conversationId}`);
      }),
    );
  }
}
