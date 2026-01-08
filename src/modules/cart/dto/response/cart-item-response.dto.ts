import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Exclude, Expose, plainToInstance, Transform, Type } from 'class-transformer';

import { ProductResponseDto } from 'src/modules/product/dto/response/product-response.dto';
import { ProductSummaryResponseDto } from 'src/modules/product/dto/response/product-summary-response.dto';
import { ProductVariantResponseDto } from 'src/modules/product/dto/response/product-variant-response.dto';

@Exclude()
export class CartItemResponseDto {
  @Expose()
  @ApiProperty({ type: String })
  id: string;

  @Expose()
  @ApiProperty({ type: ProductResponseDto })
  @Transform(({ obj }) => plainToInstance(ProductSummaryResponseDto, obj?.productVariant?.product))
  product: ProductSummaryResponseDto;

  @Expose()
  @ApiPropertyOptional({ type: Number })
  discount: number;

  @Expose()
  @ApiProperty({ type: ProductVariantResponseDto })
  @Type(() => ProductVariantResponseDto)
  productVariant: ProductVariantResponseDto;

  @Expose()
  @ApiProperty({ type: Number })
  quantity: number;
}
