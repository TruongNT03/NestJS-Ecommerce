import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { QueryDto } from 'src/common/dto/query.dto';
import { OrderStatus } from 'src/common/enum/order-status.enum';

export class AdminListOrderQueryDto extends QueryDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsEnum(OrderStatus)
  orderStatusFilter?: OrderStatus;
}
