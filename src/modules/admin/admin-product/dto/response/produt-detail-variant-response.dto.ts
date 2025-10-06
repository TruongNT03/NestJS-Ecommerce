import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Type } from 'class-transformer';
import { ProductDetailVariantValueResponseDto } from './product-detail-variant-value-response.dto';

@Exclude()
export class ProductDetailVariantResponseDto {
  @Expose()
  @ApiProperty({
    type: String,
    example: 'ca07d01b-cbe6-4c4f-aa4c-d55e937eefd7',
  })
  id: string;

  @Expose()
  @ApiProperty({ type: Number, example: 1000 })
  price: number;

  @Expose()
  @ApiProperty({ type: String, example: 'AO-THUN-001' })
  sku: string;

  @Expose()
  @ApiProperty({ type: Number, example: 50 })
  stock: number;

  @Expose()
  @ApiProperty({ type: [ProductDetailVariantValueResponseDto] })
  @Type(() => ProductDetailVariantValueResponseDto)
  variantValues: ProductDetailVariantValueResponseDto[];
}
