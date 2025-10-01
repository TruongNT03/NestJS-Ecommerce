import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

export enum SortOrder {
  DESC = 'DESC',
  ASC = 'ASC',
}

export class QueryDto {
  @ApiPropertyOptional({
    example: 1,
    description: 'Page number for pagination',
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  page: number;

  @ApiProperty({
    example: 10,
    description: 'Number of item per page for page size',
  })
  @Type(() => Number)
  @IsNumber()
  pageSize: number;
}
