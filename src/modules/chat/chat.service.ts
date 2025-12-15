import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/base.service';
import { UserRequestPayload } from '../auth/auth.interface';
import { CreateConversationDto } from './dto/request/create-conversation.dto';
import { SuccessResponseDto } from 'src/common/dto/success-response.dto';
import { DataSource, In, Not, Repository } from 'typeorm';
import { ServerException } from 'src/exceptions/sever.exception';
import { ERROR_RESPONSE } from 'src/common/constants/error-response.constants';
import { Conversation } from 'src/entities/conversation.entity';
import { UserConversation } from 'src/entities/user-conversations.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { ListConversationResponseDto } from './dto/response/list-conversation-response.dto';
import { ConversationResponseDto } from './dto/response/conversation-reponse.dto';
import { MessageEntity } from 'src/entities/message.entity';
import { CONSTANTS } from './chat.constant';
import { CreateMessageDto } from './dto/request/create-message.dto';
import { OnlineUserService } from '../shared/online-user/online-user.service';
import { ChatQueueProducer } from '../shared/queue/chat/chat-queue.producer';
import { SaveNotificationDto } from '../notification/dto/request/save-notification.dto';
import { NotificationService } from '../notification/notification.service';
import { RoleType } from 'src/common/enum/role.enum';
import { ListMessageQueryDto } from 'src/modules/chat/dto/request/list-message-query.dto';
import { ListMessageResponseDto } from 'src/modules/chat/dto/response/list-message-response.dto';
import { NotificationNavigateTo } from 'src/common/enum/notification-navigate-to.enum';
import { MessageResponseDto } from './dto/response/message-response.dto';
import { Socket } from 'socket.io';
import { ChatSharedGateway } from './chat-shared/chat-shared.gateway';

@Injectable()
export class ChatService extends BaseService {
  constructor(
    private readonly dataSource: DataSource,
    @InjectRepository(Conversation)
    private readonly conversationRepo: Repository<Conversation>,
    @InjectRepository(UserConversation)
    private readonly userConversationRepo: Repository<UserConversation>,
    @InjectRepository(MessageEntity)
    private readonly messageRepo: Repository<MessageEntity>,
    private readonly chatGateway: ChatSharedGateway,
    private readonly onlineUserService: OnlineUserService,
    private readonly chatQueueProducer: ChatQueueProducer,
    private readonly notificationService: NotificationService,
  ) {
    super();
  }
  async createConversation(user: UserRequestPayload): Promise<SuccessResponseDto> {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.startTransaction();
    let adminOnlineId: string;
    try {
      const conversation = await queryRunner.manager.save(Conversation, {}, {});

      // Init waiting message
      const message = await queryRunner.manager.save(MessageEntity, {
        content: CONSTANTS.MESSAGE_CONTENT.INIT_CHAT,
        senderId: null,
        conversationId: conversation.id,
      });

      // Linking if has admin online
      const onlineAdmins = this.onlineUserService.getAdminOnline();

      if (onlineAdmins && onlineAdmins.length) {
        // Random admin
        const randomAdmin = onlineAdmins[Math.floor(Math.random() * onlineAdmins.length)];
        adminOnlineId = randomAdmin;
        // Create UserConversation
        await Promise.all([
          // For user
          queryRunner.manager.save(UserConversation, {
            conversationId: conversation.id,
            userId: user.id,
          }),

          // For admin
          queryRunner.manager.save(UserConversation, {
            conversationId: conversation.id,
            userId: randomAdmin,
          }),
        ]);
      } else {
        // Have not any admin online

        const [, adminWaitingConversation] = await Promise.all([
          // Create for user
          queryRunner.manager.save(UserConversation, {
            conversationId: conversation.id,
            userId: user.id,
          }),

          // UserConversation for admin will be have null userId
          queryRunner.manager.save(UserConversation, {
            conversationId: conversation.id,
            userId: null,
          }),
        ]);

        // Push waiting conversation into the queue
        await this.chatQueueProducer.addNewClientInitChat({
          conversation: adminWaitingConversation,
          message: plainToInstance(MessageResponseDto, message),
        });
      }

      // Push to new conversation was created
      await this.chatGateway.pushUserToConversationRoom(user.id, conversation.id);

      // Push admin online to new conversation if exist
      if (adminOnlineId) {
        await this.chatGateway.pushUserToConversationRoom(adminOnlineId, conversation.id);
      }

      // Notification
      await this.chatGateway.sendMessageToConversation(
        conversation.id,
        plainToInstance(MessageResponseDto, message),
      );

      await queryRunner.commitTransaction();
      return this.successResponse();
    } catch (error) {
      console.error(
        '[ChatService.createConversation] Has error during create conversation.',
        error,
      );
      await queryRunner.rollbackTransaction();
      throw new ServerException(ERROR_RESPONSE.BAD_REQUEST);
    } finally {
      await queryRunner.release();
    }
  }

  async getAllConversation(user: UserRequestPayload) {
    const queryBuilder = this.conversationRepo
      .createQueryBuilder('c')
      .leftJoinAndSelect('c.users', 'u')
      .where(
        'c.id IN ' +
          this.conversationRepo
            .createQueryBuilder()
            .subQuery()
            .select('uc.conversation_id')
            .from('user_conversations', 'uc')
            .where('uc.user_id = :userId')
            .getQuery(),
      )
      .setParameter('userId', user.id)
      .orderBy('c.updatedAt', 'DESC');

    const { data, paginate } = await this.paginate(queryBuilder, 1, 10);
    return plainToInstance(ListConversationResponseDto, {
      data: plainToInstance(ConversationResponseDto, data),
      paginate,
    });
  }

  // Need implement more
  async getOneConversation(id: string) {
    const conversation = await this.conversationRepo.findOne({
      where: { id },
      relations: ['messages'],
      order: {
        messages: {
          createdAt: 'ASC',
        },
      },
    });
    if (!conversation) {
      throw new ServerException(ERROR_RESPONSE.NOT_FOUND);
    }
    return conversation;
  }

  // Need implement more
  async createMessage(dto: CreateMessageDto, user: UserRequestPayload) {
    const { content, conversationId } = dto;
    const message: MessageEntity = await this.messageRepo.save({
      content,
      conversationId,
      senderId: user.id,
    });

    await this.chatGateway.sendMessageToConversation(
      conversationId,
      plainToInstance(MessageResponseDto, message),
    );
    const newMessageNotifications = await this.getNewMessageNotification(user.id, conversationId);

    await Promise.all(
      newMessageNotifications.map(async (newMessageNotification) => {
        await this.notificationService.create(newMessageNotification);
      }),
    );
    return this.successResponse();
  }

  private async getNewMessageNotification(
    senderId: string,
    conversationId: string,
  ): Promise<SaveNotificationDto[]> {
    const userConversations = await this.userConversationRepo.find({
      where: {
        conversationId: conversationId,
        userId: Not(In([senderId])),
      },
    });
    const newMessageNotifications: SaveNotificationDto[] = userConversations.map(
      (userConversation) => ({
        alertTo: RoleType.ADMIN,
        content: `Bạn có tin nhắn mới.`,
        navigateTo: NotificationNavigateTo.CONVERSATION_DETAIL,
        title: `Tin nhắn mới.`,
        triggerBy: `ChatService.createMessage`,
        userId: userConversation.userId,
      }),
    );
    return newMessageNotifications;
  }

  async getListMessages(
    user: UserRequestPayload,
    dto: ListMessageQueryDto,
  ): Promise<ListMessageResponseDto> {
    const { page, pageSize } = dto;
    const conversation = await this.conversationRepo.findOne({
      where: { users: { id: user.id } },
    });

    const queryBuilder = this.messageRepo
      .createQueryBuilder('m')
      .where('m.conversationId = :conversationId', {
        conversationId: conversation.id,
      })
      .orderBy('m.createdAt', 'DESC');

    const { data, paginate } = await this.paginate(queryBuilder, page, pageSize);

    return plainToInstance(ListMessageResponseDto, {
      data,
      paginate,
    });
  }

  async getConversation(user: UserRequestPayload): Promise<ConversationResponseDto> {
    const conversation = await this.conversationRepo.findOne({
      where: { users: { id: user.id } },
      relations: ['users'],
    });

    return plainToInstance(ConversationResponseDto, conversation);
  }
}
