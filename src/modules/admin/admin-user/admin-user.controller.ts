import { Controller, Get } from '@nestjs/common';
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

@ApiTags('[Admin] User management')
@ApiBearerAuth()
@Role([RoleType.ADMIN])
@Controller('user')
export class AdminUserController {
  constructor(private readonly adminUserService: AdminUserService) {}

  @ApiOperation({ summary: '[Admin] Get list user' })
  @ApiResponse({ status: 200, type: UserListResponseDto })
  @Get()
  async findAll(): Promise<UserListResponseDto> {
    return await this.adminUserService.findAll();
  }
}
