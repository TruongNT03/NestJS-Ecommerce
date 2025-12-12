import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class AdminDashboardStatisticResponseDto {
  @Expose()
  @ApiProperty({ type: Number })
  newOrderCount: number;

  @Expose()
  @ApiProperty({ type: Number })
  newUserCount: number;

  @Expose()
  @ApiProperty({ type: Number })
  revenue: number;
}
