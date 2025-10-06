import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { AdminProductService } from './admin-product.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateProductDto } from 'src/modules/admin/admin-product/dto/request/create-product.dto';
import { Role } from 'src/decorators/role.decorator';
import { RoleType } from 'src/common/enum/role.enum';
import { SuccessReponseDto } from 'src/common/dto/success-response.dto';
import { CreateVariantDto } from 'src/modules/admin/admin-product/dto/request/create-variant.dto';
import { ListVariantResponseDto } from 'src/modules/admin/admin-product/dto/response/list-variant-response.dto';
import { VariantQueryDto } from 'src/modules/admin/admin-product/dto/request/variant-query.dto';
import { CreateVariantValueDto } from 'src/modules/admin/admin-product/dto/request/create-variant-value.dto';
import { ListVariantValueResponseDto } from 'src/modules/admin/admin-product/dto/response/list-variant-value-response.dto';
import { VariantValueQueryDto } from 'src/modules/admin/admin-product/dto/request/variant-value-query.dto';
import { ListProductResponseDto } from 'src/modules/admin/admin-product/dto/response/list-product-response.dto';
import { ListProductQueryDto } from 'src/modules/admin/admin-product/dto/request/list-product-query.dto';
import { ProductDetailResponseDto } from 'src/modules/admin/admin-product/dto/response/product-detail-response.dto';
import { UpdateProductDto } from './dto/request/update-product.dto';
import { UpdateProductStatusDto } from './dto/request/update-product-status.dto';
import { SaveUuidResponseDto } from 'src/common/dto/save-response.dto';
import { UploadResponseDto } from 'src/common/dto/upload-reponse.dto';
import { UploadDto } from 'src/common/dto/upload.dto';

@ApiTags('[ADMIN] PRODUCT MANAGEMENT')
@ApiBearerAuth()
@Role([RoleType.ADMIN])
@Controller('admin/product')
export class AdminProductController {
  constructor(private readonly adminProductService: AdminProductService) {}

  @ApiOperation({ summary: '[ADMIN] CREATE PRODUCT' })
  @ApiResponse({ status: 201, type: SaveUuidResponseDto })
  @Post('')
  async create(@Body() body: CreateProductDto): Promise<SaveUuidResponseDto> {
    return await this.adminProductService.create(body);
  }

  @ApiOperation({ summary: '[ADMIN] FIND LIST PRODUCT' })
  @ApiResponse({ status: 200, type: ListProductResponseDto })
  @Get('')
  async findAll(
    @Query() query: ListProductQueryDto,
  ): Promise<ListProductResponseDto> {
    return await this.adminProductService.findAll(query);
  }

  @ApiOperation({ summary: '[ADMIN] FIND ONE PRODUCT BY ID' })
  @ApiResponse({ status: 200, type: ProductDetailResponseDto })
  @Get('/:id')
  async findOne(@Param('id') id: string): Promise<ProductDetailResponseDto> {
    return await this.adminProductService.findOne(id);
  }

  @ApiOperation({ summary: '[ADMIN] UPDATE PRODUCT BY ID' })
  @ApiResponse({ status: 200, type: SuccessReponseDto })
  @Put('/:id')
  async update(
    @Param('id') id: string,
    @Body() body: UpdateProductDto,
  ): Promise<SuccessReponseDto> {
    return await this.adminProductService.update(id, body);
  }

  @ApiOperation({ summary: '[ADMIN] UPDATE PRODUCT STATUS BY ID' })
  @ApiResponse({ status: 200, type: SaveUuidResponseDto })
  @Patch('/:id')
  async updateStatus(
    @Param('id') id: string,
    @Body() body: UpdateProductStatusDto,
  ): Promise<SaveUuidResponseDto> {
    return await this.adminProductService.updateStatus(id, body);
  }

  @ApiOperation({ summary: '[ADMIN] GET PRESIGN UPLOAD PRODUCT IMAGE' })
  @ApiResponse({ status: 200, type: UploadResponseDto })
  @Post('image/upload')
  async uploadProductImage(
    @Body() body: UploadDto,
  ): Promise<UploadResponseDto> {
    return await this.adminProductService.uploadProductImage(body);
  }

  @ApiOperation({ summary: '[ADMIN] CREATE VARIANT' })
  @ApiResponse({ status: 201, type: SuccessReponseDto })
  @Post('option/variant')
  async createVariant(
    @Body() body: CreateVariantDto,
  ): Promise<SuccessReponseDto> {
    return await this.adminProductService.createVariant(body);
  }

  @ApiOperation({ summary: '[ADMIN] GET LIST VARIANT' })
  @ApiResponse({ status: 200, type: ListVariantResponseDto })
  @Get('option/variant')
  async findAllVariant(
    @Query() query: VariantQueryDto,
  ): Promise<ListVariantResponseDto> {
    return await this.adminProductService.findAllVariant(query);
  }

  @ApiOperation({ summary: '[ADMIN] CREATE VARIANT VALUE BY VARIANT ID' })
  @ApiResponse({ status: 201, type: SuccessReponseDto })
  @Post('option/variant-value')
  async createVariantValue(
    @Body() body: CreateVariantValueDto,
  ): Promise<SuccessReponseDto> {
    return await this.adminProductService.createVariantValue(body);
  }

  @ApiOperation({ summary: '[ADMIN] GET LIST VARIANT VALUE' })
  @ApiResponse({ status: 200, type: ListVariantValueResponseDto })
  @Get('option/variant-value')
  async findAllVariantValue(
    @Query() query: VariantValueQueryDto,
  ): Promise<ListVariantValueResponseDto> {
    return await this.adminProductService.findAllVariantValue(query);
  }
}
