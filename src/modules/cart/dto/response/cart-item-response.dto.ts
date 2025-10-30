import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Type } from 'class-transformer';
import { ProductVariantResponseDto } from 'src/modules/admin/admin-product/dto/response/product-response.dto';

@Exclude()
export class CartItemResponseDto {
  @Expose()
  @ApiProperty({ type: String })
  id: string;

  @Expose()
  @ApiProperty({ type: ProductVariantResponseDto })
  @Type(() => ProductVariantResponseDto)
  productVariant: ProductVariantResponseDto;

  @Expose()
  @ApiProperty({ type: Number })
  quantity: number;
}
