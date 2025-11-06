import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { AdminChatService } from './admin-chat.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Role } from 'src/decorators/role.decorator';
import { RoleType } from 'src/common/enum/role.enum';
import { User } from 'src/decorators/user.decorator';
import { UserRequestPayload } from 'src/modules/auth/auth.interface';
import { ListConversationQueryDto } from 'src/modules/admin/admin-chat/request/list-conversation-query.dto';
import { AdminListConversationResponseDto } from 'src/modules/admin/admin-chat/response/list-conversation-response.dto';
import { ListMessageResponseDto } from 'src/modules/chat/dto/response/list-message-response.dto';
import { ListMessageQueryDto } from 'src/modules/chat/dto/request/list-message-query.dto';
import { CreateMessageDto } from 'src/modules/chat/dto/request/create-message.dto';

@ApiTags('[ADMIN] CHAT')
@ApiBearerAuth()
@Role([RoleType.ADMIN])
@Controller('admin-chat')
export class AdminChatController {
  constructor(private readonly adminChatService: AdminChatService) {}

  @ApiOperation({ summary: '[ADMIN] GET LIST CONVERSATION' })
  @ApiResponse({ status: 200, type: AdminListConversationResponseDto })
  @Get('conversation')
  async getListConversation(
    @User() user: UserRequestPayload,
    @Query() query: ListConversationQueryDto,
  ): Promise<AdminListConversationResponseDto> {
    return await this.adminChatService.getListConversation(user, query);
  }

  @ApiOperation({ summary: '[ADMIN] GET LIST MESSAGES BY CONVERSATION ID' })
  @ApiResponse({ status: 200, type: ListMessageResponseDto })
  @Get('conversation/:id/messages')
  async getListMessages(
    @Param('id') id: string,
    @Query() query: ListMessageQueryDto,
  ): Promise<ListMessageResponseDto> {
    return await this.adminChatService.getListMessages(query, id);
  }

  @ApiOperation({ summary: '[ADMIN] CREATE MESSAGE' })
  @ApiResponse({ status: 200 })
  @Post('message')
  async createMessage(
    @Body() body: CreateMessageDto,
    @User() user: UserRequestPayload,
  ) {
    return await this.adminChatService.createMessage(body, user);
  }
}
