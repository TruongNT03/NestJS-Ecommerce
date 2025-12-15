import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class VerifyGoogleCode {
  @ApiProperty({ type: String })
  @IsString()
  code: string;
}
