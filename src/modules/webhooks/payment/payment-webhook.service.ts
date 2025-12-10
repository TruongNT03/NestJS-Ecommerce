import { Inject, Injectable } from '@nestjs/common';
import { SuccessResponseDto } from 'src/common/dto/success-response.dto';
import { BaseService } from 'src/base.service';
import { Webhook } from '@payos/node';
import { InjectRepository } from '@nestjs/typeorm';
import { Payment } from 'src/entities/payment.entity';
import { Repository } from 'typeorm';
import { PaymentStatus } from 'src/common/enum/payment-status.enum';
import { Order } from 'src/entities/order.entity';
import { OrderStatus } from 'src/common/enum/order-status.enum';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

@Injectable()
export class PaymentWebhookService extends BaseService {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepo: Repository<Payment>,
    @InjectRepository(Order)
    private readonly orderRepo: Repository<Order>,
    @Inject(WINSTON_MODULE_PROVIDER)
    private readonly logger: Logger,
  ) {
    super();
  }
  async payment(dto: Webhook): Promise<SuccessResponseDto> {
    this.logger.info(
      '[PaymentWebhookService.payment] Has request to Payment Webhook',
    );
    const { code, data, desc, signature, success } = dto;
    // Defined when create
    const orderCode = data.description;
    if (success) {
      // Change payment status
      await this.paymentRepo.update(
        { orderCode: orderCode },
        {
          status: PaymentStatus.SUCCESS,
        },
      );
      // Change status in order
      await this.orderRepo.update(
        {
          orderCode: orderCode,
        },
        { status: OrderStatus.SHIPPING, paymentStatus: PaymentStatus.SUCCESS },
      );
    }
    if (!success) {
      await this.paymentRepo.update(
        { orderCode: orderCode },
        {
          status: PaymentStatus.FAIlED,
        },
      );
    }
    return {
      success: true,
    };
  }
}
