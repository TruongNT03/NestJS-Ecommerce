import { Exclude, Expose } from 'class-transformer';
import { PaginateResponseDto } from 'src/common/dto/paginate-response.dto';
import { VariantResponseDto } from 'src/modules/admin/admin-product/dto/response/variant-response.dto';
import { ApiProperty } from '@nestjs/swagger';
import { PaginateMetaDto } from 'src/common/dto/paginate-meta.dto';

@Exclude()
export class ListVariantResponseDto extends PaginateResponseDto<VariantResponseDto> {
  @Expose()
  @ApiProperty({ type: [VariantResponseDto] })
  data: VariantResponseDto[];

  @Expose()
  @ApiProperty({ type: PaginateMetaDto })
  paginate: PaginateMetaDto;
}
