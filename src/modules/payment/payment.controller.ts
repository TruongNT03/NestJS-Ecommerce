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
import { Request, Response } from 'express';
import { Public } from 'src/decorators/public.decorator';
import { CreatePaymentDto } from './dto/request/create-payment.dto';

@ApiTags('[USER] PAYMENT')
@Public()
@ApiBearerAuth()
@Role([RoleType.USER])
@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @ApiOperation({ summary: '[USER] CREATE PAYMENT' })
  @ApiResponse({ status: 200 })
  @Post('')
  async create(@Body() body: CreatePaymentDto) {
    return await this.paymentService.create(body);
  }
}
