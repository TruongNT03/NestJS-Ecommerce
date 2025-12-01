import { Controller, Get, Query } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ListCategoryResponseDto } from './dto/response/list-category-response.dto';
import { ListCategoryQueryDto } from './dto/request/list-category-query.dto';
import { Public } from 'src/decorators/public.decorator';

@ApiTags('[USER] CATEGORY')
@Controller('category')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @ApiOperation({ summary: '[USER] GET LIST CATEGORIES' })
  @ApiResponse({ type: ListCategoryResponseDto })
  @Public()
  @Get('')
  async findAll(
    @Query() query: ListCategoryQueryDto,
  ): Promise<ListCategoryResponseDto> {
    return await this.categoriesService.findAll(query);
  }
}
