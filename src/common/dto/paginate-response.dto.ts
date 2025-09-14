import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { PaginateMetaDto } from './paginate-meta.dto';

@Exclude()
export class PaginateResponseDto<T> {
  @Expose()
  @ApiProperty()
  data: T[];

  @Expose()
  @ApiProperty({ type: PaginateMetaDto })
  paginate: PaginateMetaDto;
}
