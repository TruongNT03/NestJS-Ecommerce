import { Exclude, Expose } from 'class-transformer';
import { PaginateResponseDto } from 'src/common/dto/paginate-response.dto';
import { ConversationResponseDto } from './conversation-reponse.dto';
import { PaginateMetaDto } from 'src/common/dto/paginate-meta.dto';
import { ApiProperty } from '@nestjs/swagger';

@Exclude()
export class ListConversationResponseDto extends PaginateResponseDto<ConversationResponseDto> {
  @Expose()
  @ApiProperty({ type: [ConversationResponseDto] })
  data: ConversationResponseDto[];

  @Expose()
  @ApiProperty({ type: PaginateMetaDto })
  paginate: PaginateMetaDto;
}
