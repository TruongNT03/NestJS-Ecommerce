import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class VerifyRegisterDto {
  @ApiProperty()
  @IsString()
  OTP: string;
}
