import { Controller, Get, Query } from '@nestjs/common';
import { AdminOrderService } from './admin-order.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Role } from 'src/decorators/role.decorator';
import { RoleType } from 'src/common/enum/role.enum';
import { AdminListOrderQueryDto } from './dto/request/admin-list-order-query.dto';
import { AdminListOrderResponseDto } from './dto/response/admin-list-order-response.dto';

@ApiTags('[ADMIN] ORDER')
@ApiBearerAuth()
@Role([RoleType.ADMIN])
@Controller('admin-order')
export class AdminOrderController {
  constructor(private readonly adminOrderService: AdminOrderService) {}

  @ApiOperation({ summary: '[ADMIN] FIND ALL ORDER' })
  @ApiResponse({ status: 200, type: AdminListOrderResponseDto })
  @Get()
  async findAll(
    @Query() query: AdminListOrderQueryDto,
  ): Promise<AdminListOrderResponseDto> {
    return await this.adminOrderService.findAll(query);
  }
}
