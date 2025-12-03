import { Exclude, Expose, Type } from 'class-transformer';
import { PaginateResponseDto } from 'src/common/dto/paginate-response.dto';
import { AdminFaqResponseDto } from './admin-faq-response.dto';
import { PaginateMetaDto } from 'src/common/dto/paginate-meta.dto';
import { ApiProperty } from '@nestjs/swagger';

@Exclude()
export class AdminListFaqResponseDto extends PaginateResponseDto<AdminFaqResponseDto> {
  @Expose()
  @ApiProperty({ type: [AdminFaqResponseDto] })
  @Type(() => AdminFaqResponseDto)
  data: AdminFaqResponseDto[];

  @Expose()
  @ApiProperty({ type: PaginateMetaDto })
  @Type(() => PaginateMetaDto)
  paginate: PaginateMetaDto;
}
