import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class UpdateProductVariantCartItemDto {
  @IsUUID()
  @ApiProperty({ type: String })
  productVariantId: string;
}
