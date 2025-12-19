import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Type } from 'class-transformer';
import { PaginateMetaDto } from 'src/common/dto/paginate-meta.dto';
import { PaginateResponseDto } from 'src/common/dto/paginate-response.dto';
import { AdminRolePermissionResponseDto } from './admin-role-permission-response.dto';

@Exclude()
export class AdminListRolePermissionResponseDto extends PaginateResponseDto<AdminRolePermissionResponseDto> {
  @Expose()
  @ApiProperty({ type: [AdminRolePermissionResponseDto] })
  @Type(() => AdminRolePermissionResponseDto)
  data: AdminRolePermissionResponseDto[];

  @Expose()
  @ApiProperty({ type: PaginateMetaDto })
  @Type(() => PaginateMetaDto)
  paginate: PaginateMetaDto;
}
