import { Body, Controller, Post } from '@nestjs/common';
import { PaymentWebhookService } from './payment-webhook.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { SuccessResponseDto } from 'src/common/dto/success-response.dto';
import { Webhook } from '@payos/node';
import { Public } from 'src/decorators/public.decorator';

@Controller('webhook/payment')
export class PaymentWebhookController {
  constructor(private readonly paymentService: PaymentWebhookService) {}

  @ApiOperation({ summary: '[WEBHOOK] RECEIVED PAYMENT INFORMATION' })
  @ApiResponse({ status: 200, type: SuccessResponseDto })
  @Post()
  @Public()
  async payment(@Body() body: Webhook): Promise<SuccessResponseDto> {
    return await this.paymentService.payment(body);
  }
}
