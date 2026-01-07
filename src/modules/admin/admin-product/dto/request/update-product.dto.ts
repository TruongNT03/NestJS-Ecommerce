import {
  ArrayNotEmpty,
  ArrayUnique,
  IsArray,
  IsBoolean,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  Validate,
  ValidateIf,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { UpdateProductVariantDto } from './update-product-variant.dto';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ProductStatus } from 'src/common/enum/product-status.enum';
import { UpdateProductImageDto } from './update-product-image.dto';
import { Categories } from 'src/entities/categories.entity';
import { Exist } from 'src/decorators/custom-validate.decorator';

export class UpdateProductDto {
  @ApiProperty({ enum: ProductStatus, example: ProductStatus.UNPUBLISHED })
  @IsEnum(ProductStatus)
  status: ProductStatus;

  @ApiProperty({ type: String, example: 'Áo thun nam' })
  @ValidateIf((o) => o.status === ProductStatus.PUBLISHED)
  @IsString()
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

  @ApiPropertyOptional({
    type: [UpdateProductImageDto],
    example: ['https://example.com'],
  })
  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  @ArrayUnique()
  @ValidateNested({ each: true })
  imageUrls?: UpdateProductImageDto[];

  @ApiProperty({ type: [Number], example: [1] })
  @ValidateIf((o) => o.status === ProductStatus.PUBLISHED)
  @IsArray()
  @ArrayNotEmpty()
  @ArrayUnique()
  @IsNumber({}, { each: true })
  @Validate(Exist<Categories>, [Categories, 'id', false], { each: true })
  categoryIds: number[];

  @ApiPropertyOptional({ type: [UpdateProductVariantDto] })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateProductVariantDto)
  productVariants: UpdateProductVariantDto[];
}
