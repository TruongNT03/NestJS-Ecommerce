import { Body, Controller, Get, Param, Post, Req, Res } from '@nestjs/common';
import { PaymentService } from './payment.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Role } from 'src/decorators/role.decorator';
import { RoleType } from 'src/common/enum/role.enum';
import { Public } from 'src/decorators/public.decorator';
import { CreatePaymentDto } from './dto/request/create-payment.dto';
import { CreatePaymentResponseDto } from './dto/response/create-payment-response.dto';
import { CheckPaymentStatusResponseDto } from './dto/response/check-payment-status-response.dto';
import { User } from 'src/decorators/user.decorator';
import { UserRequestPayload } from '../auth/auth.interface';

@ApiTags('[USER] PAYMENT')
@Public()
@ApiBearerAuth()
@Role([RoleType.USER])
@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @ApiOperation({ summary: '[USER] CREATE PAYMENT' })
  @ApiResponse({ status: 200, type: CreatePaymentResponseDto })
  @Post('')
  async create(
    @Body() body: CreatePaymentDto,
  ): Promise<CreatePaymentResponseDto> {
    return await this.paymentService.create(body);
  }

  @ApiOperation({ summary: '[USER] CHECK PAYMENT STATUS' })
  @ApiResponse({ status: 200, type: CheckPaymentStatusResponseDto })
  @Get(':id/status')
  async checkPaymentStatus(
    @Param('id') id: string,
    @User('id') user: UserRequestPayload,
  ): Promise<CheckPaymentStatusResponseDto> {
    return await this.paymentService.checkPaymentStatus(id, user);
  }
}
