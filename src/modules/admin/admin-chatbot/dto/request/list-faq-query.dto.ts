import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { QueryDto, SortOrder } from 'src/common/dto/query.dto';
import { FaqType } from 'src/common/enum/faq-type.enum';

export enum ListFaqSortField {
  QUESTION = 'question',
  ANSWER = 'answer',
  TYPE = 'type',
}

export class AdminListFaqQueryDto extends QueryDto {
  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({ enum: FaqType })
  @IsOptional()
  @IsEnum(FaqType)
  typeFilter?: FaqType;

  @ApiPropertyOptional({ enum: ListFaqSortField })
  @IsOptional()
  @IsEnum(ListFaqSortField)
  sortBy?: ListFaqSortField;

  @ApiPropertyOptional({ enum: SortOrder })
  @IsOptional()
  @IsEnum(SortOrder)
  sortOrder?: SortOrder;
}
