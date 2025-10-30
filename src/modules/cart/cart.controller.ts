import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CartService } from './cart.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { SuccessResponseDto } from 'src/common/dto/success-response.dto';
import { AddItemToCartDto } from 'src/modules/cart/dto/request/add-item-to-cart.dto';
import { User } from 'src/decorators/user.decorator';
import { UserRequestPayload } from 'src/modules/auth/auth.interface';
import { Role } from 'src/decorators/role.decorator';
import { RoleType } from 'src/common/enum/role.enum';
import { CartResponseDto } from './dto/response/cart-response.dto';
import { UpdateQuantityCartItemDto } from './dto/request/update-quantity-cart-item.dto';
import { UpdateProductVariantCartItemDto } from './dto/request/update-product-variant-cart-item.dto';
import { ListCartItemResponseDto } from './dto/response/list-cart-item-response.dto';
import { ListCartItemQueryDto } from './dto/request/list-cart-item-query.dto';

@ApiTags('[USER] CART')
@ApiBearerAuth()
@Controller('carts')
@Role([RoleType.USER])
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @ApiOperation({ summary: '[USER] ADD PRODUCT TO CART' })
  @ApiResponse({ status: 200, type: SuccessResponseDto })
  @Post('')
  async addItemToCart(
    @User() user: UserRequestPayload,
    @Body() body: AddItemToCartDto,
  ): Promise<SuccessResponseDto> {
    return await this.cartService.addItemToCart(user, body);
  }

  @ApiOperation({ summary: '[USER] GET CART SUMMARY' })
  @ApiResponse({ status: 200, type: CartResponseDto })
  @Get('')
  async getCartSummary(
    @User() user: UserRequestPayload,
  ): Promise<CartResponseDto | []> {
    return await this.cartService.getCartSummary(user);
  }

  @ApiOperation({ summary: '[USER] GET LIST CART ITEM' })
  @ApiResponse({ status: 200, type: ListCartItemResponseDto })
  @Get('cart-item')
  async getAllCartItem(
    @User() user: UserRequestPayload,
    @Query() query: ListCartItemQueryDto,
  ): Promise<ListCartItemResponseDto> {
    return await this.cartService.getAllCartItem(user, query);
  }

  @ApiOperation({ summary: '[USER] UPDATE QUANTITY CART ITEM' })
  @ApiResponse({ status: 200, type: SuccessResponseDto })
  @Patch('cart-item/:id/quantity')
  async updateQuantityCartItem(
    @Param('id') id: string,
    @Body() body: UpdateQuantityCartItemDto,
  ): Promise<SuccessResponseDto> {
    return await this.cartService.updateQuantityCartItem(id, body);
  }

  @ApiOperation({ summary: '[USER] UPDATE PRODUCT VARIANT CART ITEM' })
  @ApiResponse({ status: 200, type: SuccessResponseDto })
  @Patch('cart-item/:id/product-variant')
  async updateProductVariantCartItem(
    @Param('id') id: string,
    @Body() body: UpdateProductVariantCartItemDto,
  ): Promise<SuccessResponseDto> {
    return await this.cartService.updateProductVariantCartItem(id, body);
  }

  @ApiOperation({ summary: '[USER] DELETE CART ITEM' })
  @ApiResponse({ status: 200, type: SuccessResponseDto })
  @Delete('cart-item/:id')
  async deleteCartItem(@Param('id') id: string): Promise<SuccessResponseDto> {
    return await this.cartService.deleteCartItem(id);
  }
}
