import { Exclude, Expose, Type } from 'class-transformer';
import { PaginateResponseDto } from 'src/common/dto/paginate-response.dto';
import { AdminConversationResponseDto } from 'src/modules/admin/admin-chat/response/conversation-response.dto';
import { ApiProperty } from '@nestjs/swagger';
import { PaginateMetaDto } from 'src/common/dto/paginate-meta.dto';

@Exclude()
export class AdminListConversationResponseDto extends PaginateResponseDto<AdminConversationResponseDto> {
  @Expose()
  @ApiProperty({ type: [AdminConversationResponseDto] })
  @Type(() => AdminConversationResponseDto)
  data: AdminConversationResponseDto[];

  @Expose()
  @ApiProperty({ type: PaginateMetaDto })
  @Type(() => PaginateMetaDto)
  paginate: PaginateMetaDto;
}
