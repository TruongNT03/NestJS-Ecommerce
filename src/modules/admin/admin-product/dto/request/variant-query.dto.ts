import { QueryDto } from 'src/common/dto/query.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class VariantQueryDto extends QueryDto {
  @ApiPropertyOptional({ type: String, example: 'Size' })
  @IsOptional()
  @IsString()
  keyword?: string;
}
