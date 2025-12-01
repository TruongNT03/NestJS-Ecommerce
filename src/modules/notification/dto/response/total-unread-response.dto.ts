import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class TotalUnreadNotificationResponseDto {
  @Expose()
  @ApiProperty({ type: Number })
  totalUnread: number;
}
