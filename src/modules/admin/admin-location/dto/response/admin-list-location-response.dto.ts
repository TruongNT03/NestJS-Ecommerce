import { Exclude, Expose, Type } from 'class-transformer';
import { PaginateResponseDto } from 'src/common/dto/paginate-response.dto';
import { AdminLocationResponseDto } from './admin-location-response.dto';
import { PaginateMetaDto } from 'src/common/dto/paginate-meta.dto';
import { ApiProperty } from '@nestjs/swagger';

@Exclude()
export class AdminListLocationResponseDto extends PaginateResponseDto<AdminLocationResponseDto> {
  @Expose()
  @ApiProperty({ type: [AdminLocationResponseDto] })
  @Type(() => AdminLocationResponseDto)
  data: AdminLocationResponseDto[];

  @Expose()
  @ApiProperty({ type: PaginateMetaDto })
  @Type(() => PaginateMetaDto)
  paginate: PaginateMetaDto;
}
