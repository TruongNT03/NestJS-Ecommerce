import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class VerifyRegisterDto {
  @ApiProperty({
    description: 'OTP use to verify register account',
    example: '123456',
  })
  @IsString()
  OTP: string;
}
