import { Exclude, Expose, Type } from 'class-transformer';
import { PaginateMetaDto } from 'src/common/dto/paginate-meta.dto';
import { PaginateResponseDto } from 'src/common/dto/paginate-response.dto';
import { ProductResponseDto } from 'src/modules/admin/admin-product/dto/response/product-response.dto';
import { ApiProperty } from '@nestjs/swagger';

@Exclude()
export class ListProductResponseDto extends PaginateResponseDto<ProductResponseDto> {
  @Expose()
  @ApiProperty({ type: ProductResponseDto })
  @Type(() => ProductResponseDto)
  data: ProductResponseDto[];

  @Expose()
  @ApiProperty({ type: PaginateMetaDto })
  paginate: PaginateMetaDto;
}
