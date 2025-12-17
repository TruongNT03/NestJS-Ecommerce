import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsStrongPassword, Validate } from 'class-validator';
import { Exist } from 'src/decorators/custom-validate.decorator';
import { UserEntity } from 'src/entities/user.entity';

export class RegisterDto {
  @ApiProperty({
    description: 'Email use to register',
    example: 'truongnt267@gmail.com',
  })
  @IsEmail()
  @Validate(Exist<UserEntity>, [UserEntity, 'email', true])
  email: string;

  @ApiProperty({
    description: 'Password use to register',
    example: '12345678Aa@',
  })
  @IsStrongPassword()
  password: string;
}
