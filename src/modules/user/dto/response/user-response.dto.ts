import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Transform, Type } from 'class-transformer';
import { RoleResponseDto } from './role-response.dto';
import { UserGender } from 'src/modules/auth/dto/request/update-profile.dto';

@Exclude()
export class UserResponseDto {
  @Expose()
  @ApiProperty({ type: String })
  id: string;

  @Expose()
  @ApiProperty({ type: String })
  email: string;

  @Expose()
  @ApiProperty({ type: String })
  name: string;

  @Expose()
  @ApiProperty({ type: String })
  phoneNumber: string;

  @Expose()
  @ApiProperty({ type: String })
  avatar: string;

  @Expose()
  @ApiProperty({ enum: UserGender })
  gender: UserGender;

  @Expose()
  @ApiProperty({ type: [String] })
  roles?: string[];

  @ApiProperty({ type: Date })
  @Expose()
  createdAt: Date;
}
