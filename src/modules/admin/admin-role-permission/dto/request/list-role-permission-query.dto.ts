import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';
import { QueryDto } from 'src/common/dto/query.dto';
import { ModuleEnum } from 'src/common/enum/module.enum';
import { RoleType } from 'src/common/enum/role.enum';

export class AdminListRolePermissionQueryDto extends QueryDto {
  @ApiPropertyOptional({ enum: RoleType })
  @IsOptional()
  @IsEnum(RoleType)
  role?: RoleType;

  @ApiPropertyOptional({ enum: ModuleEnum })
  @IsOptional()
  @IsEnum(ModuleEnum)
  module?: ModuleEnum;
}
