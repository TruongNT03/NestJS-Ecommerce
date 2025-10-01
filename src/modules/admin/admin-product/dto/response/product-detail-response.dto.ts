import { Exclude, Expose, Transform, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { VariantResponseDto } from 'src/modules/admin/admin-product/dto/response/variant-response.dto';
import { CategoryResponseDto } from 'src/modules/admin/admin-categories/dto/response/category-response.dto';

@Exclude()
export class VariantValueResponseDto {
  @Expose()
  @ApiProperty({
    type: Number,
    example: 'ca07d01b-cbe6-4c4f-aa4c-d55e937eefd7',
  })
  id: number;

  @Expose()
  @ApiProperty({ type: String, example: 'M' })
  value: string;

  @Expose()
  @ApiProperty()
  @Type(() => VariantResponseDto)
  variant: VariantResponseDto;

  @Expose()
  @ApiProperty({ type: Date })
  createdAt: Date;

  @Expose()
  @ApiProperty({ type: Date })
  updatedAt: Date;
}

@Exclude()
export class DetailProductVariantResponseDto {
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
  @ApiProperty({ type: [VariantValueResponseDto] })
  @Type(() => VariantValueResponseDto)
  variantValues: VariantValueResponseDto[];

  @Expose()
  @ApiProperty({ type: Date })
  createdAt: Date;

  @Expose()
  @ApiProperty({ type: Date })
  updatedAt: Date;
}

@Exclude()
export class ProductDetailResponseDto {
  @Expose()
  @ApiProperty({
    type: String,
    example: '377a5d99-ee6d-4e6f-9197-713e0699ac93',
  })
  id: string;

  @Expose()
  @ApiProperty({ type: String, example: 'Áo thun nam' })
  name: string;

  @Expose()
  @ApiProperty({ type: String, example: 'Chất liệu cao cấp' })
  description: string;

  @Expose()
  @ApiProperty({ type: Boolean })
  hasVariant: boolean;

  @Expose()
  @ApiProperty({ type: [CategoryResponseDto] })
  @Type(() => CategoryResponseDto)
  categories: CategoryResponseDto[];

  @Expose()
  @ApiProperty({ type: [DetailProductVariantResponseDto] })
  @Type(() => DetailProductVariantResponseDto)
  productVariants: DetailProductVariantResponseDto[];

  @Expose()
  @ApiProperty({ type: Date })
  createdAt: Date;

  @Expose()
  @ApiProperty({ type: Date })
  updatedAt: Date;
}
