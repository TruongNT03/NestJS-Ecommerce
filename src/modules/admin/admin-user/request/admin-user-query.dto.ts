import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { QueryDto, SortOrder } from 'src/common/dto/query.dto';

export enum AdminUserQuerySortField {
  NAME = 'name',
  EMAIL = 'email',
  PHONE = 'phoneNumber',
  GENDER = 'gender',
  CREATED_AT = 'createdAt',
}

export enum AdminUserQueryRoleType {
  ADMIN = 'admin',
  USER = 'user',
}

export class AdminUserQueryDto extends QueryDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({ enum: AdminUserQueryRoleType })
  @IsOptional()
  @IsEnum(AdminUserQueryRoleType)
  roleType?: AdminUserQueryRoleType;

  @ApiPropertyOptional({ enum: AdminUserQuerySortField })
  @IsOptional()
  @IsEnum(AdminUserQuerySortField)
  sortBy?: AdminUserQuerySortField;

  @ApiPropertyOptional({ enum: SortOrder })
  @IsOptional()
  @IsEnum(SortOrder)
  sortOrder?: SortOrder;
}
