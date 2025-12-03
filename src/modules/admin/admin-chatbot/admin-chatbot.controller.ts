import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { AdminChatbotService } from './admin-chatbot.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Role } from 'src/decorators/role.decorator';
import { RoleType } from 'src/common/enum/role.enum';
import { SuccessResponseDto } from 'src/common/dto/success-response.dto';
import { CreateFaqDto } from './dto/request/create-faq.dto';
import { AdminListFaqResponseDto } from './dto/response/admin-list-faq-response.dto';
import { AdminListFaqQueryDto } from './dto/request/list-faq-query.dto';

@ApiTags('[ADMIN] CHATBOT')
@ApiBearerAuth()
@Role([RoleType.ADMIN])
@Controller('admin-chatbot')
export class AdminChatbotController {
  constructor(private readonly adminChatbotService: AdminChatbotService) {}

  @ApiOperation({ summary: '[ADMIN] CREATE FAQ' })
  @ApiResponse({ status: 200, type: SuccessResponseDto })
  @Post()
  async create(@Body() body: CreateFaqDto): Promise<SuccessResponseDto> {
    return await this.adminChatbotService.create(body);
  }

  @ApiOperation({ summary: '[ADMIN] FIND ALL FAQ' })
  @ApiResponse({ status: 200, type: AdminListFaqResponseDto })
  @Get()
  async findAll(
    @Query() query: AdminListFaqQueryDto,
  ): Promise<AdminListFaqResponseDto> {
    return await this.adminChatbotService.findAll(query);
  }

  @ApiOperation({ summary: '[ADMIN] RETRAINING MODEL' })
  @ApiResponse({ status: 200, type: SuccessResponseDto })
  @Post('retraining')
  async retraining(): Promise<SuccessResponseDto> {
    return await this.adminChatbotService.retraining();
  }
}
