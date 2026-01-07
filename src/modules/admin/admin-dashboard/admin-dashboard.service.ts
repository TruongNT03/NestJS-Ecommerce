import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/base.service';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { Between, Repository } from 'typeorm';
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
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const day = currentDate.getDate();

    if (statisticBy === AdminDashboardStatisticBy.YEAR) {
      return await this.getStatisticByYear(year);
    }
    if (statisticBy === AdminDashboardStatisticBy.MONTH) {
      return await this.getStatisticByMonth(month, year);
    }
    if (statisticBy === AdminDashboardStatisticBy.DAY) {
      return await this.getStatisticByDay(day, month, year);
    }
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

  private calculatorRevenue(orders: Order[]): number {
    let total = 0;
    orders.map((order) => {
      total += order.finalPrice;
    });
    return total;
  }

  private async getStatisticByYear(year: number): Promise<AdminDashboardStatisticResponseDto> {
    const start = new Date(year, 0, 1);
    const end = new Date(year, 11, 31, 23, 59, 59, 999);

    const users = await this.userRepo.find({
      where: {
        createdAt: Between(start, end),
      },
    });

    const orders = await this.orderRepo.find({
      where: {
        createdAt: Between(start, end),
      },
    });

    const revenue = this.calculatorRevenue(orders);

    return plainToInstance(AdminDashboardStatisticResponseDto, {
      newUserCount: users.length,
      newOrderCount: orders.length,
      revenue,
    });
  }

  private async getStatisticByMonth(
    month: number,
    year: number,
  ): Promise<AdminDashboardStatisticResponseDto> {
    const start = new Date(year, month, 1);
    const end = new Date(year, month + 1, 0, 23, 59, 59, 999);

    const users = await this.userRepo.find({
      where: {
        createdAt: Between(start, end),
      },
    });

    const orders = await this.orderRepo.find({
      where: {
        createdAt: Between(start, end),
      },
    });

    const revenue = this.calculatorRevenue(orders);

    return plainToInstance(AdminDashboardStatisticResponseDto, {
      newUserCount: users.length,
      newOrderCount: orders.length,
      revenue,
    });
  }

  private async getStatisticByDay(
    day: number,
    month: number,
    year: number,
  ): Promise<AdminDashboardStatisticResponseDto> {
    const start = new Date(year, month, day, 0);
    const end = new Date(year, month, day, 23, 59, 59, 999);

    const users = await this.userRepo.find({
      where: {
        createdAt: Between(start, end),
      },
    });

    const orders = await this.orderRepo.find({
      where: {
        createdAt: Between(start, end),
      },
    });

    const revenue = this.calculatorRevenue(orders);

    return plainToInstance(AdminDashboardStatisticResponseDto, {
      newUserCount: users.length,
      newOrderCount: orders.length,
      revenue,
    });
  }
}
