import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/base.service';
import { Categories } from 'src/entities/categories.entity';
import { Repository } from 'typeorm';
import { SaveCategoryDto } from './dto/resquest/save-category.dto';
import { SaveEntityResponseDto } from 'src/common/dto/save-entity-response.dto';
import { ListCategoryQueryDto } from '../../categories/dto/request/list-category-query.dto';
import { ListCategoryResponseDto } from '../../categories/dto/response/list-category-response.dto';
import { UploadResponseDto } from 'src/common/dto/upload-response.dto';
import { UploadDto } from 'src/common/dto/upload.dto';
import { S3Service } from 'src/modules/shared/s3/s3.service';
import { CategoriesService } from 'src/modules/categories/categories.service';

@Injectable()
export class AdminCategoriesService extends BaseService {
  constructor(
    @InjectRepository(Categories)
    private readonly categoriesRepo: Repository<Categories>,
    private readonly s3Service: S3Service,
    private readonly categoryService: CategoriesService,
  ) {
    super();
  }

  async create(dto: SaveCategoryDto): Promise<SaveEntityResponseDto> {
    const { description, title, image } = dto;
    const category = await this.categoriesRepo.save({
      title,
      description,
      image,
    });
    return {
      id: category.id,
    };
  }

  async upload(dto: UploadDto): Promise<UploadResponseDto> {
    const { contentType, fileName } = dto;
    return await this.s3Service.getPresign(
      fileName,
      contentType,
      'category_images',
    );
  }

  async findAll(dto: ListCategoryQueryDto): Promise<ListCategoryResponseDto> {
    return await this.categoryService.findAll(dto);
  }
}
