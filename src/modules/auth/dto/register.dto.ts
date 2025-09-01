import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsStrongPassword, Validate } from 'class-validator';
import { Exist } from 'src/decorators/custome-validate.decorator';
import { User } from 'src/entities/user.entity';

export class RegisterDto {
  @ApiProperty()
  @IsEmail()
  @Validate(Exist<User>, [User, 'email'])
  email: string;

  @ApiProperty()
  @IsStrongPassword()
  password: string;
}
