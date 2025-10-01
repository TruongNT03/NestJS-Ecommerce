import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { AdminCategoriesService } from './admin-categories.service';
import { Role } from 'src/decorators/role.decorator';
import { RoleType } from 'src/common/enum/role.enum';
import { SaveCategoryDto } from './dto/resquest/save-category.dto';
import { SaveEntityResponseDto } from 'src/common/dto/save-entity-response.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ListCategoryResponseDto } from './dto/response/list-category-response.dto';
import { ListCategoryQueryDto } from './dto/resquest/list-category-query.dto';
import { UploadResponseDto } from 'src/common/dto/upload-reponse.dto';
import { UploadDto } from 'src/common/dto/upload.dto';

@ApiTags('[Admin] Categories managemant')
@ApiBearerAuth()
@Role([RoleType.ADMIN])
@Controller('admin/categories')
export class AdminCategoriesController {
  constructor(
    private readonly adminCategoriesService: AdminCategoriesService,
  ) {}

  @ApiOperation({ summary: '[Admin] Create category' })
  @ApiResponse({ type: SaveEntityResponseDto })
  @Post('')
  async create(@Body() body: SaveCategoryDto): Promise<SaveEntityResponseDto> {
    return await this.adminCategoriesService.create(body);
  }

  @ApiOperation({ summary: '[Admin] Upload category image' })
  @ApiResponse({ type: UploadResponseDto })
  @Post('upload')
  async upload(@Body() body: UploadDto): Promise<UploadResponseDto> {
    return await this.adminCategoriesService.upload(body);
  }

  @ApiOperation({ summary: '[Admin] Get list categories' })
  @ApiResponse({ type: ListCategoryResponseDto })
  @Get('')
  async findAll(
    @Query() query: ListCategoryQueryDto,
  ): Promise<ListCategoryResponseDto> {
    return await this.adminCategoriesService.findAll(query);
  }
}
