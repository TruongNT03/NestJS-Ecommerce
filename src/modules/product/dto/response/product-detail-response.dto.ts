import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Transform, Type } from 'class-transformer';
import { ProductImageDetailResponseDto } from 'src/modules/admin/admin-product/dto/response/product-image-detail-response.dto';

import { ProductVariantResponseDto } from './product-variant-response.dto';

@Exclude()
export class ProductDetailResponseDto {
  @Expose()
  @ApiProperty({ type: String })
  id: string;

  @Expose()
  @ApiProperty({ type: String })
  name: string;

  @Expose()
  @ApiProperty({ type: String })
  description: string;

  @Expose()
  @ApiProperty({ type: Number })
  @Transform(
    ({ obj }) =>
      obj.productVariants.reduce((min, v) => (v.price < min.price ? v : min))
        .price,
  )
  price: number;

  @Expose()
  @ApiProperty({ type: Number })
  totalStock: number;

  @Expose()
  @ApiProperty({ type: [ProductImageDetailResponseDto] })
  @Type(() => ProductImageDetailResponseDto)
  productImages: ProductImageDetailResponseDto[];

  @Expose()
  @ApiProperty({ type: [ProductVariantResponseDto] })
  @Type(() => ProductVariantResponseDto)
  productVariants: ProductVariantResponseDto[];
}
