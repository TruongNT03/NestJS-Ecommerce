import { Body, Controller, Post } from '@nestjs/common';
import { CartService } from './cart.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { SuccessReponseDto } from 'src/common/dto/success-response.dto';
import { AddItemToCartDto } from 'src/modules/cart/dto/request/add-item-to-cart.dto';
import { User } from 'src/decorators/user.decorator';
import { UserRequestPayload } from 'src/modules/auth/auth.interface';
import { Role } from 'src/decorators/role.decorator';
import { RoleType } from 'src/common/enum/role.enum';

@ApiTags('[USER] CART')
@ApiBearerAuth()
@Controller('cart')
@Role([RoleType.USER])
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @ApiOperation({ summary: '[USER] ADD PRODUCT TO CART' })
  @ApiResponse({ status: 200, type: SuccessReponseDto })
  @Post('')
  async addItemToCart(
    @User() user: UserRequestPayload,
    @Body() body: AddItemToCartDto,
  ): Promise<SuccessReponseDto> {
    return await this.cartService.addItemToCart(user, body);
  }
}
