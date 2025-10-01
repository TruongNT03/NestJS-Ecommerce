import {
  ArrayNotEmpty,
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  IsUUID,
  Validate,
  ValidateIf,
  ValidateNested,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Exist } from 'src/decorators/custome-validate.decorator';
import { VariantValue } from 'src/entities/variant-value.entity';
import { Categories } from 'src/entities/categories.entity';
import { Type } from 'class-transformer';

export class UpdateProductVariantDto {
  @ApiProperty({
    type: String,
    example: 'ca07d01b-cbe6-4c4f-aa4c-d55e937eefd7',
  })
  @IsUUID()
  id: string;

  @ApiProperty({ type: Number, example: 1000 })
  @IsNumber()
  price: number;

  @ApiProperty({ type: String, example: 'AO-THUN-001' })
  @IsString()
  // @Validate(Exist<ProductVariant>, [ProductVariant, 'sku', true])
  sku: string;

  @ApiProperty({ type: Number, example: 50 })
  @IsNumber()
  stock: number;

  @ApiProperty({ type: [Number], example: [1] })
  @IsArray()
  @ArrayNotEmpty()
  @IsNumber({}, { each: true })
  @Validate(Exist<VariantValue>, [VariantValue, 'id', false], { each: true })
  variantValueIds: number[];
}

export class UpdateProductDto {
  @ApiProperty({ type: String, example: 'Áo thun nam' })
  @IsString()
  // @Validate(Exist<Product>, [Product, 'name', true])
  name: string;

  @ApiProperty({ type: String, example: 'Chất liệu cao cấp' })
  @IsString()
  description: string;

  @ApiPropertyOptional({ type: Number, example: 1000 })
  @ValidateIf((o) => !o.productVariants && !o.productVariants?.length)
  @IsNumber()
  price?: number;

  @ApiPropertyOptional({ type: [String], example: ['https://example.com'] })
  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  @IsUrl({}, { each: true })
  imageUrls?: string[];

  @ApiPropertyOptional({ type: Number, example: 50 })
  @ValidateIf((o) => !o.productVariants && !o.productVariants?.length)
  @IsNumber()
  stock?: number;

  @ApiPropertyOptional({
    type: [Number],
    example: [1],
  })
  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  @IsNumber({}, { each: true })
  @Validate(Exist<Categories>, [Categories, 'id', false], { each: true })
  categoryIds?: number[];

  @ApiPropertyOptional({ type: [UpdateProductVariantDto] })
  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => UpdateProductVariantDto)
  productVariants: UpdateProductVariantDto[];
}
