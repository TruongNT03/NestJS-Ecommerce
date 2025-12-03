import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class AskDto {
  @ApiProperty({ type: String })
  @IsString()
  question: string;
}
