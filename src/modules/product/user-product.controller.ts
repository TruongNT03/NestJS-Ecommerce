import { Controller, Get, Query } from '@nestjs/common';
import { UserProductService } from './user-product.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FindAllProductQueryDto } from 'src/modules/product/dto/request/find-all-product-query.dto';
import { ListUserProductResponseDto } from 'src/modules/product/dto/response/list-user-product-response.dto';
import { Public } from 'src/decorators/public.decorator';

@ApiTags('[USER] PRODUCT')
@Controller('product')
export class UserProductController {
  constructor(private readonly userProductService: UserProductService) {}

  @ApiOperation({ summary: '[USER] FIND ALL PRODUCT' })
  @ApiResponse({ status: 200, type: ListUserProductResponseDto })
  @Public()
  @Get('')
  async findAll(
    @Query() query: FindAllProductQueryDto,
  ): Promise<ListUserProductResponseDto> {
    return await this.userProductService.findAll(query);
  }
}
