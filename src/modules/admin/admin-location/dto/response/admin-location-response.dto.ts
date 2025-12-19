import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class AdminLocationResponseDto {
  @Expose()
  @ApiProperty({ type: String })
  id: string;

  @Expose()
  @ApiProperty({ type: String })
  address: string;

  @Expose()
  @ApiProperty({ type: String })
  hotline: string;

  @Expose()
  @ApiProperty({ type: String })
  openTime: string;

  @Expose()
  @ApiProperty({ type: String })
  closeTime: string;

  @Expose()
  @ApiProperty({ type: String })
  openDate: string;

  @Expose()
  @ApiProperty({ type: Date })
  createdAt: Date;

  @Expose()
  @ApiProperty({ type: Date })
  updatedAt: Date;

  @Expose()
  @ApiProperty({ type: Date })
  deletedAt: Date;
}
