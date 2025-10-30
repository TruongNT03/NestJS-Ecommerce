import { ApiProperty } from '@nestjs/swagger';
import { IsInt, Min } from 'class-validator';

export class UpdateQuantityCartItemDto {
  @IsInt()
  @Min(1)
  @ApiProperty({ type: Number })
  quantity: number;
}
