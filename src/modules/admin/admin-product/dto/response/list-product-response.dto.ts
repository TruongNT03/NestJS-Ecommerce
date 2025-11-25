import { Exclude, Expose, Type } from 'class-transformer';
import { PaginateMetaDto } from 'src/common/dto/paginate-meta.dto';
import { PaginateResponseDto } from 'src/common/dto/paginate-response.dto';
import { AdminProductResponseDto } from 'src/modules/admin/admin-product/dto/response/product-response.dto';
import { ApiProperty } from '@nestjs/swagger';

@Exclude()
export class ListProductResponseDto extends PaginateResponseDto<AdminProductResponseDto> {
  @Expose()
  @ApiProperty({ type: [AdminProductResponseDto] })
  @Type(() => AdminProductResponseDto)
  data: AdminProductResponseDto[];

  @Expose()
  @ApiProperty({ type: PaginateMetaDto })
  paginate: PaginateMetaDto;
}
