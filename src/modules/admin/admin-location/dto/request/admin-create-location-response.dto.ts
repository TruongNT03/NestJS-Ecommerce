import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class AdminCreateLocationDto {
  @ApiProperty({ type: String })
  @IsString()
  address: string;

  @ApiProperty({ type: String })
  @IsString()
  hotline: string;

  @ApiProperty({ type: String })
  @IsString()
  openTime: string;

  @ApiProperty({ type: String })
  @IsString()
  closeTime: string;

  @ApiProperty({ type: String })
  @IsString()
  openDate: string;
}
