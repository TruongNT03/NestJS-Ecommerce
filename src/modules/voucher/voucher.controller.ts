import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { VoucherService } from './voucher.service';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Role } from 'src/decorators/role.decorator';
import { RoleType } from 'src/common/enum/role.enum';
import { ListVoucherQueryDto } from './dto/request/list-voucher-query.dto';
import { User } from 'src/decorators/user.decorator';
import { UserRequestPayload } from '../auth/auth.interface';
import { ListVoucherResponseDto } from './dto/response/list-voucher-response.dto';
import { SuccessResponseDto } from 'src/common/dto/success-response.dto';
import { TakeVoucherDto } from './dto/request/take-voucher.dto';

@ApiTags('USER VOUCHER')
@ApiBearerAuth()
@Role([RoleType.USER])
@Controller('voucher')
export class VoucherController {
  constructor(private readonly voucherService: VoucherService) {}

  @ApiOperation({ summary: '[USER] FIND ALL VOUCHER' })
  @ApiResponse({ status: 200, type: ListVoucherResponseDto })
  @Get()
  async findAll(
    @Query() query: ListVoucherQueryDto,
    @User() user: UserRequestPayload,
  ): Promise<ListVoucherResponseDto> {
    return this.voucherService.findAll(query, user);
  }

  @ApiOperation({ summary: '[USER] TAKE VOUCHER' })
  @ApiResponse({ status: 200, type: SuccessResponseDto })
  @Post()
  async takeVoucher(
    @User() user: UserRequestPayload,
    @Body() body: TakeVoucherDto,
  ): Promise<SuccessResponseDto> {
    return await this.voucherService.takeVoucher(user, body);
  }

  @ApiOperation({ summary: '[USER] FIND ALL PERSONAL VOUCHER' })
  @ApiResponse({ status: 200, type: ListVoucherResponseDto })
  @Get('/personal')
  async findAllPersonalVoucher(
    @User() user: UserRequestPayload,
    @Query() query: ListVoucherQueryDto,
  ): Promise<ListVoucherResponseDto> {
    return await this.voucherService.findAllPersonalVoucher(user, query);
  }
}
