import { Exclude, Expose, Type } from 'class-transformer';
import { PaginateResponseDto } from 'src/common/dto/paginate-response.dto';
import { AdminOrderResponseDto } from './admin-order-response.dto';
import { PaginateMetaDto } from 'src/common/dto/paginate-meta.dto';
import { ApiProperty } from '@nestjs/swagger';

@Exclude()
export class AdminListOrderResponseDto extends PaginateResponseDto<AdminOrderResponseDto> {
  @Expose()
  @ApiProperty({ type: [AdminOrderResponseDto] })
  @Type(() => AdminOrderResponseDto)
  data: AdminOrderResponseDto[];

  @Expose()
  @ApiProperty({ type: PaginateMetaDto })
  @Type(() => PaginateMetaDto)
  paginate: PaginateMetaDto;
}
