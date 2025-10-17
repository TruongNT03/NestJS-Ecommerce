import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Type } from 'class-transformer';
import { ConversationUserResponseDto } from './conversation-user-response.dto';

@Exclude()
export class ConversationResponseDto {
  @Expose()
  @ApiProperty({ type: String })
  id: string;

  @Expose()
  @ApiProperty({ type: [ConversationUserResponseDto] })
  @Type(() => ConversationUserResponseDto)
  users: ConversationUserResponseDto[];
}
