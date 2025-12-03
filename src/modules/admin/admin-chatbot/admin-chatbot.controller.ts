import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
} from '@nestjs/common';
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
import { AdminFaqSummaryResponseDto } from './dto/response/admin-faq-summary-response.dto';

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

  @ApiOperation({ summary: '[ADMIN] DELETE FAQ' })
  @ApiResponse({ status: 200, type: SuccessResponseDto })
  @Delete(':id')
  async delete(@Query('id') id: number): Promise<SuccessResponseDto> {
    return await this.adminChatbotService.delete(id);
  }

  @ApiOperation({ summary: '[ADMIN] UPDATE FAQ' })
  @ApiResponse({ status: 200, type: SuccessResponseDto })
  @Put(':id')
  async update(
    @Query('id') id: number,
    @Body() body: CreateFaqDto,
  ): Promise<SuccessResponseDto> {
    return await this.adminChatbotService.update(id, body);
  }

  @ApiOperation({ summary: '[ADMIN] GET FAQ SUMMARY' })
  @ApiResponse({ status: 200, type: AdminFaqSummaryResponseDto })
  @Get('summary')
  async getSummary(): Promise<AdminFaqSummaryResponseDto> {
    return await this.adminChatbotService.getSummary();
  }
}
