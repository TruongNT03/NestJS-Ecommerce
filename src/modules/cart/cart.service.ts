import { Injectable } from '@nestjs/common';
import { AddItemToCartDto } from 'src/modules/cart/dto/request/add-item-to-cart.dto';
import { SuccessResponseDto } from 'src/common/dto/success-response.dto';
import { BaseService } from 'src/base.service';
import { UserRequestPayload } from 'src/modules/auth/auth.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from 'src/entities/cart.entity';
import { Repository } from 'typeorm';
import { CartItem } from 'src/entities/cart-item.entity';
import { UserShareService } from '../user/user-share.service';
import { CartResponseDto } from './dto/response/cart-response.dto';
import { plainToInstance } from 'class-transformer';
import { UpdateQuantityCartItemDto } from './dto/request/update-quantity-cart-item.dto';
import { UpdateProductVariantCartItemDto } from './dto/request/update-product-variant-cart-item.dto';
import { ProductVariant } from 'src/entities/product-variant.entity';
import { ServerException } from 'src/exceptions/sever.exception';
import { ERROR_RESPONSE } from 'src/common/constants/error-response.constants';
import { ListCartItemQueryDto } from './dto/request/list-cart-item-query.dto';
import { ListCartItemResponseDto } from './dto/response/list-cart-item-response.dto';
import { CartSummaryResponseDto } from './dto/response/cart-summary-response.dto';

@Injectable()
export class CartService extends BaseService {
  constructor(
    @InjectRepository(Cart)
    private readonly cartRepo: Repository<Cart>,
    @InjectRepository(CartItem)
    private readonly cartItemRepo: Repository<CartItem>,
    @InjectRepository(ProductVariant)
    private readonly productVariantRepo: Repository<ProductVariant>,
  ) {
    super();
  }

  async addItemToCart(
    user: UserRequestPayload,
    dto: AddItemToCartDto,
  ): Promise<SuccessResponseDto> {
    const { id } = user;

    const { productVariantId, quantity } = dto;
    let cart = await this.cartRepo.findOne({ where: { userId: id } });

    if (!cart) {
      cart = this.cartRepo.create({ userId: user.id });
      await this.cartRepo.save(cart);
    }

    let existCartItem = await this.cartItemRepo.findOne({
      where: {
        productVariantId: productVariantId,
        cartId: cart.id,
      },
    });

    if (!existCartItem) {
      existCartItem = await this.cartItemRepo.save({
        productVariantId,
        cartId: cart.id,
        quantity,
      });
    } else {
      await this.cartItemRepo.update(
        { id: existCartItem.id },
        { quantity: existCartItem.quantity + quantity },
      );
    }

    return {
      success: true,
    };
  }

  private async findOrCreateCart(userId: string): Promise<Cart> {
    let cart = await this.cartRepo.findOne({ where: { userId } });
    if (!cart) {
      cart = await this.cartRepo.save({
        userId,
      });
    }
    return cart;
  }

  async getCartSummary(user: UserRequestPayload): Promise<CartSummaryResponseDto | []> {
    const userId = user.id;

    const cart = await this.findOrCreateCart(userId);

    const [cartItems, totalItems] = await Promise.all([
      this.cartItemRepo
        .createQueryBuilder('cartItem')
        .leftJoinAndSelect('cartItem.productVariant', 'productVariant')
        .leftJoinAndSelect('productVariant.product', 'p')
        .leftJoinAndSelect('p.productImages', 'pi')
        .leftJoinAndSelect('productVariant.variantValues', 'variantValue')
        .leftJoinAndSelect('variantValue.variant', 'variant')
        .leftJoinAndSelect('cartItem.cart', 'cart')
        .where('cart.userId = :userId', { userId: user.id })
        .orderBy('cartItem.id', 'DESC')
        .addOrderBy('cartItem.updatedAt', 'DESC')
        .take(5)
        .getMany(),

      this.cartItemRepo
        .createQueryBuilder('cartItem')
        .leftJoinAndSelect('cartItem.cart', 'cart')
        .where('cart.userId = :userId', { userId })
        .getCount(),
    ]);

    return plainToInstance(CartSummaryResponseDto, {
      id: cart.id,
      cartItems,
      totalItems,
    });
  }

  async getAllCartItem(user: UserRequestPayload, query: ListCartItemQueryDto) {
    const { page, pageSize } = query;
    const queryBuilder = this.cartItemRepo
      .createQueryBuilder('cartItem')
      .leftJoinAndSelect('cartItem.productVariant', 'productVariant')
      .leftJoinAndSelect('productVariant.product', 'product')
      .leftJoinAndSelect('product.productImages', 'productImages')
      .leftJoinAndSelect('productVariant.variantValues', 'variantValue')
      .leftJoinAndSelect('variantValue.variant', 'variant')
      .leftJoinAndSelect('cartItem.cart', 'cart')
      .where('cart.userId = :userId', { userId: user.id })
      .orderBy('cartItem.updatedAt', 'DESC');

    const { data, paginate } = await this.paginate(queryBuilder, page, pageSize);

    return plainToInstance(ListCartItemResponseDto, { data, paginate });
  }

  async updateQuantityCartItem(
    id: string,
    dto: UpdateQuantityCartItemDto,
  ): Promise<SuccessResponseDto> {
    const { quantity } = dto;
    await this.cartItemRepo.update({ id }, { quantity });
    return {
      success: true,
    };
  }

  async updateProductVariantCartItem(
    id: string,
    dto: UpdateProductVariantCartItemDto,
  ): Promise<SuccessResponseDto> {
    const { productVariantId } = dto;

    const productVariant = await this.productVariantRepo.findOne({
      where: { id: productVariantId },
    });

    await this.cartItemRepo.update({ id }, { productVariant, productVariantId });

    return {
      success: true,
    };
  }

  async deleteCartItem(id: string): Promise<SuccessResponseDto> {
    const cartItem = await this.findOneCartItem(id);
    await this.cartItemRepo.delete({ id: cartItem.id });
    return this.successResponse();
  }

  private async findOneCartItem(id: string): Promise<CartItem> {
    const cartItem = await this.cartItemRepo.findOneBy({ id });
    if (!cartItem) {
      throw new ServerException(ERROR_RESPONSE.NOT_FOUND);
    }
    return cartItem;
  }
}
