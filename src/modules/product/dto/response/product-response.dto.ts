import { Exclude, Expose, Transform, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { ProductImageDetailResponseDto } from 'src/modules/admin/admin-product/dto/response/product-image-detail-response.dto';
import { ProductVariantResponseDto } from './product-variant-response.dto';

@Exclude()
export class ProductResponseDto {
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
  @ApiProperty({ type: [ProductImageDetailResponseDto] })
  @Type(() => ProductImageDetailResponseDto)
  productImages: ProductImageDetailResponseDto[];
}
