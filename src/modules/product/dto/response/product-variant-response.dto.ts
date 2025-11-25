import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Type } from 'class-transformer';
import { VariantValuesResponseDto } from 'src/modules/admin/admin-product/dto/response/product-response.dto';
import { ProductResponseDto } from './product-response.dto';

@Exclude()
export class ProductVariantResponseDto {
  @Expose()
  @ApiProperty({ type: String })
  id: string;

  @Expose()
  @ApiProperty({ type: ProductResponseDto })
  @Type(() => ProductResponseDto)
  product: ProductResponseDto;

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
