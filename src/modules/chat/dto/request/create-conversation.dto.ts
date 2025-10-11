import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class CreateConversationDto {
  @ApiProperty()
  @IsUUID()
  userId: string;
}
