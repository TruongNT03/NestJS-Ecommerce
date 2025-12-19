import { Controller, Get } from '@nestjs/common';
import { RolePermissionService } from './role-permission.service';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Role } from 'src/decorators/role.decorator';
import { RoleType } from 'src/common/enum/role.enum';
import { AdminRolePermissionResponseDto } from '../admin/admin-role-permission/dto/response/admin-role-permission-response.dto';
import { User } from 'src/decorators/user.decorator';
import { UserRequestPayload } from '../auth/auth.interface';

@ApiTags('ROLE PERMISSION')
@ApiBearerAuth()
@Role([
  RoleType.ADMIN,
  RoleType.ORDER_MANAGER,
  RoleType.PRODUCT_MANAGER,
  RoleType.TECHNICIAN,
  RoleType.USER,
])
@Controller('role-permission')
export class RolePermissionController {
  constructor(private readonly rolePermissionService: RolePermissionService) {}

  @ApiOperation({ summary: '[COMMON] GET SELF ROLE PERMISSION' })
  @ApiResponse({ status: 200, type: [AdminRolePermissionResponseDto] })
  @Get('self')
  async getSelfRolePermission(
    @User() user: UserRequestPayload,
  ): Promise<AdminRolePermissionResponseDto[]> {
    return await this.rolePermissionService.getSelfRolePermission(user);
  }
}
