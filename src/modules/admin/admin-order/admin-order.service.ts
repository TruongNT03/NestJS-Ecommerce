import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/base.service';
import { Order } from 'src/entities/order.entity';
import { Brackets, Repository } from 'typeorm';
import { AdminListOrderQueryDto } from './dto/request/admin-list-order-query.dto';
import { AdminListOrderResponseDto } from './dto/response/admin-list-order-response.dto';
import { plainToInstance } from 'class-transformer';
import { lowerCase } from 'lodash';

@Injectable()
export class AdminOrderService extends BaseService {
  constructor(
    @InjectRepository(Order) private readonly OrderRepo: Repository<Order>,
  ) {
    super();
  }

  async findAll(
    dto: AdminListOrderQueryDto,
  ): Promise<AdminListOrderResponseDto> {
    const { page, pageSize, search } = dto;

    const queryBuilder = this.OrderRepo.createQueryBuilder('order')
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

    const { data, paginate } = await this.paginate(
      queryBuilder,
      page,
      pageSize,
    );

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
}
