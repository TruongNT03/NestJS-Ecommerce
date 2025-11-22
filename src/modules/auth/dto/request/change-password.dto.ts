import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsStrongPassword } from 'class-validator';

export class ChangePasswordDto {
  @ApiProperty({ type: String })
  @IsString()
  password: string;

  @ApiProperty()
  @IsStrongPassword()
  newPassword: string;
}
