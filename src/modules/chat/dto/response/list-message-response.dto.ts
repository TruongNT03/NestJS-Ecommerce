import { Exclude, Expose, Type } from 'class-transformer';
import { PaginateMetaDto } from 'src/common/dto/paginate-meta.dto';
import { PaginateResponseDto } from 'src/common/dto/paginate-response.dto';
import { MessageResponseDto } from 'src/modules/chat/dto/response/message-response.dto';
import { ApiProperty } from '@nestjs/swagger';

@Exclude()
export class ListMessageResponseDto extends PaginateResponseDto<MessageResponseDto> {
  @Expose()
  @ApiProperty({ type: [MessageResponseDto] })
  @Type(() => MessageResponseDto)
  data: MessageResponseDto[];

  @Expose()
  @ApiProperty({ type: PaginateMetaDto })
  @Type(() => PaginateMetaDto)
  paginate: PaginateMetaDto;
}
