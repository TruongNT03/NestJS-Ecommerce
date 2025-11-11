import { QueryDto, SortOrder } from 'src/common/dto/query.dto';
import {
  IsArray,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  Validate,
} from 'class-validator';
import { Exist } from 'src/decorators/custome-validate.decorator';
import { Categories } from 'src/entities/categories.entity';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';

export enum AdminProductSortField {
  NAME = 'name',
  DESCRIPTION = 'description',
  STATUS = 'status',
  CREATED_AT = 'createdAt',
  UPDATED_AT = 'updatedAt',
}

export class ListProductQueryDto extends QueryDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsArray()
  @Type(() => Number)
  @IsNumber({}, { each: true })
  @Validate(Exist<Categories>, [Categories, 'id', false], { each: true })
  @Transform(({ value }) => (Array.isArray(value) ? value : [value]))
  categoriesIds?: number[];

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({ enum: AdminProductSortField })
  @IsOptional()
  @IsEnum(AdminProductSortField)
  sortBy?: AdminProductSortField;

  @ApiPropertyOptional({ enum: SortOrder })
  @IsOptional()
  @IsEnum(SortOrder)
  sortOrder?: SortOrder;
}
