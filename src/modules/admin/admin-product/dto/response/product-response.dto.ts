import { Exclude, Expose, Transform, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

@Exclude()
export class VariantValuesResponseDto {
  @Expose()
  @ApiProperty({ type: String, example: 'Size' })
  variant: string;

  @Expose()
  @ApiProperty({ type: String, example: 'M' })
  value: string;
}

@Exclude()
export class ProductVariantResponseDto {
  @Expose()
  @ApiProperty({
    type: String,
    example: '377a5d99-ee6d-4e6f-9197-713e0699ac93',
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
  @ApiProperty({ type: [VariantValuesResponseDto] })
  @Transform(({ value }) =>
    value.map((v) => ({
      variant: v.variant.name,
      value: v.value,
    })),
  )
  variantValues: VariantValuesResponseDto[];
}

@Exclude()
export class ProductResponseDto {
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
  @ApiProperty({ type: [ProductVariantResponseDto] })
  @Type(() => ProductVariantResponseDto)
  productVariants: ProductVariantResponseDto[];

  @Expose()
  @ApiProperty({ type: [String], example: ['Áo thu đông'] })
  @Transform(({ value }) => value?.map((c) => c.title))
  categories: string[];

  @Expose()
  @ApiProperty({ type: Date })
  createdAt: Date;

  @Expose()
  @ApiProperty({ type: Date })
  updatedAt: Date;
}
