import { Exclude, Expose, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

@Exclude()
export class AdminConversationUserResponseDto {
  @Expose()
  @ApiProperty({ type: String })
  id: string;

  @Expose()
  @ApiProperty({ type: String })
  name: string;

  @Expose()
  @ApiProperty({ type: String })
  avatar: string;
}

@Exclude()
export class AdminConversationResponseDto {
  @Expose()
  @ApiProperty({ type: String })
  id: string;

  @Expose()
  @ApiProperty({ type: AdminConversationUserResponseDto })
  @Type(() => AdminConversationUserResponseDto)
  user: AdminConversationUserResponseDto;

  @Expose()
  @ApiProperty({ type: String })
  latestMessage: string;
}
