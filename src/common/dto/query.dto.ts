import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

export enum SortOrder {
  DESC = 'DESC',
  ASC = 'ASC',
}

export class QueryDto {
  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  page: number;

  @ApiProperty({ example: 10 })
  @Type(() => Number)
  @IsNumber()
  pageSize: number;
}
