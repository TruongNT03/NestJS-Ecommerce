import { Body, Controller, Post } from '@nestjs/common';
import { OrderService } from './order.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Role } from 'src/decorators/role.decorator';
import { RoleType } from 'src/common/enum/role.enum';
import { User } from 'src/decorators/user.decorator';
import { UserRequestPayload } from '../auth/auth.interface';
import { CreateOrderFromCartDto } from './dto/request/create-order-from-cart.dto';
import { SaveUuidResponseDto } from 'src/common/dto/save-response.dto';

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
}
