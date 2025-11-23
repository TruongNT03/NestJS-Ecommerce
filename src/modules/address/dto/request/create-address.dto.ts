import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString } from 'class-validator';

export class CreateAddressDto {
  @ApiProperty({ type: String })
  @IsString()
  detail: string;

  @ApiProperty({ type: String })
  @IsString()
  phoneNumber: string;

  @ApiProperty({ type: String })
  @IsString()
  name: string;

  @ApiProperty({ type: Boolean })
  @IsBoolean()
  isDefault: boolean;
}
