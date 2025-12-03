import { Body, Controller, Post } from '@nestjs/common';
import { ChatbotService } from './chatbot.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Role } from 'src/decorators/role.decorator';
import { RoleType } from 'src/common/enum/role.enum';
import { AskDto } from './dto/request/ask.dto';
import { AskResponseDto } from './dto/response/ask-response.dto';
import { Public } from 'src/decorators/public.decorator';

@ApiTags('[USER] CHATBOT')
@Public()
@Role([RoleType.USER])
@Controller('chatbot')
export class ChatbotController {
  constructor(private readonly chatbotService: ChatbotService) {}

  @ApiOperation({ summary: '[USER] ASK QUESTION' })
  @ApiResponse({ status: 200, type: AskResponseDto })
  @Post('ask')
  async ask(@Body() body: AskDto): Promise<AskResponseDto> {
    return await this.chatbotService.ask(body);
  }
}
