import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsUrl } from 'class-validator';

export class UpdateProductImageDto {
  @ApiProperty({ type: Number })
  @IsOptional()
  @IsNumber()
  id: number;

  @ApiProperty({ type: String })
  @IsUrl()
  url: string;
}
