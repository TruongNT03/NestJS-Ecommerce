import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { QueryDto, SortOrder } from 'src/common/dto/query.dto';

export enum AdminUserQuerySortField {
  EMAIL = 'email',
  CREATED_AT = 'createdAt',
}

export class AdminUserQueryDto extends QueryDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({ enum: AdminUserQuerySortField })
  @IsOptional()
  @IsEnum(AdminUserQuerySortField)
  sortBy?: AdminUserQuerySortField;

  @ApiPropertyOptional({ enum: SortOrder })
  @IsOptional()
  @IsEnum(SortOrder)
  sortOrder?: SortOrder;
}
