import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsUUID } from 'class-validator';
import { CreateProductVariantDto } from './create-product-variant.dto';

export class UpdateProductVariantDto extends CreateProductVariantDto {
  @ApiPropertyOptional({
    type: String,
    example: 'ca07d01b-cbe6-4c4f-aa4c-d55e937eefd7',
  })
  @IsOptional()
  @IsUUID()
  id?: string;

  @ApiProperty({ type: String, example: 'AO-THUN-001' })
  @IsString()
  declare sku: string;
}
