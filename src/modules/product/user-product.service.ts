import { Injectable } from '@nestjs/common';
import {
  FindAllProductQueryDto,
  UserProductSortByField,
} from 'src/modules/product/dto/request/find-all-product-query.dto';
import { ListUserProductResponseDto } from 'src/modules/product/dto/response/list-user-product-response.dto';
import { plainToInstance } from 'class-transformer';
import { Brackets, Repository } from 'typeorm';
import { Product } from 'src/entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductStatus } from 'src/common/enum/product-status.enum';
import { BaseService } from 'src/base.service';

@Injectable()
export class UserProductService extends BaseService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,
  ) {
    super();
  }
  async findAll(
    query: FindAllProductQueryDto,
  ): Promise<ListUserProductResponseDto> {
    return await this.queryFindAll(query);
  }

  private async queryFindAll(
    query: FindAllProductQueryDto,
  ): Promise<ListUserProductResponseDto> {
    const {
      page,
      pageSize,
      categoryIds,
      search,
      sortOrder,
      sortBy,
      lowPrice,
      highPrice,
    } = query;

    const queryBuilder = this.productRepo
      .createQueryBuilder('p')
      .leftJoinAndSelect('p.categories', 'c')
      .leftJoinAndSelect('p.productImages', 'pi')
      .leftJoinAndSelect('p.productVariants', 'pv')
      .leftJoinAndSelect('pv.variantValues', 'vv')
      .leftJoinAndSelect('vv.variant', 'variant')
      .addSelect((subQuery) => {
        return subQuery
          .select('MIN(pv2.price)', 'price')
          .from('product_variants', 'pv2')
          .where('pv2.product_id = p.id');
      }, 'price')
      .where('p.status = :status', { status: ProductStatus.PUBLISHED });

    if (categoryIds && categoryIds.length) {
      queryBuilder.andWhere('c.id IN (:...categoryIds)', { categoryIds });
    }

    if (search) {
      queryBuilder.andWhere(
        new Brackets((qb) => {
          qb.where('LOWER(p.name) LIKE :keyword', {
            keyword: `%${search.toLowerCase()}%`,
          }).orWhere('LOWER(p.description) LIKE :keyword', {
            keyword: `%${search.toLowerCase()}%`,
          });
        }),
      );
    }

    if (lowPrice && highPrice) {
      queryBuilder.andWhere('price BETWEEN :lowPrice AND :highPrice', {
        lowPrice,
        highPrice,
      });
    }

    const sortFieldMap: Record<UserProductSortByField, string> = {
      [UserProductSortByField.NAME]: 'p.name',
      [UserProductSortByField.CREATED_AT]: 'p.createdAt',
      [UserProductSortByField.UPDATED_AT]: 'p.updatedAt',
      [UserProductSortByField.PRICE]: 'price',
    };

    const sortField = sortFieldMap[sortBy];
    if (sortBy) {
      sortOrder
        ? queryBuilder.orderBy(sortField, sortOrder)
        : queryBuilder.orderBy(sortField, 'ASC');
    } else {
      queryBuilder.orderBy('p.createdAt', 'ASC');
    }

    const { data, paginate } = await this.paginate(
      queryBuilder,
      page,
      pageSize,
    );

    return plainToInstance(ListUserProductResponseDto, {
      data,
      paginate,
    });
  }
}
