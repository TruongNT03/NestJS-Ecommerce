import { Exclude, Expose, Type } from 'class-transformer';
import { PaginateResponseDto } from 'src/common/dto/paginate-response.dto';
import { AddressResponseDto } from './address-response.dto';
import { PaginateMetaDto } from 'src/common/dto/paginate-meta.dto';
import { ApiProperty } from '@nestjs/swagger';

@Exclude()
export class ListAddressResponseDto extends PaginateResponseDto<AddressResponseDto> {
  @Expose()
  @ApiProperty({ type: [AddressResponseDto] })
  @Type(() => AddressResponseDto)
  data: AddressResponseDto[];

  @Expose()
  @ApiProperty({ type: PaginateMetaDto })
  @Type(() => PaginateMetaDto)
  paginate: PaginateMetaDto;
}
