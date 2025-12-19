import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsEnum, IsNumber, IsString, IsUUID, Validate } from 'class-validator';
import { Exist } from 'src/decorators/custom-validate.decorator';
import { Location } from 'src/entities/location.entity';
import { UserEntity } from 'src/entities/user.entity';
import { UserGender } from 'src/modules/auth/dto/request/update-profile.dto';

export enum InternalUserRole {
  PRODUCT_MANAGER = 'Product Manager',
  ORDER_MANAGER = 'Order Manager',
  TECHNICIAN = 'Technician',
}

export class AdminCreateUserDto {
  @ApiProperty({ type: String })
  @IsString()
  @Validate(Exist, [UserEntity, 'email', true, false])
  email: string;

  @ApiProperty({ type: String })
  @IsString()
  name: string;

  @ApiProperty({ enum: UserGender })
  @IsString()
  gender: UserGender;

  @ApiProperty({ type: String })
  @IsString()
  phoneNumber: string;

  @ApiProperty({ enum: InternalUserRole, isArray: true })
  @IsArray()
  @IsEnum(InternalUserRole, { each: true })
  roles: InternalUserRole[];

  @ApiProperty({ type: String })
  @IsUUID()
  @Validate(Exist, [Location, 'id', false, false])
  locationId: string;
}
