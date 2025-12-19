import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { AdminUserService } from './admin-user.service';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Role } from 'src/decorators/role.decorator';
import { RoleType } from 'src/common/enum/role.enum';
import { UserListResponseDto } from './response/list-user-response.dto';
import { AdminUserQueryDto } from './request/admin-user-query.dto';
import { SuccessResponseDto } from 'src/common/dto/success-response.dto';
import { AdminCreateUserDto } from './request/admin-create-user.dto';
import { ActionPermission, RolePermission } from 'src/decorators/role-permission.decorator';
import { ModuleEnum } from 'src/common/enum/module.enum';

@ApiTags('[ADMIN] USER MANAGEMENT')
@ApiBearerAuth()
@Role([RoleType.ADMIN, RoleType.ORDER_MANAGER, RoleType.PRODUCT_MANAGER, RoleType.TECHNICIAN])
@Controller('user')
export class AdminUserController {
  constructor(private readonly adminUserService: AdminUserService) {}

  @RolePermission({ module: ModuleEnum.USER, permission: ActionPermission.READ })
  @ApiOperation({ summary: '[ADMIN] GET LIST USER' })
  @ApiResponse({ status: 200, type: UserListResponseDto })
  @Get()
  async findAll(@Query() query: AdminUserQueryDto): Promise<UserListResponseDto> {
    return await this.adminUserService.findAll(query);
  }

  @RolePermission({ module: ModuleEnum.USER, permission: ActionPermission.CREATE })
  @ApiOperation({ summary: '[ADMIN] CREATE INTERNAL ACCOUNT' })
  @ApiResponse({ status: 201, type: SuccessResponseDto })
  @Post()
  async create(@Body() body: AdminCreateUserDto): Promise<SuccessResponseDto> {
    return await this.adminUserService.create(body);
  }
}
