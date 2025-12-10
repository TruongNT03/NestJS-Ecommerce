import { Exclude, Expose, Type } from 'class-transformer';
import { PaginateResponseDto } from 'src/common/dto/paginate-response.dto';
import { ReviewResponseDto } from './review-response.dto';
import { PaginateMetaDto } from 'src/common/dto/paginate-meta.dto';
import { ApiProperty } from '@nestjs/swagger';

@Exclude()
export class ListReviewResponseDto extends PaginateResponseDto<ReviewResponseDto> {
  @Expose()
  @ApiProperty({ type: [ReviewResponseDto] })
  @Type(() => ReviewResponseDto)
  data: ReviewResponseDto[];

  @Expose()
  @ApiProperty({ type: PaginateMetaDto })
  @Type(() => PaginateMetaDto)
  paginate: PaginateMetaDto;
}
