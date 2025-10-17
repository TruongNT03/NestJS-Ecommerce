import { IsNumber, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AddItemToCartDto {
  @ApiProperty({ type: String })
  @IsUUID()
  productVariantId: string;

  @ApiProperty({ type: Number })
  @IsNumber()
  quantity: number;
}
