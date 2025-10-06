import { Controller, Get, Query } from '@nestjs/common';
import { AdminUserService } from './admin-user.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Role } from 'src/decorators/role.decorator';
import { RoleType } from 'src/common/enum/role.enum';
import { UserListResponseDto } from './response/list-user-response.dto';
import { AdminUserQueryDto } from './request/admin-user-query.dto';

@ApiTags('[ADMIN] USER MANAGEMENT')
@ApiBearerAuth()
@Role([RoleType.ADMIN])
@Controller('user')
export class AdminUserController {
  constructor(private readonly adminUserService: AdminUserService) {}

  @ApiOperation({ summary: '[ADMIN] GET LIST USER' })
  @ApiResponse({ status: 200, type: UserListResponseDto })
  @Get()
  async findAll(
    @Query() query: AdminUserQueryDto,
  ): Promise<UserListResponseDto> {
    return await this.adminUserService.findAll(query);
  }
}
