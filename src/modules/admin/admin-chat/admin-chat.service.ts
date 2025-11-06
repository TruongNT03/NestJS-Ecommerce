import { Injectable } from '@nestjs/common';
import { UserRequestPayload } from 'src/modules/auth/auth.interface';
import { BaseService } from 'src/base.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Conversation } from 'src/entities/conversation.entity';
import { Repository } from 'typeorm';
import { ListConversationQueryDto } from 'src/modules/admin/admin-chat/request/list-conversation-query.dto';
import { MessageEntity } from 'src/entities/message.entity';
import { AdminListConversationResponseDto } from 'src/modules/admin/admin-chat/response/list-conversation-response.dto';
import { plainToInstance } from 'class-transformer';
import { ListMessageQueryDto } from 'src/modules/chat/dto/request/list-message-query.dto';
import { ListMessageResponseDto } from 'src/modules/chat/dto/response/list-message-response.dto';
import { ChatService } from 'src/modules/chat/chat.service';
import { CreateMessageDto } from 'src/modules/chat/dto/request/create-message.dto';

@Injectable()
export class AdminChatService extends BaseService {
  constructor(
    private readonly chatService: ChatService,
    @InjectRepository(Conversation)
    private readonly conversationRepo: Repository<Conversation>,
    @InjectRepository(MessageEntity)
    private readonly messageRepo: Repository<MessageEntity>,
  ) {
    super();
  }

  async getListConversation(
    user: UserRequestPayload,
    dto: ListConversationQueryDto,
  ): Promise<AdminListConversationResponseDto> {
    const { page, pageSize } = dto;
    const queryBuilder = this.conversationRepo
      .createQueryBuilder('c')
      .leftJoinAndSelect('c.users', 'u', 'u.id != :userId', { userId: user.id })

      .where(
        `EXISTS (
        SELECT 1
        FROM user_conversations uc
        WHERE uc."conversation_id" = c.id
        AND uc."user_id" = :userId
      )`,
        { userId: user.id },
      );

    const { data, paginate } = await this.paginate(
      queryBuilder,
      page,
      pageSize,
    );

    const latestMessages = await Promise.all(
      data.map(async (conversation) => {
        return await this.messageRepo.findOne({
          where: {
            conversationId: conversation.id,
          },
          order: { createdAt: 'DESC' },
        });
      }),
    );

    let result = [];

    for (let i = 0; i < data.length; i++) {
      result.push({
        id: data[i].id,
        user: data[i].users[0],
        latestMessage: latestMessages[i].content,
      });
    }

    return plainToInstance(AdminListConversationResponseDto, {
      data: result,
      paginate,
    });
  }

  async getListMessages(
    dto: ListMessageQueryDto,
    id: string,
  ): Promise<ListMessageResponseDto> {
    const { page, pageSize } = dto;
    const conversation = await this.conversationRepo.findOne({
      where: { id },
    });

    const queryBuilder = this.messageRepo
      .createQueryBuilder('m')
      .where('m.conversationId = :conversationId', {
        conversationId: conversation.id,
      })
      .orderBy('m.createdAt', 'DESC');

    const { data, paginate } = await this.paginate(
      queryBuilder,
      page,
      pageSize,
    );

    return plainToInstance(ListMessageResponseDto, {
      data,
      paginate,
    });
  }

  async createMessage(dto: CreateMessageDto, user: UserRequestPayload) {
    return await this.chatService.createMessage(dto, user);
  }
}
