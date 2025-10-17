import { ApiPropertyOptional } from '@nestjs/swagger';
import { QueryDto, SortOrder } from 'src/common/dto/query.dto';
import {
  ArrayUnique,
  IsArray,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';

export enum UserProductSortByField {
  NAME = 'name',
  CREATED_AT = 'createdAt',
  UPDATED_AT = 'updatedAt',
  PRICE = 'price',
}

export class FindAllProductQueryDto extends QueryDto {
  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({ type: [Number] })
  @IsOptional()
  @IsArray()
  @Transform(({ value }) => (Array.isArray(value) ? value : [value]))
  @Type(() => Number)
  @ArrayUnique()
  @IsNumber({}, { each: true })
  categoryIds?: number[];

  @ApiPropertyOptional({ enum: UserProductSortByField })
  @IsOptional()
  @IsEnum(UserProductSortByField)
  sortBy: UserProductSortByField;

  @ApiPropertyOptional({ enum: SortOrder })
  @IsOptional()
  @IsEnum(SortOrder)
  sortOrder: SortOrder;

  @ApiPropertyOptional({ type: Number })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  lowPrice: number;

  @ApiPropertyOptional({ type: Number })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  highPrice: number;
}
