import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsString, IsUrl } from 'class-validator';

export enum UserGender {
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'other',
}

export class UpdateProfileDto {
  @ApiProperty({ type: String })
  @IsString()
  name: string;

  @ApiProperty({ type: String })
  @IsString()
  phoneNumber: string;

  @ApiPropertyOptional({ type: String })
  @IsString()
  avatar: string;

  @ApiProperty({ enum: UserGender })
  @IsEnum(UserGender)
  gender: UserGender;
}
