import { Exclude, Expose, Type } from 'class-transformer';
import { PaginateResponseDto } from 'src/common/dto/paginate-response.dto';
import { NotificationResponseDto } from './notification-response.dto';
import { PaginateMetaDto } from 'src/common/dto/paginate-meta.dto';
import { ApiProperty } from '@nestjs/swagger';

@Exclude()
export class ListNotificationResponseDto extends PaginateResponseDto<NotificationResponseDto> {
  @Expose()
  @ApiProperty({ type: [NotificationResponseDto] })
  @Type(() => NotificationResponseDto)
  data: NotificationResponseDto[];

  @Expose()
  @ApiProperty({ type: PaginateMetaDto })
  @Type(() => PaginateMetaDto)
  paginate: PaginateMetaDto;
}
