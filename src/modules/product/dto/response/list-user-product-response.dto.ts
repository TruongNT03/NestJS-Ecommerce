import { PaginateResponseDto } from 'src/common/dto/paginate-response.dto';
import { Exclude, Expose, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { UserProductResponseDto } from 'src/modules/product/dto/response/user-product-response.dto';
import { PaginateMetaDto } from 'src/common/dto/paginate-meta.dto';

@Exclude()
export class ListUserProductResponseDto extends PaginateResponseDto<UserProductResponseDto> {
  @Expose()
  @ApiProperty({ type: [UserProductResponseDto] })
  @Type(() => UserProductResponseDto)
  data: UserProductResponseDto[];

  @Expose()
  @ApiProperty({ type: PaginateMetaDto })
  paginate: PaginateMetaDto;
}
