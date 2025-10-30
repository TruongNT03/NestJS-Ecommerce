import { Exclude, Expose } from 'class-transformer';
import { CartResponseDto } from './cart-response.dto';
import { ApiProperty } from '@nestjs/swagger';

@Exclude()
export class CartSummaryResponseDto extends CartResponseDto {
  @Expose()
  @ApiProperty({ type: Number })
  totalItems: number;
}
