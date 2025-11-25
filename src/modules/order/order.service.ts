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
  ) {
    super();
  }

  async createOrderFromCart(
    user: UserRequestPayload,
    dto: CreateOrderFromCartDto,
  ): Promise<SaveUuidResponseDto> {
    const userId = user.id;
    const { cartItemIds, addressId, paymentType } = dto;
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
        relations: ['productVariant'],
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
          const productVariant = await queryRunner.manager.findOne(
            ProductVariant,
            {
              where: { id: cartItem.productVariantId },
              relations: ['product'],
            },
          );
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
      const totalPrice = cartItems
        .map((cartItem) => cartItem.quantity * cartItem.productVariant.price)
        .reduce((sum, current) => (sum += current), 0);

      // Create order
      const order = await queryRunner.manager.save(
        Order,
        {
          userId,
          addressId,
          status: OrderStatus.PENDING,
          totalPrice,
          paymentType,
          paymentStatus: false,
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
        const productVariant = await queryRunner.manager.findOne(
          ProductVariant,
          {
            where: { id: cartItem.productVariantId },
            lock: { mode: 'pessimistic_write' },
          },
        );

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
      this.logger.error(
        '[OrderService.createOrderFromCart] Fail to create order from cart',
      );
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
      .leftJoinAndSelect('order.orderItems', 'orderItems')
      .leftJoinAndSelect('orderItems.productVariant', 'productVariant')
      .leftJoinAndSelect('productVariant.variantValues', 'variantValues')
      .leftJoinAndSelect('variantValues.variant', 'variant')
      .leftJoinAndSelect('productVariant.product', 'product')
      .leftJoinAndSelect('product.productImages', 'productImages')
      .where('order.userId = :userId', { userId });

    const { data, paginate } = await this.paginate(
      queryBuilder,
      page,
      pageSize,
    );

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
          amount: order.orderItems.reduce(
            (prev, current) =>
              (prev = current.quantity * current.productVariant.price),
            0,
          ),
          createdAt: order.createdAt,
        }),
      ),
      paginate,
    });
  }
}
