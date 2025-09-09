import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    description: 'Email use to login',
    example: 'truongnt267@gmail.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'Password use to login', example: '12345678Aa@' })
  @IsString()
  password: string;
}
