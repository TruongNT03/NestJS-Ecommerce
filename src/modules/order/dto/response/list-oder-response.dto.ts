import { Exclude, Expose, Type } from 'class-transformer';
import { PaginateResponseDto } from 'src/common/dto/paginate-response.dto';
import { OrderResponseDto } from './order-response.dto';
import { PaginateMetaDto } from 'src/common/dto/paginate-meta.dto';
import { ApiProperty } from '@nestjs/swagger';

@Exclude()
export class ListOrderResponseDto extends PaginateResponseDto<OrderResponseDto> {
  @Expose()
  @ApiProperty({ type: [OrderResponseDto] })
  @Type(() => OrderResponseDto)
  data: OrderResponseDto[];

  @Expose()
  @ApiProperty({ type: PaginateMetaDto })
  @Type(() => PaginateMetaDto)
  paginate: PaginateMetaDto;
}
