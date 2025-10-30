import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdateAddressDto {
  @ApiProperty({ type: String })
  @IsString()
  address: string;
}
