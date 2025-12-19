import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { AdminLocationService } from './admin-location.service';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Role } from 'src/decorators/role.decorator';
import { RoleType } from 'src/common/enum/role.enum';
import { SuccessResponseDto } from 'src/common/dto/success-response.dto';
import { AdminCreateLocationDto } from './dto/request/admin-create-location-response.dto';
import { AdminListLocationResponseDto } from './dto/response/admin-list-location-response.dto';
import { AdminListLocationQueryDto } from './dto/request/admin-list-location-query.dto';
import { AdminUpdateLocationDto } from './dto/request/admin-update-location.dto';
import { ActionPermission, RolePermission } from 'src/decorators/role-permission.decorator';
import { ModuleEnum } from 'src/common/enum/module.enum';

@ApiTags('ADMIN LOCATION')
@ApiBearerAuth()
@Role([RoleType.ADMIN, RoleType.ORDER_MANAGER, RoleType.PRODUCT_MANAGER, RoleType.TECHNICIAN])
@Controller('admin-location')
export class AdminLocationController {
  constructor(private readonly adminLocationService: AdminLocationService) {}

  @RolePermission({ module: ModuleEnum.LOCATION, permission: ActionPermission.CREATE })
  @ApiOperation({ summary: '[ADMIN] CREATE LOCATION' })
  @ApiResponse({ status: 200, type: SuccessResponseDto })
  @Post()
  async create(@Body() body: AdminCreateLocationDto): Promise<SuccessResponseDto> {
    return await this.adminLocationService.create(body);
  }

  @RolePermission({ module: ModuleEnum.LOCATION, permission: ActionPermission.READ })
  @ApiOperation({ summary: '[ADMIN] FIND ALL LOCATION' })
  @ApiResponse({ status: 200, type: AdminListLocationResponseDto })
  @Get()
  async findAll(@Query() query: AdminListLocationQueryDto): Promise<AdminListLocationResponseDto> {
    return await this.adminLocationService.findAll(query);
  }

  @RolePermission({ module: ModuleEnum.LOCATION, permission: ActionPermission.UPDATE })
  @ApiOperation({ summary: '[ADMIN] UPDATE LOCATION' })
  @ApiResponse({ status: 200, type: SuccessResponseDto })
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() body: AdminUpdateLocationDto,
  ): Promise<SuccessResponseDto> {
    return await this.adminLocationService.update(id, body);
  }
}
