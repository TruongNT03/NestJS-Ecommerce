import { ApiProperty } from '@nestjs/swagger';
import {
  Exclude,
  Expose,
  plainToInstance,
  Transform,
  Type,
} from 'class-transformer';
import { ProductVariantResponseDto } from 'src/modules/admin/admin-product/dto/response/product-response.dto';
import { UserProductResponseDto } from 'src/modules/product/dto/response/user-product-response.dto';
import { ProductSummaryResponseDto } from 'src/modules/product/dto/response/product-summary-response.dto';

@Exclude()
export class CartItemResponseDto {
  @Expose()
  @ApiProperty({ type: String })
  id: string;

  @Expose()
  @ApiProperty({ type: UserProductResponseDto })
  @Transform(({ obj }) =>
    plainToInstance(ProductSummaryResponseDto, obj?.productVariant?.product),
  )
  product: ProductSummaryResponseDto;

  @Expose()
  @ApiProperty({ type: ProductVariantResponseDto })
  @Type(() => ProductVariantResponseDto)
  productVariant: ProductVariantResponseDto;

  @Expose()
  @ApiProperty({ type: Number })
  quantity: number;
}
