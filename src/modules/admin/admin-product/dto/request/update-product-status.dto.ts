import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { ProductStatus } from 'src/common/enum/product-status.enum';

export class UpdateProductStatusDto {
  @ApiProperty({ enum: ProductStatus, example: ProductStatus.PUBLISHED })
  @IsEnum(ProductStatus)
  status: ProductStatus;
}
