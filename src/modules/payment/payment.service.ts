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
import { CreatePaymentResponseDto } from './dto/response/create-payment-response.dto';
import { plainToInstance } from 'class-transformer';
import { CheckPaymentStatusResponseDto } from './dto/response/check-payment-status-response.dto';
import { UserRequestPayload } from '../auth/auth.interface';

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

  async create(dto: CreatePaymentDto): Promise<CreatePaymentResponseDto> {
    const { orderId } = dto;

    const order = await this.orderRepo.findOne({
      where: {
        id: orderId,
      },
      relations: [
        'user',
        'address',
        'orderItems',
        'orderItems.productVariant',
        'orderItems.productVariant.product',
      ],
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
      if (orderItem.productVariant.product.discount) {
        amount +=
          orderItem.quantity *
          ((orderItem.productVariant.price * (100 - orderItem.productVariant.product.discount)) /
            100);
      } else {
        amount += orderItem.quantity * orderItem.productVariant.price;
      }
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
      amount: order.finalPrice,
      description: `${orderCode}`,
      buyerName: order.user.name,
      buyerAddress: order.address.detail,
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
      qrImageUrl: createPaymentLinkResponse.qrCode,
      paymentType: PaymentType.QR,
      status: PaymentStatus.PENDING,
      orderId: order.id,
    });

    const createdPayment = await this.paymentRepo.save(payment);

    return plainToInstance(CreatePaymentResponseDto, createdPayment);
  }

  async checkPaymentStatus(
    id: string,
    user: UserRequestPayload,
  ): Promise<CheckPaymentStatusResponseDto> {
    const payment = await this.paymentRepo.findOne({
      where: {
        id,
        order: {
          userId: user.id,
        },
      },
      relations: ['order'],
    });

    if (!payment) {
      throw new ServerException({
        ...ERROR_RESPONSE.NOT_FOUND,
        message: 'Payment not found',
      });
    }

    return plainToInstance(CheckPaymentStatusResponseDto, payment);
  }
}
