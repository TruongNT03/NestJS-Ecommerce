import { Exclude, Expose, Type } from 'class-transformer';
import { PaginateResponseDto } from 'src/common/dto/paginate-response.dto';
import { VoucherResponseDto } from './voucher-response.dto';
import { PaginateMetaDto } from 'src/common/dto/paginate-meta.dto';
import { ApiProperty } from '@nestjs/swagger';

@Exclude()
export class ListVoucherResponseDto extends PaginateResponseDto<VoucherResponseDto> {
  @Expose()
  @ApiProperty({ type: [VoucherResponseDto] })
  @Type(() => VoucherResponseDto)
  data: VoucherResponseDto[];

  @Expose()
  @ApiProperty({ type: PaginateMetaDto })
  @Type(() => PaginateMetaDto)
  paginate: PaginateMetaDto;
}
