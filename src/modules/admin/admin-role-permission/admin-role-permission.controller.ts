import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { AdminRolePermissionService } from './admin-role-permission.service';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Role } from 'src/decorators/role.decorator';
import { RoleType } from 'src/common/enum/role.enum';
import { AdminListRolePermissionQueryDto } from './dto/request/list-role-permission-query.dto';
import { AdminListRolePermissionResponseDto } from './dto/response/admin-list-role-permission-response.dto';
import { SuccessResponseDto } from 'src/common/dto/success-response.dto';
import { UpdateRolePermissionDto } from './dto/request/update-role-permission.dto';

@ApiTags('ADMIN ROLE PERMISSION')
@Role([RoleType.ADMIN])
@ApiBearerAuth()
@Controller('admin-role-permission')
export class AdminRolePermissionController {
  constructor(private readonly adminRolePermissionService: AdminRolePermissionService) {}

  @ApiOperation({ summary: 'ADMIN FIND ALL ROLE PERMISSION' })
  @ApiResponse({ status: 200, type: AdminListRolePermissionResponseDto })
  @Get()
  async findAll(
    @Query() query: AdminListRolePermissionQueryDto,
  ): Promise<AdminListRolePermissionResponseDto> {
    return await this.adminRolePermissionService.findAll(query);
  }

  @ApiOperation({ summary: 'ADMIN UPDATE LIST ROLE PERMISSION' })
  @ApiResponse({ status: 200, type: SuccessResponseDto })
  @ApiBody({ type: UpdateRolePermissionDto, isArray: true })
  @Post()
  async updateList(@Body() body: UpdateRolePermissionDto[]): Promise<SuccessResponseDto> {
    return await this.adminRolePermissionService.updateList(body);
  }
}
