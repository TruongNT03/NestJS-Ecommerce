import { IsEnum, IsJSON, IsOptional, IsString, IsUUID } from 'class-validator';
import { NotificationNavigateTo } from 'src/common/enum/notification-navigate-to.enum';
import { RoleType } from 'src/common/enum/role.enum';

export class SaveNotificationDto {
  @IsString()
  title: string;

  @IsString()
  content: string;

  @IsOptional()
  @IsEnum(RoleType)
  alertTo?: RoleType;

  @IsString()
  triggerBy: string;

  @IsEnum(NotificationNavigateTo)
  navigateTo: NotificationNavigateTo;

  @IsJSON()
  meta?: any;

  @IsOptional()
  @IsUUID()
  userId?: string;
}
