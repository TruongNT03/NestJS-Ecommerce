import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class AdminRevenueResponseDto {
  @Expose()
  @ApiProperty({ type: Number })
  revenue: number;

  @Expose()
  @ApiProperty({ type: Date })
  date: Date;
}
