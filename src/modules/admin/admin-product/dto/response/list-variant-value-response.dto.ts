import { Exclude, Expose } from 'class-transformer';
import { PaginateResponseDto } from 'src/common/dto/paginate-response.dto';
import { VariantValueResponseDto } from 'src/modules/admin/admin-product/dto/response/variant-value-response.dto';
import { ApiProperty } from '@nestjs/swagger';
import { PaginateMetaDto } from 'src/common/dto/paginate-meta.dto';

@Exclude()
export class ListVariantValueResponseDto extends PaginateResponseDto<VariantValueResponseDto> {
  @Expose()
  @ApiProperty({ type: [VariantValueResponseDto] })
  data: VariantValueResponseDto[];

  @Expose()
  @ApiProperty({ type: PaginateMetaDto })
  paginate: PaginateMetaDto;
}
