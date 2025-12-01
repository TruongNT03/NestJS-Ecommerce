import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/base.service';
import {
  ListCategoryQueryDto,
  ListCategorySortField,
} from './dto/request/list-category-query.dto';
import { ListCategoryResponseDto } from './dto/response/list-category-response.dto';
import { Brackets, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Categories } from 'src/entities/categories.entity';
import { plainToInstance } from 'class-transformer';
import { CategoryResponseDto } from './dto/response/category-response.dto';

@Injectable()
export class CategoriesService extends BaseService {
  constructor(
    @InjectRepository(Categories)
    private readonly categoriesRepo: Repository<Categories>,
  ) {
    super();
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
