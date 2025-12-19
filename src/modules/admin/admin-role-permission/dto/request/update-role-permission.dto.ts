import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsUUID, Validate } from 'class-validator';
import { Exist } from 'src/decorators/custom-validate.decorator';
import { RolePermissionMap } from 'src/entities/role-permission-map.entity';

export class UpdateRolePermissionDto {
  @ApiProperty({ type: String })
  @IsUUID()
  @Validate(Exist, [RolePermissionMap, 'id', false, false])
  id: string;

  @ApiProperty({ type: Boolean })
  @IsBoolean()
  isCreate: boolean;

  @ApiProperty({ type: Boolean })
  @IsBoolean()
  isRead: boolean;

  @ApiProperty({ type: Boolean })
  @IsBoolean()
  isUpdate: boolean;

  @ApiProperty({ type: Boolean })
  @IsBoolean()
  isDelete: boolean;
}
