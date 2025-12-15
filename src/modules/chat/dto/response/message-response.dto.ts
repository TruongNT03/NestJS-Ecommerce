import { Exclude, Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

@Exclude()
export class MessageResponseDto {
  @Expose()
  @ApiProperty({ type: Number })
  id: number;

  @Expose()
  @ApiProperty({ type: String })
  conversationId: string;

  @Expose()
  @ApiProperty({ type: String })
  content: string;

  @Expose()
  @ApiProperty({ type: String })
  senderId: string;

  @Expose()
  @ApiProperty({ type: Date })
  createdAt: Date;
}
