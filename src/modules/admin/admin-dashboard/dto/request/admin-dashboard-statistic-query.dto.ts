import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';

export enum AdminDashboardStatisticBy {
  DAY = 'day',
  MONTH = 'mouth',
  YEAR = 'year',
}

export class AdminDashboardStatisticQueryDto {
  @ApiPropertyOptional({ enum: AdminDashboardStatisticBy })
  @IsOptional()
  @IsEnum(AdminDashboardStatisticBy)
  statisticBy?: AdminDashboardStatisticBy;
}
