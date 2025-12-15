import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/base.service';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { Order } from 'src/entities/order.entity';
import * as dayjs from 'dayjs';
import { AdminDashboardStatisticResponseDto } from './dto/response/admin-dashboard-statistic-response.dto';
import {
  AdminDashboardStatisticBy,
  AdminDashboardStatisticQueryDto,
} from './dto/request/admin-dashboard-statistic-query.dto';
import { AdminRevenueResponseDto } from './dto/response/admin-revenue-response.dto';
import { OrderStatus } from 'src/common/enum/order-status.enum';
import { AdminDashboardPendingOrderResponseDto } from './dto/response/admin-dashboard-pending-order-response.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class AdminDashboardService extends BaseService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
    @InjectRepository(Order)
    private readonly orderRepo: Repository<Order>,
  ) {
    super();
  }

  async getDashboardStatistic(
    dto: AdminDashboardStatisticQueryDto,
  ): Promise<AdminDashboardStatisticResponseDto> {
    const { newOrderCount, newUserCount, revenue } =
      await this.queryBuilderGetDashboardStatistic(dto);

    return {
      newOrderCount,
      newUserCount,
      revenue,
    };
  }

  private async queryBuilderGetDashboardStatistic(
    dto: AdminDashboardStatisticQueryDto,
  ): Promise<AdminDashboardStatisticResponseDto> {
    const { statisticBy } = dto;

    const currentDate = new Date();
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();

    const newUserQueryBuilder = this.userRepo
      .createQueryBuilder('user')
      .where('EXTRACT(YEAR FROM "user"."created_at") = :year', { year });

    const newOrderQueryBuilder = this.orderRepo
      .createQueryBuilder('order')
      .where('EXTRACT(YEAR FROM "order"."created_at") = :year', { year });

    if (statisticBy === AdminDashboardStatisticBy.MONTH) {
      newUserQueryBuilder.andWhere('EXTRACT(MONTH FROM "user"."created_at") = :month', {
        month,
      });
      newOrderQueryBuilder.andWhere('EXTRACT(MONTH FROM "order"."created_at") = :month', {
        month,
      });
    } else if (statisticBy === AdminDashboardStatisticBy.DAY || !statisticBy) {
      newUserQueryBuilder.andWhere('EXTRACT(MONTH FROM "user"."created_at") = :month', {
        month,
      });
      newUserQueryBuilder.andWhere('EXTRACT(DAY FROM "user"."created_at") = :day', { day });

      newOrderQueryBuilder.andWhere('EXTRACT(MONTH FROM "order"."created_at") = :month', {
        month,
      });
      newOrderQueryBuilder.andWhere('EXTRACT(DAY FROM "order"."created_at") = :day', { day });
    }

    const revenue = 0;

    return {
      newOrderCount: await newOrderQueryBuilder.getCount(),
      newUserCount: await newUserQueryBuilder.getCount(),
      revenue,
    };
  }

  async getLastThirtyDayChartData(): Promise<AdminRevenueResponseDto[]> {
    // Data Revenue Last 30 Day
    const revenueList: AdminRevenueResponseDto[] = [];
    for (let i = 0; i < 30; i++) {
      const startOfDay = dayjs()
        .subtract(30 - i, 'day')
        .startOf('day')
        .toDate();
      const endOfDay = dayjs()
        .subtract(30 - i, 'day')
        .endOf('day')
        .toDate();

      const orders = await this.orderRepo
        .createQueryBuilder('order')
        .leftJoinAndSelect('order.orderItems', 'orderItem')
        .leftJoinAndSelect('orderItem.productVariant', 'productVariant')
        .leftJoinAndSelect('productVariant.product', 'product')
        .where('order.status = :status', { status: OrderStatus.COMPLETED })
        .andWhere('order.updatedAt BETWEEN :startOfDay AND :endOfDay', {
          startOfDay,
          endOfDay,
        })
        .getMany();

      let totalRevenueOfDay = 0;
      await Promise.all(
        orders.map((order) => {
          order.orderItems.map((orderItem) => {
            totalRevenueOfDay += orderItem.quantity * orderItem.productVariant.price;
          });
        }),
      );

      revenueList.push({
        revenue: totalRevenueOfDay,
        date: dayjs()
          .subtract(30 - i, 'day')
          .toDate(),
      });
    }
    return revenueList;
  }

  async getPendingOrder(): Promise<AdminDashboardPendingOrderResponseDto[]> {
    const orders = await this.orderRepo.find({
      where: {
        status: OrderStatus.PENDING,
      },
      relations: ['orderItems', 'orderItems.productVariant', 'user'],
      order: {
        createdAt: 'DESC',
      },
      take: 4,
    });

    const result: AdminDashboardPendingOrderResponseDto[] = [];
    for (let order of orders) {
      let amount = 0;
      order.orderItems.map((orderItem) => {
        amount += orderItem.quantity * orderItem.productVariant.price;
      });
      result.push({
        id: order.id,
        userName: order.user?.name,
        userEmail: order.user?.email,
        totalItem: order.orderItems.length,
        amount: amount,
        createdAt: order.createdAt,
        updatedAt: order.updatedAt,
      });
    }
    return plainToInstance(AdminDashboardPendingOrderResponseDto, result);
  }
}
