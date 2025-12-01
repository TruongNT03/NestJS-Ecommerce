import { PaginateResponseDto } from 'src/common/dto/paginate-response.dto';
import { CategoryResponseDto } from './category-response.dto';
import { Exclude, Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { PaginateMetaDto } from 'src/common/dto/paginate-meta.dto';

@Exclude()
export class ListCategoryResponseDto extends PaginateResponseDto<CategoryResponseDto> {
  @Expose()
  @ApiProperty({ type: [CategoryResponseDto] })
  data: CategoryResponseDto[];

  @Expose()
  @ApiProperty({ type: PaginateMetaDto })
  paginate: PaginateMetaDto;
}
