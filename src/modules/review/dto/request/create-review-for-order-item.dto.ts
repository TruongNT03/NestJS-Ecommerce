import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  ArrayNotEmpty,
  ArrayUnique,
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class CreateReviewForOrderItemDto {
  @ApiProperty({ type: Number })
  @IsNumber()
  @Min(1)
  @Max(5)
  rating: number;

  @ApiProperty({ type: String })
  @IsString()
  comment: string;

  @ApiPropertyOptional({ type: [String] })
  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  @ArrayUnique()
  @IsString({ each: true })
  images: string[];
}
