import { Exclude, Expose, plainToInstance, Transform, Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ProductStatus } from 'src/common/enum/product-status.enum';
import { Variant } from 'src/entities/variant.entity';

@Exclude()
export class VariantValuesResponseDto {
  @Expose()
  @ApiProperty({ type: String, example: 'Size' })
  @Transform(({ value }: { value: Variant }) => (value.name ? value.name : value))
  variant: string;

  @Expose()
  @ApiProperty({ type: String, example: 'M' })
  value: string;
}

@Exclude()
export class AdminProductVariantResponseDto {
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
export class AdminProductResponseDto {
  @Expose()
  @ApiProperty({ type: String })
  id: string;

  @Expose()
  @ApiProperty({ type: String, example: 'Áo thun nam' })
  name: string;

  @Expose()
  @ApiProperty({ type: String, example: 'Chất liệu cao cấp' })
  description: string;

  @Expose()
  @ApiProperty({ enum: ProductStatus })
  status: ProductStatus;

  @Expose()
  @ApiPropertyOptional({ type: Number })
  discount: number;

  @Expose()
  @ApiProperty({ type: Boolean })
  hasVariant: boolean;

  @Expose()
  @ApiProperty({ type: [AdminProductVariantResponseDto] })
  @Type(() => AdminProductVariantResponseDto)
  productVariants: AdminProductVariantResponseDto[];

  @Expose()
  @ApiProperty({ type: [String], example: ['https://example.com'] })
  @Transform(({ value }) => value?.map((i) => i.url))
  productImages: string[];

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
