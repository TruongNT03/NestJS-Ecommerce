import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { OrderService } from './order.service';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Role } from 'src/decorators/role.decorator';
import { RoleType } from 'src/common/enum/role.enum';
import { User } from 'src/decorators/user.decorator';
import { UserRequestPayload } from '../auth/auth.interface';
import { CreateOrderFromCartDto } from './dto/request/create-order-from-cart.dto';
import { SaveUuidResponseDto } from 'src/common/dto/save-response.dto';
import { ListOrderResponseDto } from './dto/response/list-oder-response.dto';
import { ListOrderQueryDto } from './dto/request/list-order-query.dto';
import { SuccessResponseDto } from 'src/common/dto/success-response.dto';

@ApiTags('[USER] ORDER')
@ApiBearerAuth()
@Role([RoleType.USER])
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @ApiOperation({ summary: '[USER] CREATE ORDER' })
  @ApiResponse({ status: 200, type: SaveUuidResponseDto })
  @Post()
  async createOrderFromCart(
    @User() user: UserRequestPayload,
    @Body() body: CreateOrderFromCartDto,
  ): Promise<SaveUuidResponseDto> {
    return await this.orderService.createOrderFromCart(user, body);
  }

  @ApiOperation({ summary: '[USER] GET ALL ORDER' })
  @ApiResponse({ status: 200, type: ListOrderResponseDto })
  @Get()
  async getAllOrder(
    @User() user: UserRequestPayload,
    @Query() query: ListOrderQueryDto,
  ): Promise<ListOrderResponseDto> {
    return await this.orderService.getAllOrder(user, query);
  }

  @ApiOperation({ summary: '[USER] CANCEL QR ORDER' })
  @ApiResponse({ status: 200, type: SuccessResponseDto })
  @Post(':orderId/cancel')
  async cancelQrOrder(@Param('orderId') orderId: string): Promise<SuccessResponseDto> {
    return await this.orderService.cancelQrOrder(orderId);
  }
}
