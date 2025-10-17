import { Exclude, Expose, Transform, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { ProductImage } from 'src/entities/product-image.entity';
import { ProductImageDetailReponseDto } from 'src/modules/admin/admin-product/dto/response/product-image-detail-response.dto';
import { ProductVariantResponseDto } from 'src/modules/admin/admin-product/dto/response/product-response.dto';

@Exclude()
export class UserProductResponseDto {
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
  @ApiProperty({ type: [ProductImageDetailReponseDto] })
  @Type(() => ProductImageDetailReponseDto)
  productImages: ProductImageDetailReponseDto[];

  // @Expose()
  // @ApiProperty({ type: [ProductVariantResponseDto] })
  // @Type(() => ProductVariantResponseDto)
  // productVariants: ProductVariantResponseDto[];
}
