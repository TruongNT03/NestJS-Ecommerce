import { Inject, Injectable } from '@nestjs/common';
import { BaseService } from 'src/base.service';
import { UserRequestPayload } from '../auth/auth.interface';
import { CreateOrderFromCartDto } from './dto/request/create-order-from-cart.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from 'src/entities/order.entity';
import { DataSource, In, Repository } from 'typeorm';
import { SaveUuidResponseDto } from 'src/common/dto/save-response.dto';
import { ServerException } from 'src/exceptions/sever.exception';
import { ERROR_RESPONSE } from 'src/common/constants/error-response.constants';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { Address } from 'src/entities/address.entity';
import { ProductVariant } from 'src/entities/product-variant.entity';
import { CartItem } from 'src/entities/cart-item.entity';
import { OrderItem } from 'src/entities/order-item.entity';
import { OrderStatus } from 'src/common/enum/order-status.enum';
import { ListOrderResponseDto } from './dto/response/list-oder-response.dto';
import { ListOrderQueryDto } from './dto/request/list-order-query.dto';
import { plainToInstance } from 'class-transformer';
import { OrderResponseDto } from './dto/response/order-response.dto';
import { AddressResponseDto } from '../address/dto/response/address-response.dto';
import {
  OrderItemProductResponseDto,
  OrderItemResponseDto,
} from './dto/response/order-item-response.dto';
import { PaymentStatus } from 'src/common/enum/payment-status.enum';
import { PaymentType } from 'src/common/enum/payment-type.enum';
import { SuccessResponseDto } from 'src/common/dto/success-response.dto';
import { Payment } from 'src/entities/payment.entity';
import { Voucher, VoucherType } from 'src/entities/voucher.entity';
import { UserVoucher } from 'src/entities/user-voucher.entity';

@Injectable()
export class OrderService extends BaseService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepo: Repository<Order>,
    @InjectRepository(Address)
    private readonly addressRepo: Repository<Address>,
    @InjectRepository(ProductVariant)
    private readonly productVariantRepo: Repository<ProductVariant>,
    @InjectRepository(CartItem)
    private readonly cartItemRepo: Repository<CartItem>,
    private readonly dataSource: DataSource,
    @Inject(WINSTON_MODULE_PROVIDER)
    private readonly logger: Logger,
    @InjectRepository(Payment)
    private readonly paymentRepo: Repository<Payment>,
  ) {
    super();
  }

  async createOrderFromCart(
    user: UserRequestPayload,
    dto: CreateOrderFromCartDto,
  ): Promise<SaveUuidResponseDto> {
    const userId = user.id;
    const { cartItemIds, addressId, paymentType, voucherId } = dto;
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.startTransaction();
    try {
      // Check address
      const address = await queryRunner.manager.findOneBy(Address, {
        id: addressId,
      });
      if (!address) {
        throw new ServerException({
          ...ERROR_RESPONSE.NOT_FOUND,
          message: 'Địa chỉ không hợp lệ',
        });
      }

      // Check cart items
      const cartItems = await queryRunner.manager.find(CartItem, {
        where: { id: In(cartItemIds) },
        relations: ['productVariant', 'productVariant.product'],
      });

      if (!cartItems || cartItemIds.length !== cartItems.length) {
        throw new ServerException({
          ...ERROR_RESPONSE.BAD_REQUEST,
          message: 'Sản phẩm không hợp lệ',
        });
      }

      // Check product stock
      await Promise.all(
        cartItems.map(async (cartItem) => {
          const productVariant = await queryRunner.manager.findOne(ProductVariant, {
            where: { id: cartItem.productVariantId },
            relations: ['product'],
          });
          if (!productVariant) {
            throw new ServerException({
              ...ERROR_RESPONSE.BAD_REQUEST,
              message: 'Sản phẩm không hợp lệ',
            });
          }
          if (productVariant.stock < cartItem.quantity) {
            throw new ServerException({
              ...ERROR_RESPONSE.BAD_REQUEST,
              message: `Sản phẩm ${productVariant.product.name} không còn đủ số lượng`,
            });
          }
        }),
      );

      // Calculate total price
      let totalPrice = 0;

      cartItems.map((cartItem) => {
        // For case product has discount value
        if (cartItem.productVariant.product.discount) {
          totalPrice +=
            cartItem.quantity *
            ((cartItem.productVariant.price * (100 - cartItem.productVariant.product.discount)) /
              100);

          // For case product has not discount value
        } else {
          totalPrice += cartItem.quantity * cartItem.productVariant.price;
        }
      });

      // Voucher
      let discountPrice: number;
      if (voucherId) {
        const voucher = await queryRunner.manager.findOne(Voucher, {
          where: {
            id: voucherId,
            userVouchers: {
              userId: user.id,
              isUsed: false,
            },
          },
        });
        if (!voucher) {
          throw new Error('Voucher invalid');
        }

        if (voucher.minOrderValue && voucher.minOrderValue > totalPrice) {
          throw new Error('Order value does not meet the minimum requirement for this voucher');
        }

        if (voucher.type === VoucherType.FIXED) {
          discountPrice = totalPrice - voucher.discountValue;
        }
        if (voucher.type === VoucherType.PERCENT) {
          const minusPrice = (totalPrice * voucher.discountValue) / 100;
          discountPrice =
            minusPrice > voucher.maxDiscountValue
              ? totalPrice - voucher.maxDiscountValue
              : totalPrice - minusPrice;
        }

        await queryRunner.manager.update(
          Voucher,
          {
            id: voucherId,
          },
          { totalUsed: voucher.totalUsed ? 1 : voucher.totalUsed + 1 },
        );

        await queryRunner.manager.update(
          UserVoucher,
          {
            userId: user.id,
            voucherId,
          },
          {
            isUsed: true,
            usedAt: new Date(),
          },
        );
      }

      // Create order
      const order = await queryRunner.manager.save(
        Order,
        {
          userId,
          addressId,
          status: OrderStatus.PENDING,
          finalPrice: voucherId ? discountPrice : totalPrice,
          voucherId,
          paymentType,
          paymentStatus:
            paymentType === PaymentType.COD ? PaymentStatus.NOT_YET : PaymentStatus.PENDING,
        },
        {},
      );

      // Create Order Items
      await Promise.all(
        cartItems.map(async (cartItem) => {
          const orderItem = await queryRunner.manager.save(OrderItem, {
            orderId: order.id,
            productVariantId: cartItem.productVariantId,
            quantity: cartItem.quantity,
          });
        }),
      );

      // Update Product Variant stock
      for (const cartItem of cartItems) {
        const productVariant = await queryRunner.manager.findOne(ProductVariant, {
          where: { id: cartItem.productVariantId },
          lock: { mode: 'pessimistic_write' },
        });

        if (!productVariant)
          throw new ServerException({
            ...ERROR_RESPONSE.BAD_REQUEST,
            message: 'Sản phẩm không hợp lệ',
          });

        await queryRunner.manager.update(
          ProductVariant,
          { id: productVariant.id },
          { stock: productVariant.stock - cartItem.quantity },
        );
      }

      await queryRunner.commitTransaction();
      return this.saveUuidResponse(order.id);
    } catch (error) {
      await queryRunner.rollbackTransaction();
      this.logger.error('[OrderService.createOrderFromCart] Fail to create order from cart');
      throw new ServerException({
        ...ERROR_RESPONSE.BAD_REQUEST,
        message: error.message || error,
      });
    } finally {
      await queryRunner.release();
    }
  }

  async getAllOrder(
    user: UserRequestPayload,
    query: ListOrderQueryDto,
  ): Promise<ListOrderResponseDto> {
    const userId = user.id;
    const { page, pageSize } = query;

    const queryBuilder = this.orderRepo
      .createQueryBuilder('order')
      .leftJoinAndSelect('order.address', 'address')
      .leftJoinAndSelect('order.payment', 'payment')
      .leftJoinAndSelect('order.orderItems', 'orderItems')
      .leftJoinAndSelect('order.voucher', 'voucher')
      .leftJoinAndSelect('orderItems.productVariant', 'productVariant')
      .leftJoinAndSelect('productVariant.variantValues', 'variantValues')
      .leftJoinAndSelect('variantValues.variant', 'variant')
      .leftJoinAndSelect('productVariant.product', 'product')
      .leftJoinAndSelect('product.productImages', 'productImages')
      .where('order.userId = :userId', { userId });

    const { data, paginate } = await this.paginate(queryBuilder, page, pageSize);

    return plainToInstance(ListOrderResponseDto, {
      data: data.map((order) =>
        plainToInstance(OrderResponseDto, {
          id: order.id,
          address: plainToInstance(AddressResponseDto, order.address),
          status: order.status,
          orderItems: order.orderItems.map((orderItem) =>
            plainToInstance(OrderItemResponseDto, {
              ...orderItem,
              product: plainToInstance(
                OrderItemProductResponseDto,
                orderItem.productVariant.product,
              ),
            }),
          ),
          amount:
            order.finalPrice ||
            order.orderItems.reduce(
              (prev, current) => (prev = current.quantity * current.productVariant.price),
              0,
            ),
          voucher: order.voucher,
          qrUrl: order?.payment?.qrImageUrl,
          qrStatus: order?.payment?.status,
          createdAt: order.createdAt,
        }),
      ),
      paginate,
    });
  }

  async cancelQrOrder(orderId: string): Promise<SuccessResponseDto> {
    const order = await this.orderRepo.findOne({
      where: { id: orderId },
      relations: ['orderItems'],
    });
    if (!order) {
      throw new ServerException(ERROR_RESPONSE.NOT_FOUND);
    }

    await Promise.all(
      order.orderItems.map(async (orderItem) => {
        const productVariant = await this.productVariantRepo.findOne({
          where: { id: orderItem.productVariantId },
        });
        await this.productVariantRepo.save({
          id: productVariant.id,
          stock: productVariant.stock + orderItem.quantity,
        });
      }),
    );

    await this.orderRepo.update({ id: orderId }, { status: OrderStatus.CANCEL });
    await this.paymentRepo.update({ orderId }, { status: PaymentStatus.CANCEL });

    return this.successResponse();
  }
}
