import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Type } from 'class-transformer';
import { CartItemResponseDto } from './cart-item-response.dto';

@Exclude()
export class CartResponseDto {
  @Expose()
  @ApiProperty({ type: String })
  id: string;

  @Expose()
  @ApiProperty({ type: [CartItemResponseDto] })
  @Type(() => CartItemResponseDto)
  cartItems: CartItemResponseDto[];
}
