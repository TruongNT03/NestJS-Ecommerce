import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';
import { QueryDto, SortOrder } from 'src/common/dto/query.dto';

export enum ListCategorySortField {
  TITLE = 'title',
  CREATED_AT = 'createdAt',
}

export class ListCategoryQueryDto extends QueryDto {
  @ApiPropertyOptional({ description: 'Keyword for search' })
  @IsOptional()
  search?: string;

  @ApiPropertyOptional({
    enum: ListCategorySortField,
    description: 'Available field for sort',
  })
  @IsOptional()
  @IsEnum(ListCategorySortField)
  sortBy?: ListCategorySortField;

  @ApiPropertyOptional({
    enum: SortOrder,
    description: 'Availabel order direaction for sort',
  })
  @IsOptional()
  @IsEnum(SortOrder)
  orderBy?: SortOrder;
}
