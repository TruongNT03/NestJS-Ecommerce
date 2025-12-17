import { Exclude, Expose, Type } from 'class-transformer';
import { PaginateResponseDto } from 'src/common/dto/paginate-response.dto';
import { AdminVoucherResponseDto } from './admin-voucher-response.dto';
import { PaginateMetaDto } from 'src/common/dto/paginate-meta.dto';
import { ApiProperty } from '@nestjs/swagger';

@Exclude()
export class AdminListVoucherResponseDto extends PaginateResponseDto<AdminVoucherResponseDto> {
  @Expose()
  @ApiProperty({ type: [AdminVoucherResponseDto] })
  @Type(() => AdminVoucherResponseDto)
  data: AdminVoucherResponseDto[];

  @Expose()
  @ApiProperty({ type: PaginateMetaDto })
  @Type(() => PaginateMetaDto)
  paginate: PaginateMetaDto;
}
