import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Type } from 'class-transformer';

@Exclude()
export class AdminRolePermissionRoleResponseDto {
  @Expose()
  @ApiProperty({ type: String })
  id: string;

  @Expose()
  @ApiProperty({ type: String })
  name: string;
}

@Exclude()
export class AdminRolePermissionResponseDto {
  @Expose()
  @ApiProperty({ type: String })
  id: string;

  @Expose()
  @ApiProperty({ type: AdminRolePermissionRoleResponseDto })
  @Type(() => AdminRolePermissionRoleResponseDto)
  role: AdminRolePermissionRoleResponseDto;

  @Expose()
  @ApiProperty({ type: String })
  module: string;

  @Expose()
  @ApiProperty({ type: Boolean })
  isCreate: boolean;

  @Expose()
  @ApiProperty({ type: Boolean })
  isRead: boolean;

  @Expose()
  @ApiProperty({ type: Boolean })
  isUpdate: boolean;

  @Expose()
  @ApiProperty({ type: Boolean })
  isDelete: boolean;

  @Expose()
  @ApiProperty({ type: Date })
  createdAt: Date;

  @Expose()
  @ApiProperty({ type: Date })
  updatedAt: Date;

  @Expose()
  @ApiProperty({ type: Date })
  deletedAt: Date;
}
