import { Controller, Get, Query } from '@nestjs/common';
import { AdminDashboardService } from './admin-dashboard.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Role } from 'src/decorators/role.decorator';
import { RoleType } from 'src/common/enum/role.enum';
import { AdminDashboardStatisticResponseDto } from './dto/response/admin-dashboard-statistic-response.dto';
import { AdminDashboardStatisticQueryDto } from './dto/request/admin-dashboard-statistic-query.dto';
import { AdminRevenueResponseDto } from './dto/response/admin-revenue-response.dto';
import { AdminDashboardPendingOrderResponseDto } from './dto/response/admin-dashboard-pending-order-response.dto';

@ApiTags('ADMIN DASHBOARD')
@Role([RoleType.ADMIN])
@ApiBearerAuth()
@Controller('admin-dashboard')
export class AdminDashboardController {
  constructor(private readonly adminDashboardService: AdminDashboardService) {}

  @ApiOperation({ summary: '[ADMIN] DASHBOARD STATIC' })
  @ApiResponse({ status: 200, type: AdminDashboardStatisticResponseDto })
  @Get('statistic')
  async getDashboardStatistic(
    @Query() query: AdminDashboardStatisticQueryDto,
  ): Promise<AdminDashboardStatisticResponseDto> {
    return await this.adminDashboardService.getDashboardStatistic(query);
  }

  @ApiOperation({ summary: '[ADMIN] GET LAST 30 DAY REVENUE CHART DATA' })
  @ApiResponse({ status: 200, type: [AdminRevenueResponseDto] })
  @Get('chart-data')
  async getLastThirtyDayChartData(): Promise<AdminRevenueResponseDto[]> {
    return await this.adminDashboardService.getLastThirtyDayChartData();
  }

  @ApiOperation({ summary: '[ADMIN] OVERVIEW PENDING ORDER' })
  @ApiResponse({ status: 200, type: [AdminDashboardPendingOrderResponseDto] })
  @Get('pending-order')
  async getPendingOrder(): Promise<AdminDashboardPendingOrderResponseDto[]> {
    return await this.adminDashboardService.getPendingOrder();
  }
}
