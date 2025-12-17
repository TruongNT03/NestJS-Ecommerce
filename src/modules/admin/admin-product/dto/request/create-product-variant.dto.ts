import { ApiProperty } from '@nestjs/swagger';
import { ArrayNotEmpty, ArrayUnique, IsArray, IsNumber, IsString, Validate } from 'class-validator';
import { Exist } from 'src/decorators/custom-validate.decorator';
import { ProductVariant } from 'src/entities/product-variant.entity';
import { VariantValue } from 'src/entities/variant-value.entity';

export class CreateProductVariantDto {
  @ApiProperty({ type: Number, example: 1000 })
  @IsNumber()
  price: number;

  @ApiProperty({ type: String, example: 'AO-THUN-001' })
  @IsString()
  @Validate(Exist<ProductVariant>, [ProductVariant, 'sku', true])
  sku: string;

  @ApiProperty({ type: Number, example: 50 })
  @IsNumber()
  stock: number;

  @ApiProperty({ type: [Number], example: [1] })
  @IsArray()
  @ArrayNotEmpty()
  @ArrayUnique()
  @IsNumber({}, { each: true })
  @Validate(Exist<VariantValue>, [VariantValue, 'id', false], { each: true })
  variantValueIds: number[];
}
