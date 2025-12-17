import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { AdminVoucherService } from './admin-voucher.service';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Role } from 'src/decorators/role.decorator';
import { RoleType } from 'src/common/enum/role.enum';
import { SuccessResponseDto } from 'src/common/dto/success-response.dto';
import { AdminCreateVoucherDto } from './dto/request/admin-create-voucher.dto';
import { AdminListVoucherQueryDto } from './dto/request/admin-list-voucher-query.dto';
import { AdminListVoucherResponseDto } from './dto/response/admin-list-voucher-response.dto';

@ApiTags('ADMIN VOUCHER')
@ApiBearerAuth()
@Role([RoleType.ADMIN])
@Controller('admin-voucher')
export class AdminVoucherController {
  constructor(private readonly adminVoucherService: AdminVoucherService) {}

  @ApiOperation({ summary: '[ADMIN] CREATE VOUCHER' })
  @ApiResponse({ status: 201, type: SuccessResponseDto })
  @Post()
  async create(@Body() body: AdminCreateVoucherDto): Promise<SuccessResponseDto> {
    return await this.adminVoucherService.create(body);
  }

  @ApiOperation({ summary: '[ADMIN] FIND ALL VOUCHER' })
  @ApiResponse({ status: 200, type: AdminListVoucherResponseDto })
  @Get()
  async findAll(@Query() query: AdminListVoucherQueryDto): Promise<AdminListVoucherResponseDto> {
    return await this.adminVoucherService.findAll(query);
  }
}
