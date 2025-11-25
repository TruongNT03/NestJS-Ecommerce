import { Controller, Get, Param, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FindAllProductQueryDto } from 'src/modules/product/dto/request/find-all-product-query.dto';
import { ListUserProductResponseDto } from 'src/modules/product/dto/response/list-user-product-response.dto';
import { Public } from 'src/decorators/public.decorator';
import { ProductDetailResponseDto } from './dto/response/product-detail-response.dto';
import { ProductVariantValueResponseDto } from './dto/response/product-variant-value.response.dto';

@ApiTags('[USER] PRODUCT')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @ApiOperation({ summary: '[USER] FIND ALL PRODUCT' })
  @ApiResponse({ status: 200, type: ListUserProductResponseDto })
  @Public()
  @Get('')
  async findAll(
    @Query() query: FindAllProductQueryDto,
  ): Promise<ListUserProductResponseDto> {
    return await this.productService.findAll(query);
  }

  @ApiOperation({ summary: '[USER] FIND ONE PRODUCT' })
  @ApiResponse({ status: 200, type: ProductDetailResponseDto })
  @Public()
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ProductDetailResponseDto> {
    return await this.productService.findOne(id);
  }

  @ApiOperation({ summary: '[USER] GET VARIANT VALUE OF PRODUCT' })
  @ApiResponse({ status: 200, type: [ProductVariantValueResponseDto] })
  @Public()
  @Get(':id/variant-value')
  async getProductVariantValue(
    @Param('id') id: string,
  ): Promise<ProductVariantValueResponseDto[]> {
    return await this.productService.getProductVariantValue(id);
  }
}
