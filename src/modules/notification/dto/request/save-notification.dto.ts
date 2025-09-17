import { IsEnum, IsJSON, IsOptional, IsString, IsUUID } from 'class-validator';
import { RoleType } from 'src/common/enum/role.enum';

export class SaveNotificationDto {
  @IsString()
  title: string;

  @IsString()
  content: string;

  @IsEnum(RoleType)
  alertTo: RoleType;

  @IsString()
  triggerBy: string;

  @IsString()
  navigateTo: string;

  @IsJSON()
  meta?: any;

  @IsOptional()
  @IsUUID()
  userId?: string;
}
