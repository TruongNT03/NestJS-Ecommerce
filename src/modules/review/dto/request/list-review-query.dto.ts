import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsOptional, Max, Min } from 'class-validator';
import { QueryDto } from 'src/common/dto/query.dto';

export class ListReviewQueryDto extends QueryDto {
  @ApiPropertyOptional({ type: Number })
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(6)
  rating?: number;

  @ApiPropertyOptional({ enum: ['true', 'false'] })
  @IsOptional()
  @IsEnum(['true', 'false'])
  hasImages?: 'true' | 'false';
}
