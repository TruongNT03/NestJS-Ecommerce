import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ChatService } from './chat.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { SuccessResponseDto } from 'src/common/dto/success-response.dto';
import { User } from 'src/decorators/user.decorator';
import { UserRequestPayload } from '../auth/auth.interface';
import { CreateConversationDto } from './dto/request/create-conversation.dto';
import { Role } from 'src/decorators/role.decorator';
import { RoleType } from 'src/common/enum/role.enum';
import { CreateMessageDto } from './dto/request/create-message.dto';

@Controller('chat')
@ApiTags('CHAT')
@ApiBearerAuth()
@Role([RoleType.ADMIN, RoleType.USER])
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @ApiOperation({ summary: 'CREATE CONVERSATION' })
  @ApiResponse({ status: 201, type: SuccessResponseDto })
  @Post('conversation')
  async createConversation(
    @User() user: UserRequestPayload,
    @Body() body: CreateConversationDto,
  ): Promise<SuccessResponseDto> {
    return await this.chatService.createConversation(user, body);
  }

  @ApiOperation({ summary: 'GET ALL CONVERSATION' })
  @ApiResponse({ status: 200 })
  @Get('conversation')
  async findAllConversations(@User() user: UserRequestPayload) {
    return await this.chatService.getAllConversation(user);
  }

  // Need implement more
  @ApiOperation({ summary: 'GET DETAIL CONVERSATION' })
  @ApiResponse({ status: 200 })
  @Get(':id')
  async findOneConversation(@Param('id') id: string) {
    return await this.chatService.getOneConversation(id);
  }

  // Need implement more
  @ApiOperation({ summary: 'CREATE MESSAGE' })
  @ApiResponse({ status: 200 })
  @Post('message')
  async createMessage(
    @Body() body: CreateMessageDto,
    @User() user: UserRequestPayload,
  ) {
    return await this.chatService.createMessage(body, user);
  }
}
