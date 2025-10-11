import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID } from 'class-validator';

export class CreateMessageDto {
  @ApiProperty()
  @IsUUID()
  conversationId: string;

  @ApiProperty()
  @IsString()
  content: string;
}
