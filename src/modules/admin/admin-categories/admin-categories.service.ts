import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/base.service';
import { Categories } from 'src/entities/categories.entity';
import { Brackets, Repository } from 'typeorm';
import { SaveCategoryDto } from './dto/resquest/save-category.dto';
import { SaveEntityResponseDto } from 'src/common/dto/save-entity-response.dto';
import {
  ListCategoryQueryDto,
  ListCategorySortField,
} from './dto/resquest/list-category-query.dto';
import { ListCategoryResponseDto } from './dto/response/list-category-response.dto';
import { plainToInstance } from 'class-transformer';
import { CategoryResponseDto } from './dto/response/category-response.dto';
import { UploadResponseDto } from 'src/common/dto/upload-reponse.dto';
import { UploadDto } from 'src/common/dto/upload.dto';
import { S3Service } from 'src/modules/shared/s3/s3.service';

@Injectable()
export class AdminCategoriesService extends BaseService {
  constructor(
    @InjectRepository(Categories)
    private readonly categoriesRepo: Repository<Categories>,
    private readonly s3Service: S3Service,
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
    return await this.queryBuilderGetAll(dto);
  }

  async queryBuilderGetAll(
    query: ListCategoryQueryDto,
  ): Promise<ListCategoryResponseDto> {
    const { page, pageSize, orderBy, search, sortBy } = query;
    const queryBuilder = this.categoriesRepo.createQueryBuilder('c');

    if (search) {
      queryBuilder.andWhere(
        new Brackets((qb) =>
          qb
            .andWhere('LOWER(c.title) LIKE :keyword', {
              keyword: `%${search.toLowerCase()}%`,
            })
            .orWhere('LOWER(c.description) LIKE :keyword', {
              keyword: `%${search.toLowerCase()}%`,
            }),
        ),
      );
    }

    const sortByFieldMapping: Record<ListCategorySortField, string> = {
      [ListCategorySortField.TITLE]: 'c.title',
      [ListCategorySortField.CREATED_AT]: 'c.createdAt',
    };

    const sortField = sortByFieldMapping[sortBy];

    if (sortField) {
      queryBuilder.orderBy(sortField, orderBy || 'DESC');
    } else {
      queryBuilder.orderBy('c.createdAt', 'DESC');
    }

    const { data, paginate } = await this.paginate(
      queryBuilder,
      page,
      pageSize,
    );

    return plainToInstance(ListCategoryResponseDto, {
      data: plainToInstance(CategoryResponseDto, data),
      paginate,
    });
  }
}
