import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AdminChatbotService } from './admin-chatbot.service';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
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
import { Response, Express } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';

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

  @ApiOperation({ summary: '[ADMIN] DOWNLOAD EXCEL FILE TEMPLATE' })
  @ApiResponse({ status: 200 })
  @Get('download-template')
  async downloadTemplate(@Res() res: Response) {
    return await this.adminChatbotService.downloadTemplate(res);
  }

  @ApiOperation({ summary: '[ADMIN] UPLOAD FAQ' })
  @ApiResponse({ status: 200, type: SuccessResponseDto })
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @Post('upload-faq')
  async uploadFaqFile(
    @UploadedFile() file: Express.Multer.File,
  ): Promise<SuccessResponseDto> {
    return await this.adminChatbotService.uploadFaqFile(file);
  }
}
