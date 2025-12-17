import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/base.service';
import { Order } from 'src/entities/order.entity';
import { Brackets, Repository } from 'typeorm';
import { AdminListOrderQueryDto } from './dto/request/admin-list-order-query.dto';
import { AdminListOrderResponseDto } from './dto/response/admin-list-order-response.dto';
import { plainToInstance } from 'class-transformer';
import { lowerCase } from 'lodash';
import { AdminOrderDetailResponseDto } from './dto/response/admin-order-detail-response.dto';
import { OrderItemResponseDto } from 'src/modules/order/dto/response/order-item-response.dto';
import { AdminUpdateOrderStatusDto } from './dto/request/admin-update-order-status.dto';
import { SuccessResponseDto } from 'src/common/dto/success-response.dto';
import { ServerException } from 'src/exceptions/sever.exception';
import { ERROR_RESPONSE } from 'src/common/constants/error-response.constants';
import { SaveNotificationDto } from 'src/modules/notification/dto/request/save-notification.dto';
import { OrderStatus } from 'src/common/enum/order-status.enum';
import { NotificationService } from 'src/modules/notification/notification.service';
import { parseOrderStatus } from 'src/common/utils/parse-order-status.util';
import { UserRequestPayload } from 'src/modules/auth/auth.interface';
import { NotificationNavigateTo } from 'src/common/enum/notification-navigate-to.enum';
import { AdminUpdateOrderPaymentStatusDto } from './dto/request/admin-update-order-payment-status.dto';
import { AdminOrderStaticResponseDto } from './dto/response/admin-order-static-response.dto';

@Injectable()
export class AdminOrderService extends BaseService {
  constructor(
    @InjectRepository(Order) private readonly orderRepo: Repository<Order>,
    private readonly notificationService: NotificationService,
  ) {
    super();
  }

  async findAll(dto: AdminListOrderQueryDto): Promise<AdminListOrderResponseDto> {
    const { page, pageSize, search, orderStatusFilter } = dto;

    const queryBuilder = this.orderRepo
      .createQueryBuilder('order')
      .leftJoinAndSelect('order.user', 'user')
      .leftJoinAndSelect('order.orderItems', 'orderItems')
      .leftJoinAndSelect('orderItems.productVariant', 'productVariant');

    if (search) {
      queryBuilder.where(
        new Brackets((qb) =>
          qb.where('LOWER(user.email) LIKE :search', {
            search: lowerCase(`%${search}%`),
          }),
        ),
      );
    }

    if (orderStatusFilter) {
      queryBuilder.andWhere('order.status = :status', {
        status: orderStatusFilter,
      });
    }

    const { data, paginate } = await this.paginate(queryBuilder, page, pageSize);

    return plainToInstance(AdminListOrderResponseDto, {
      data: data.map((order) => ({
        ...order,
        amount: this.amountCalculator(order),
        userEmail: order.user.email,
      })),
      paginate,
    });
  }

  private amountCalculator(order: Order): number {
    let amount = 0;

    order.orderItems.map((orderItem) => {
      amount += orderItem.quantity * orderItem.productVariant.price;
    });

    return amount;
  }

  async findOne(id: string): Promise<AdminOrderDetailResponseDto> {
    const queryBuilder = this.orderRepo
      .createQueryBuilder('order')
      .leftJoinAndSelect('order.orderItems', 'orderItems')
      .leftJoinAndSelect('order.user', 'user')
      .leftJoinAndSelect('order.voucher', 'voucher')
      .leftJoinAndSelect('order.address', 'address')
      .leftJoinAndSelect('orderItems.productVariant', 'productVariant')
      .leftJoinAndSelect('productVariant.variantValues', 'variantValues')
      .leftJoinAndSelect('variantValues.variant', 'variant')
      .leftJoinAndSelect('productVariant.product', 'product')
      .leftJoinAndSelect('product.productImages', 'productImages')
      .where('order.id = :id', { id });

    const order = await queryBuilder.getOne();

    return plainToInstance(AdminOrderDetailResponseDto, {
      ...order,
      // amount: this.amountCalculator(order),
      amount: order.finalPrice || this.amountCalculator(order),
      orderItems: order.orderItems.map((orderItem) => ({
        ...orderItem,
        product: orderItem.productVariant.product,
      })),
    });
  }

  async updateOrderStatus(id: string, dto: AdminUpdateOrderStatusDto): Promise<SuccessResponseDto> {
    const { status } = dto;

    const order = await this.orderRepo.findOneBy({ id });
    if (!order) {
      throw new ServerException({
        ...ERROR_RESPONSE.NOT_FOUND,
        message: 'Order not found',
      });
    }

    await this.orderRepo.update({ id }, { status });
    const notification = this.createOrderNotification(order.userId, order.status, status, id);
    await this.notificationService.create(notification);

    return this.successResponse();
  }

  async updatePaymentStatus(
    id: string,
    dto: AdminUpdateOrderPaymentStatusDto,
  ): Promise<SuccessResponseDto> {
    const { paymentStatus } = dto;
    await this.orderRepo.update({ id }, { paymentStatus });
    return this.successResponse();
  }

  private createOrderNotification(
    userId: string,
    preStatus: OrderStatus,
    postStatus: OrderStatus,
    orderId: string,
  ): SaveNotificationDto {
    return {
      content: `Đơn hàng của bạn đã được chuyển từ trạng thái ${parseOrderStatus(preStatus)} sang trạng thái ${parseOrderStatus(postStatus)}.`,
      navigateTo: NotificationNavigateTo.ORDER_DETAIL_PAGE,
      title: `Cập nhập trạng thái đơn hàng`,
      triggerBy: `Cập nhập trạng thái order`,
      meta: {
        orderId,
      },
      userId,
    };
  }

  async getOrderStatic(): Promise<AdminOrderStaticResponseDto> {
    return {
      pending: await this.getCountOrderByStatus(OrderStatus.PENDING),
      confirmed: await this.getCountOrderByStatus(OrderStatus.CONFIRMED),
      shipping: await this.getCountOrderByStatus(OrderStatus.SHIPPING),
      completed: await this.getCountOrderByStatus(OrderStatus.COMPLETED),
    };
  }

  private async getCountOrderByStatus(status: OrderStatus): Promise<number> {
    const queryBuilder = this.orderRepo
      .createQueryBuilder('order')
      .where('order.status = :status', { status });

    return await queryBuilder.getCount();
  }
}
