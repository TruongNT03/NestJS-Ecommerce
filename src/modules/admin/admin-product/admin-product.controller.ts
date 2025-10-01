import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
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
import { async } from 'rxjs';
import { CreateVariantValueDto } from 'src/modules/admin/admin-product/dto/request/create-variant-value.dto';
import { ListVariantValueResponseDto } from 'src/modules/admin/admin-product/dto/response/list-variant-value-response.dto';
import { VariantValueQueryDto } from 'src/modules/admin/admin-product/dto/request/variant-value-query.dto';
import { ListProductResponseDto } from 'src/modules/admin/admin-product/dto/response/list-product-response.dto';
import { ListProductQueryDto } from 'src/modules/admin/admin-product/dto/request/list-product-query.dto';
import { ProductDetailResponseDto } from 'src/modules/admin/admin-product/dto/response/product-detail-response.dto';
import { UpdateProductDto } from './dto/request/update-product.dto';

@ApiTags('[Admin] Product management')
@ApiBearerAuth()
@Role([RoleType.ADMIN])
@Controller('admin/product')
export class AdminProductController {
  constructor(private readonly adminProductService: AdminProductService) {}

  @ApiOperation({ summary: '[Admin] Create Product' })
  @ApiResponse({ status: 201, type: SuccessReponseDto })
  @Post('')
  async create(@Body() body: CreateProductDto): Promise<SuccessReponseDto> {
    return await this.adminProductService.create(body);
  }

  @ApiOperation({ summary: '[Admin] Find list product' })
  @ApiResponse({ status: 200, type: ListProductResponseDto })
  @Get('')
  async findAll(
    @Query() query: ListProductQueryDto,
  ): Promise<ListProductResponseDto> {
    return await this.adminProductService.findAll(query);
  }

  @ApiOperation({ summary: '[Admin] Find one product by Id' })
  @ApiResponse({ status: 200, type: ProductDetailResponseDto })
  @Get('/:id')
  async findOne(@Param('id') id: string): Promise<ProductDetailResponseDto> {
    return await this.adminProductService.findOne(id);
  }

  @ApiOperation({ summary: '[Admin] Update product by Id' })
  @ApiResponse({ status: 200, type: SuccessReponseDto })
  @Patch('/:id')
  async update(
    @Param('id') id: string,
    @Body() body: UpdateProductDto,
  ): Promise<SuccessReponseDto> {
    return await this.adminProductService.update(id, body);
  }

  @ApiOperation({ summary: '[Admin] Create Variant' })
  @ApiResponse({ status: 201, type: SuccessReponseDto })
  @Post('variant')
  async createVariant(
    @Body() body: CreateVariantDto,
  ): Promise<SuccessReponseDto> {
    return await this.adminProductService.createVariant(body);
  }

  @ApiOperation({ summary: '[Admin] Get list Variant' })
  @ApiResponse({ status: 200, type: ListVariantResponseDto })
  @Get('variant')
  async findAllVariant(
    @Query() query: VariantQueryDto,
  ): Promise<ListVariantResponseDto> {
    return await this.adminProductService.findAllVariant(query);
  }

  @ApiOperation({ summary: '[Admin] Create Variant Value by Variant Id' })
  @ApiResponse({ status: 201, type: SuccessReponseDto })
  @Post('variant-value')
  async createVariantValue(
    @Body() body: CreateVariantValueDto,
  ): Promise<SuccessReponseDto> {
    return await this.adminProductService.createVariantValue(body);
  }

  @ApiOperation({ summary: '[Admin] Get list Variant Value' })
  @ApiResponse({ status: 200, type: ListVariantValueResponseDto })
  @Get('variant-value')
  async findAllVariantValue(
    @Query() query: VariantValueQueryDto,
  ): Promise<ListVariantValueResponseDto> {
    return await this.adminProductService.findAllVariantValue(query);
  }
}
