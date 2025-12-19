import { Body, Controller, Get, Param, Patch, Post, Put, Query } from '@nestjs/common';
import { AdminProductService } from './admin-product.service';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateProductDto } from 'src/modules/admin/admin-product/dto/request/create-product.dto';
import { Role } from 'src/decorators/role.decorator';
import { RoleType } from 'src/common/enum/role.enum';
import { SuccessResponseDto } from 'src/common/dto/success-response.dto';
import { CreateVariantDto } from 'src/modules/admin/admin-product/dto/request/create-variant.dto';
import { ListVariantResponseDto } from 'src/modules/admin/admin-product/dto/response/list-variant-response.dto';
import { VariantQueryDto } from 'src/modules/admin/admin-product/dto/request/variant-query.dto';
import { CreateVariantValueDto } from 'src/modules/admin/admin-product/dto/request/create-variant-value.dto';
import { ListVariantValueResponseDto } from 'src/modules/admin/admin-product/dto/response/list-variant-value-response.dto';
import { VariantValueQueryDto } from 'src/modules/admin/admin-product/dto/request/variant-value-query.dto';
import { ListProductResponseDto } from 'src/modules/admin/admin-product/dto/response/list-product-response.dto';
import { ListProductQueryDto } from 'src/modules/admin/admin-product/dto/request/list-product-query.dto';
import { AdminProductDetailResponseDto } from 'src/modules/admin/admin-product/dto/response/product-detail-response.dto';
import { UpdateProductDto } from './dto/request/update-product.dto';
import { UpdateProductStatusDto } from './dto/request/update-product-status.dto';
import { SaveUuidResponseDto } from 'src/common/dto/save-response.dto';
import { UploadResponseDto } from 'src/common/dto/upload-response.dto';
import { UploadDto } from 'src/common/dto/upload.dto';
import { ActionPermission, RolePermission } from 'src/decorators/role-permission.decorator';
import { ModuleEnum } from 'src/common/enum/module.enum';

@ApiTags('[ADMIN] PRODUCT MANAGEMENT')
@ApiBearerAuth()
@Role([RoleType.ADMIN, RoleType.ORDER_MANAGER, RoleType.PRODUCT_MANAGER, RoleType.TECHNICIAN])
@Controller('admin/product')
export class AdminProductController {
  constructor(private readonly adminProductService: AdminProductService) {}

  @RolePermission({ module: ModuleEnum.PRODUCT, permission: ActionPermission.CREATE })
  @ApiOperation({ summary: '[ADMIN] CREATE PRODUCT' })
  @ApiResponse({ status: 201, type: SaveUuidResponseDto })
  @Post('')
  async create(@Body() body: CreateProductDto): Promise<SaveUuidResponseDto> {
    return await this.adminProductService.create(body);
  }

  @RolePermission({ module: ModuleEnum.PRODUCT, permission: ActionPermission.READ })
  @ApiOperation({ summary: '[ADMIN] FIND LIST PRODUCT' })
  @ApiResponse({ status: 200, type: ListProductResponseDto })
  @Get('')
  async findAll(@Query() query: ListProductQueryDto): Promise<ListProductResponseDto> {
    return await this.adminProductService.findAll(query);
  }

  @RolePermission({ module: ModuleEnum.PRODUCT, permission: ActionPermission.CREATE })
  @ApiOperation({ summary: '[ADMIN] FIND ONE PRODUCT BY ID' })
  @ApiResponse({ status: 200, type: AdminProductDetailResponseDto })
  @Get('/:id')
  async findOne(@Param('id') id: string): Promise<AdminProductDetailResponseDto> {
    return await this.adminProductService.findOne(id);
  }

  @RolePermission({ module: ModuleEnum.PRODUCT, permission: ActionPermission.UPDATE })
  @ApiOperation({ summary: '[ADMIN] UPDATE PRODUCT BY ID' })
  @ApiResponse({ status: 200, type: SuccessResponseDto })
  @Put('/:id')
  async update(
    @Param('id') id: string,
    @Body() body: UpdateProductDto,
  ): Promise<SuccessResponseDto> {
    return await this.adminProductService.update(id, body);
  }

  @RolePermission({ module: ModuleEnum.PRODUCT, permission: ActionPermission.UPDATE })
  @ApiOperation({ summary: '[ADMIN] UPDATE PRODUCT STATUS BY ID' })
  @ApiResponse({ status: 200, type: SaveUuidResponseDto })
  @Patch('/:id')
  async updateStatus(
    @Param('id') id: string,
    @Body() body: UpdateProductStatusDto,
  ): Promise<SaveUuidResponseDto> {
    return await this.adminProductService.updateStatus(id, body);
  }

  @RolePermission({ module: ModuleEnum.PRODUCT, permission: ActionPermission.CREATE })
  @ApiOperation({ summary: '[ADMIN] GET PRESIGN UPLOAD PRODUCT IMAGE' })
  @ApiResponse({ status: 200, type: UploadResponseDto })
  @Post('image/upload')
  async uploadProductImage(@Body() body: UploadDto): Promise<UploadResponseDto> {
    return await this.adminProductService.uploadProductImage(body);
  }

  @RolePermission({ module: ModuleEnum.PRODUCT, permission: ActionPermission.CREATE })
  @ApiOperation({ summary: '[ADMIN] CREATE VARIANT' })
  @ApiResponse({ status: 201, type: SuccessResponseDto })
  @Post('option/variant')
  async createVariant(@Body() body: CreateVariantDto): Promise<SuccessResponseDto> {
    return await this.adminProductService.createVariant(body);
  }

  @RolePermission({ module: ModuleEnum.PRODUCT, permission: ActionPermission.READ })
  @ApiOperation({ summary: '[ADMIN] GET LIST VARIANT' })
  @ApiResponse({ status: 200, type: ListVariantResponseDto })
  @Get('option/variant')
  async findAllVariant(@Query() query: VariantQueryDto): Promise<ListVariantResponseDto> {
    return await this.adminProductService.findAllVariant(query);
  }

  @RolePermission({ module: ModuleEnum.PRODUCT, permission: ActionPermission.CREATE })
  @ApiOperation({ summary: '[ADMIN] CREATE VARIANT VALUE BY VARIANT ID' })
  @ApiResponse({ status: 201, type: SuccessResponseDto })
  @Post('option/variant-value')
  async createVariantValue(@Body() body: CreateVariantValueDto): Promise<SuccessResponseDto> {
    return await this.adminProductService.createVariantValue(body);
  }

  @RolePermission({ module: ModuleEnum.PRODUCT, permission: ActionPermission.READ })
  @ApiOperation({ summary: '[ADMIN] GET LIST VARIANT VALUE' })
  @ApiResponse({ status: 200, type: ListVariantValueResponseDto })
  @Get('option/variant-value')
  async findAllVariantValue(
    @Query() query: VariantValueQueryDto,
  ): Promise<ListVariantValueResponseDto> {
    return await this.adminProductService.findAllVariantValue(query);
  }
}
