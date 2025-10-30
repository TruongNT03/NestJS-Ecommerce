import { Injectable } from '@nestjs/common';
import { SuccessResponseDto } from 'src/common/dto/success-response.dto';
import { BaseService } from 'src/base.service';
import { Webhook } from '@payos/node';
import { InjectRepository } from '@nestjs/typeorm';
import { Payment } from 'src/entities/payment.entity';
import { Repository } from 'typeorm';
import { PaymentStatus } from 'src/common/enum/payment-status.enum';
import { Order } from 'src/entities/order.entity';
import { OrderStatus } from 'src/common/enum/order-status.enum';

@Injectable()
export class PaymentWebhookService extends BaseService {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepo: Repository<Payment>,
    @InjectRepository(Order)
    private readonly orderRepo: Repository<Order>,
  ) {
    super();
  }
  async payment(dto: Webhook): Promise<SuccessResponseDto> {
    const { code, data, desc, signature, success } = dto;
    // Defined when create
    const orderId = data.description;
    if (success) {
      // Change payment status
      await this.paymentRepo.update(
        { orderId: orderId },
        {
          status: PaymentStatus.SUCCESS,
        },
      );
      // Change status in order
      await this.orderRepo.update(
        {
          id: orderId,
        },
        { status: OrderStatus.SHIPPING },
      );
    }
    if (!success) {
      await this.paymentRepo.update(
        { orderId: orderId },
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
