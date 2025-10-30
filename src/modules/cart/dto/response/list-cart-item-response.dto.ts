import { Exclude, Expose, Type } from 'class-transformer';
import { PaginateResponseDto } from 'src/common/dto/paginate-response.dto';
import { CartItemResponseDto } from './cart-item-response.dto';
import { PaginateMetaDto } from 'src/common/dto/paginate-meta.dto';
import { ApiProperty } from '@nestjs/swagger';

@Exclude()
export class ListCartItemResponseDto extends PaginateResponseDto<CartItemResponseDto> {
  @Expose()
  @ApiProperty({ type: [CartItemResponseDto] })
  @Type(() => CartItemResponseDto)
  data: CartItemResponseDto[];

  @Expose()
  @ApiProperty({ type: PaginateMetaDto })
  @Type(() => PaginateMetaDto)
  paginate: PaginateMetaDto;
}
