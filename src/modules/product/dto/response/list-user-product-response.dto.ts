import { PaginateResponseDto } from 'src/common/dto/paginate-response.dto';
import { Exclude, Expose, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { ProductResponseDto } from 'src/modules/product/dto/response/product-response.dto';
import { PaginateMetaDto } from 'src/common/dto/paginate-meta.dto';

@Exclude()
export class ListUserProductResponseDto extends PaginateResponseDto<ProductResponseDto> {
  @Expose()
  @ApiProperty({ type: [ProductResponseDto] })
  @Type(() => ProductResponseDto)
  data: ProductResponseDto[];

  @Expose()
  @ApiProperty({ type: PaginateMetaDto })
  paginate: PaginateMetaDto;
}
