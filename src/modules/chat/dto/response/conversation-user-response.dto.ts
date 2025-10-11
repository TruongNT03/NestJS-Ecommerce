import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class ConversationUserResponseDto {
  @Expose()
  @ApiProperty({ type: String })
  id: String;

  @Expose()
  @ApiProperty({ type: String })
  firstName: string;

  @Expose()
  @ApiProperty({ type: String })
  lastName: string;

  @Expose()
  @ApiProperty({ type: String })
  avatar: string;
}
