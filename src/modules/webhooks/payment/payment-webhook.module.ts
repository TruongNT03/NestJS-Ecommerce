import { Module } from '@nestjs/common';
import { PaymentWebhookService } from './payment-webhook.service';
import { PaymentWebhookController } from './payment-webhook.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payment } from 'src/entities/payment.entity';
import { Order } from 'src/entities/order.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Payment, Order])],
  controllers: [PaymentWebhookController],
  providers: [PaymentWebhookService],
})
export class PaymentWebhookModule {}
