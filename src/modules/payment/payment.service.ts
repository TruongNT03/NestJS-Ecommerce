import { Inject, Injectable } from '@nestjs/common';
import { Request, Response } from 'express';
import { BaseService } from 'src/base.service';
import { CreatePaymentDto } from './dto/request/create-payment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from 'src/entities/order.entity';
import { Repository } from 'typeorm';
import { PaymentType } from 'src/common/enum/payment-type.enum';
import { ServerException } from 'src/exceptions/sever.exception';
import { ERROR_RESPONSE } from 'src/common/constants/error-response.constants';
import { payosConfiguration } from 'src/config';
import { ConfigType } from '@nestjs/config';
import { PayOS } from '@payos/node';
import { OrderStatus } from 'src/common/enum/order-status.enum';
import { Payment } from 'src/entities/payment.entity';
import { PaymentStatus } from 'src/common/enum/payment-status.enum';

@Injectable()
export class PaymentService extends BaseService {
  private payOS: PayOS;
  constructor(
    @Inject(payosConfiguration.KEY)
    private readonly payOSConfig: ConfigType<typeof payosConfiguration>,
    @InjectRepository(Order)
    private readonly orderRepo: Repository<Order>,
    @InjectRepository(Payment)
    private readonly paymentRepo: Repository<Payment>,
  ) {
    super();
    this.payOS = new PayOS({
      apiKey: this.payOSConfig.apiKey,
      clientId: this.payOSConfig.clientId,
      checksumKey: this.payOSConfig.checksumKey,
    });
  }

  async create(dto: CreatePaymentDto) {
    const { orderId } = dto;

    const order = await this.orderRepo.findOne({
      where: {
        id: orderId,
      },
      relations: ['user', 'address', 'orderItems', 'orderItems.productVariant'],
    });

    if (!order) {
      throw new ServerException({
        ...ERROR_RESPONSE.NOT_FOUND,
        message: 'Order not found',
      });
    }

    let amount = 0;

    const listItems: {
      name: string;
      quantity: number;
      price: number;
      unit: string;
    }[] = order.orderItems.map((orderItem) => {
      amount += orderItem.quantity * orderItem.productVariant.price;
      return {
        name: orderItem.productVariant.sku,
        quantity: orderItem.quantity,
        price: orderItem.productVariant.price,
        unit: 'Chiếc',
      };
    });

    const orderCode = Date.now();

    const createPaymentLinkResponse = await this.payOS.paymentRequests.create({
      orderCode: orderCode,
      amount: amount,
      description: `${orderCode}`,
      buyerName: order.user.name,
      buyerAddress: order.address.address,
      buyerEmail: order.user.email,
      items: listItems,
      cancelUrl: this.payOSConfig.cancelUrl,
      returnUrl: this.payOSConfig.returnUrl,
      signature: this.payOSConfig.signature,
    });

    await this.orderRepo.update(
      {
        id: order.id,
      },
      {
        orderCode: `${orderCode}`,
      },
    );

    const payment = this.paymentRepo.create({
      orderCode: `${orderCode}`,
      amount,
      paymentType: PaymentType.QR,
      status: PaymentStatus.PENDING,
      orderId: order.id,
    });

    await this.paymentRepo.save(payment);

    return { checkoutUrl: createPaymentLinkResponse.checkoutUrl };
  }
}
