import { Body, Controller, Get, Param, Put, Query } from '@nestjs/common';
import { AdminOrderService } from './admin-order.service';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Role } from 'src/decorators/role.decorator';
import { RoleType } from 'src/common/enum/role.enum';
import { AdminListOrderQueryDto } from './dto/request/admin-list-order-query.dto';
import { AdminListOrderResponseDto } from './dto/response/admin-list-order-response.dto';
import { AdminOrderDetailResponseDto } from './dto/response/admin-order-detail-response.dto';
import { AdminUpdateOrderStatusDto } from './dto/request/admin-update-order-status.dto';
import { SuccessResponseDto } from 'src/common/dto/success-response.dto';
import { AdminUpdateOrderPaymentStatusDto } from './dto/request/admin-update-order-payment-status.dto';
import { AdminOrderStaticResponseDto } from './dto/response/admin-order-static-response.dto';
import { ActionPermission, RolePermission } from 'src/decorators/role-permission.decorator';
import { ModuleEnum } from 'src/common/enum/module.enum';

@ApiTags('[ADMIN] ORDER')
@ApiBearerAuth()
@Role([RoleType.ADMIN, RoleType.ORDER_MANAGER, RoleType.PRODUCT_MANAGER, RoleType.TECHNICIAN])
@Controller('admin-order')
export class AdminOrderController {
  constructor(private readonly adminOrderService: AdminOrderService) {}

  @RolePermission({ module: ModuleEnum.ORDER, permission: ActionPermission.READ })
  @ApiOperation({ summary: '[ADMIN] FIND ALL ORDER' })
  @ApiResponse({ status: 200, type: AdminListOrderResponseDto })
  @Get()
  async findAll(@Query() query: AdminListOrderQueryDto): Promise<AdminListOrderResponseDto> {
    return await this.adminOrderService.findAll(query);
  }

  @RolePermission({ module: ModuleEnum.ORDER, permission: ActionPermission.READ })
  @ApiOperation({ summary: '[ADMIN] ORDER STATIC' })
  @ApiResponse({ status: 200, type: AdminOrderStaticResponseDto })
  @Get('static')
  async getOrderStatic(): Promise<AdminOrderStaticResponseDto> {
    return await this.adminOrderService.getOrderStatic();
  }

  @RolePermission({ module: ModuleEnum.ORDER, permission: ActionPermission.READ })
  @ApiOperation({ summary: '[ADMIN] FIND ONE ORDER BY ID' })
  @ApiResponse({ status: 200, type: AdminOrderDetailResponseDto })
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<AdminOrderDetailResponseDto> {
    return await this.adminOrderService.findOne(id);
  }

  @RolePermission({ module: ModuleEnum.ORDER, permission: ActionPermission.UPDATE })
  @ApiOperation({ summary: '[ADMIN] UPDATE ORDER STATUS' })
  @ApiResponse({ status: 200 })
  @Put(':id/status')
  async updateOrderStatus(
    @Param('id') id: string,
    @Body() body: AdminUpdateOrderStatusDto,
  ): Promise<SuccessResponseDto> {
    return await this.adminOrderService.updateOrderStatus(id, body);
  }

  @RolePermission({ module: ModuleEnum.ORDER, permission: ActionPermission.UPDATE })
  @ApiOperation({ summary: '[ADMIN] UPDATE PAYMENT STATUS' })
  @ApiResponse({ status: 200 })
  @Put(':id/payment-status')
  async updatePaymentStatus(
    @Param('id') id: string,
    @Body() body: AdminUpdateOrderPaymentStatusDto,
  ): Promise<SuccessResponseDto> {
    return await this.adminOrderService.updatePaymentStatus(id, body);
  }
}
