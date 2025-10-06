import {
  ArrayNotEmpty,
  ArrayUnique,
  IsArray,
  IsBoolean,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  Validate,
  ValidateIf,
  ValidateNested,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Exist } from 'src/decorators/custome-validate.decorator';
import { Product } from 'src/entities/product.entity';
import { Categories } from 'src/entities/categories.entity';
import { Type } from 'class-transformer';
import { ProductStatus } from 'src/common/enum/product-status.enum';
import { CreateProductVariantDto } from './create-product-variant.dto';

export class CreateProductDto {
  @ApiProperty({ enum: ProductStatus, example: ProductStatus.UNPUBLISHED })
  @IsEnum(ProductStatus)
  status: ProductStatus;

  @ApiProperty({ type: String, example: 'Áo thun nam' })
  @ValidateIf((o) => o.status === ProductStatus.PUBLISHED)
  @IsString()
  @Validate(Exist<Product>, [Product, 'name', true])
  name: string;

  @ApiProperty({ type: String, example: 'Chất liệu cao cấp' })
  @ValidateIf((o) => o.status === ProductStatus.PUBLISHED)
  @IsString()
  description: string;

  @ApiProperty({ type: Boolean, example: true })
  @ValidateIf((o) => o.status === ProductStatus.PUBLISHED)
  @IsBoolean()
  hasVariant: boolean;

  @ApiPropertyOptional({ type: Number, example: 1000 })
  @ValidateIf((o) => !o.hasVariant && o.status === ProductStatus.PUBLISHED)
  @IsNumber()
  price?: number;

  @ApiPropertyOptional({ type: Number, example: 50 })
  @ValidateIf((o) => !o.hasVariant && o.status === ProductStatus.PUBLISHED)
  @IsNumber()
  stock?: number;

  @ApiPropertyOptional({ type: String, example: 'AOTHUN-001' })
  @ValidateIf((o) => !o.hasVariant && o.status === ProductStatus.PUBLISHED)
  @IsString()
  sku?: string;

  @ApiPropertyOptional({ type: [String], example: ['https://example.com'] })
  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  @IsUrl({}, { each: true })
  imageUrls?: string[];

  @ApiProperty({ type: [Number], example: [1] })
  @ValidateIf((o) => o.status === ProductStatus.PUBLISHED)
  @IsArray()
  @ArrayNotEmpty()
  @ArrayUnique()
  @IsNumber({}, { each: true })
  @Validate(Exist<Categories>, [Categories, 'id', false], { each: true })
  categoryIds: number[];

  @ApiPropertyOptional({ type: [CreateProductVariantDto] })
  @ValidateIf((o) => o.hasVariant && o.status === ProductStatus.PUBLISHED)
  @IsArray()
  @ArrayNotEmpty()
  @ArrayUnique()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CreateProductVariantDto)
  productVariants: CreateProductVariantDto[];
}
