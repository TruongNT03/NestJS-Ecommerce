import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { NotificationDuration, NotificationType } from 'src/common/enum/notification.enum';

@Exclude()
export class NotificationResponseDto {
  @Expose()
  @ApiProperty({ type: String })
  id: string;

  @Expose()
  @ApiProperty({ type: String })
  title: string;

  @Expose()
  @ApiProperty({ type: String })
  content: string;

  @Expose()
  @ApiProperty({ type: String })
  triggerBy: string;

  @Expose()
  @ApiProperty({ enum: NotificationType })
  type: NotificationType;

  @Expose()
  @ApiProperty({ enum: NotificationDuration })
  duration: NotificationDuration;

  @Expose()
  @ApiProperty({ type: String })
  navigateTo: string;

  @Expose()
  @ApiProperty({ type: Boolean })
  isRead: boolean;

  @Expose()
  @ApiProperty()
  meta: any;

  @Expose()
  @ApiProperty({ type: Date })
  createdAt: Date;

  @Expose()
  @ApiProperty({ type: Date })
  updatedAt: Date;
}
