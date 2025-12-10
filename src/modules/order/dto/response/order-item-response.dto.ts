import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Type } from 'class-transformer';
import { ProductImageDetailResponseDto } from 'src/modules/admin/admin-product/dto/response/product-image-detail-response.dto';
import { VariantValuesResponseDto } from 'src/modules/admin/admin-product/dto/response/product-response.dto';
import { ProductVariantResponseDto } from 'src/modules/product/dto/response/product-variant-response.dto';

@Exclude()
export class OrderItemProductResponseDto {
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

@Exclude()
export class OrderItemProductVariantResponseDto {
  @Expose()
  @ApiProperty({ type: String })
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
  @ApiProperty({ type: [VariantValuesResponseDto] })
  @Type(() => VariantValuesResponseDto)
  variantValues: VariantValuesResponseDto[];
}

@Exclude()
export class OrderItemResponseDto {
  @Expose()
  @ApiProperty({ type: String })
  id: string;

  @Expose()
  @ApiProperty({ type: OrderItemProductResponseDto })
  @Type(() => OrderItemProductResponseDto)
  product: OrderItemProductResponseDto;

  @Expose()
  @ApiProperty({ type: OrderItemProductVariantResponseDto })
  @Type(() => OrderItemProductVariantResponseDto)
  productVariant: OrderItemProductVariantResponseDto;

  @Expose()
  @ApiProperty({ type: Number })
  quantity: number;

  @Expose()
  @ApiProperty({ type: Boolean })
  isReviewed: boolean;
}
