import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class AskResponseDto {
  @Expose()
  @ApiProperty({ type: String })
  answer: string;
}
