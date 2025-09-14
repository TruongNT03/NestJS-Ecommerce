import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class PaginateMetaDto {
  @Expose()
  @ApiProperty()
  page: number;

  @Expose()
  @ApiProperty()
  pageSize: number;

  @Expose()
  @ApiProperty()
  totalItem: number;

  @Expose()
  @ApiProperty()
  totalPage: number;
}
