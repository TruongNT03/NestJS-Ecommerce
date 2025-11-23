import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsString } from 'class-validator';

export class UpdateAddressDto {
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
