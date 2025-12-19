import { Controller, Get, Param, Query } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Role } from 'src/decorators/role.decorator';
import { RoleType } from 'src/common/enum/role.enum';
import { ListNotificationQueryDto } from './dto/request/list-notification-query.dto';
import { User } from 'src/decorators/user.decorator';
import { UserRequestPayload } from '../auth/auth.interface';
import { ListNotificationResponseDto } from './dto/response/list-notification-response.dto';
import { TotalUnreadNotificationResponseDto } from './dto/response/total-unread-response.dto';
import { SuccessResponseDto } from 'src/common/dto/success-response.dto';

@ApiTags('[USER/ADMIN] NOTIFICATION')
@Role([
  RoleType.ADMIN,
  RoleType.USER,
  RoleType.ORDER_MANAGER,
  RoleType.PRODUCT_MANAGER,
  RoleType.TECHNICIAN,
])
@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @ApiOperation({ summary: '[USER/ADMIN] FIND ALL NOTIFICATION' })
  @ApiResponse({ status: 200, type: ListNotificationResponseDto })
  @Get()
  async findAll(
    @Query() query: ListNotificationQueryDto,
    @User() user: UserRequestPayload,
  ): Promise<ListNotificationResponseDto> {
    return await this.notificationService.findAll(query, user);
  }

  @ApiOperation({ summary: '[USER/ADMIN] GET TOTAL UNREAD NOTIFICATION' })
  @ApiResponse({ status: 200, type: TotalUnreadNotificationResponseDto })
  @Get('unread-count')
  async getTotalUnreadNotification(
    @User() user: UserRequestPayload,
  ): Promise<TotalUnreadNotificationResponseDto> {
    return await this.notificationService.getTotalUnreadNotification(user);
  }

  @ApiOperation({ summary: '[USER/ADMIN] MARK ALL READ' })
  @ApiResponse({ status: 200, type: SuccessResponseDto })
  @Get('read')
  async markAllRead(@User() user: UserRequestPayload): Promise<SuccessResponseDto> {
    return await this.notificationService.markAllRead(user);
  }

  @ApiOperation({ summary: '[USER/ADMIN] MARK READ' })
  @ApiResponse({ status: 200, type: SuccessResponseDto })
  @Get(':notificationId/read')
  async markRead(
    @Param('notificationId') notificationId: string,
    @User() user: UserRequestPayload,
  ): Promise<SuccessResponseDto> {
    return await this.notificationService.markRead(user, notificationId);
  }
}
