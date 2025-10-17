import { Injectable } from '@nestjs/common';
import { AddItemToCartDto } from 'src/modules/cart/dto/request/add-item-to-cart.dto';
import { SuccessReponseDto } from 'src/common/dto/success-response.dto';
import { BaseService } from 'src/base.service';
import { UserRequestPayload } from 'src/modules/auth/auth.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from 'src/entities/cart.entity';
import { Repository } from 'typeorm';
import { CartItem } from 'src/entities/cart-item.entity';

@Injectable()
export class CartService extends BaseService {
  constructor(
    @InjectRepository(Cart)
    private readonly cartRepo: Repository<Cart>,
    @InjectRepository(CartItem)
    private readonly cartItemRepo: Repository<CartItem>,
  ) {
    super();
  }

  async addItemToCart(
    user: UserRequestPayload,
    dto: AddItemToCartDto,
  ): Promise<SuccessReponseDto> {
    const { id } = user;
    const { productVariantId, quantity } = dto;
    const cart = await this.cartRepo.findOne({ where: { userId: id } });
    const cartItem = await this.cartItemRepo.save({
      productVariantId,
      cartId: cart.id,
      quantity,
    });
    return {
      success: true,
    };
  }

  private async createCart(userId: string): Promise<SuccessReponseDto> {
    const cart = await this.cartRepo.save({
      userId,
    });
    return {
      success: true,
    };
  }
}
