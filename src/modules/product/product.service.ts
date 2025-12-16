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
import { ServerException } from 'src/exceptions/sever.exception';
import { ERROR_RESPONSE } from 'src/common/constants/error-response.constants';
import { ProductDetailResponseDto } from './dto/response/product-detail-response.dto';
import { ProductVariantValueResponseDto } from './dto/response/product-variant-value.response.dto';
import { ProductResponseDto } from './dto/response/product-response.dto';

@Injectable()
export class ProductService extends BaseService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,
  ) {
    super();
  }
  async findAll(query: FindAllProductQueryDto): Promise<ListUserProductResponseDto> {
    return await this.queryFindAll(query);
  }

  private async queryFindAll(query: FindAllProductQueryDto): Promise<ListUserProductResponseDto> {
    const { page, pageSize, categoryIds, search, sortOrder, sortBy, lowPrice, highPrice } = query;

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

    const { data, paginate } = await this.paginate(queryBuilder, page, pageSize);

    return plainToInstance(ListUserProductResponseDto, {
      data: data.map((item) => ({
        ...item,
        price: item.productVariants.length
          ? Math.min(...item.productVariants.map((variant) => variant.price))
          : 0,
      })),
      paginate,
    });
  }

  async findOne(id: string): Promise<ProductDetailResponseDto> {
    const product = this.productRepo.findOneBy({ id });
    if (!product) {
      throw new ServerException(ERROR_RESPONSE.NOT_FOUND);
    }
    const data = await this.queryBuilderFindOne(id).getOne();

    const totalStock = data.productVariants
      .map((productVariant) => productVariant.stock)
      .reduce((sum, value) => (sum += value));

    const rating = data.reviews.reduce((prev, currentValue) => (prev += currentValue.rating), 0);

    return plainToInstance(ProductDetailResponseDto, {
      ...data,
      totalRating: data.reviews.length,
      averageRating: rating / data.reviews.length,
      totalStock,
    });
  }

  private queryBuilderFindOne(id: string) {
    const queryBuilder = this.productRepo
      .createQueryBuilder('p')
      .leftJoinAndSelect('p.productImages', 'i')
      .leftJoinAndSelect('p.productVariants', 'pv')
      .leftJoinAndSelect('p.categories', 'c')
      .leftJoinAndSelect('pv.variantValues', 'vv')
      .leftJoinAndSelect('vv.variant', 'v')
      .leftJoinAndSelect('p.reviews', 'review')
      .where('p.id = :id', { id });

    return queryBuilder;
  }

  async getProductVariantValue(id: string): Promise<ProductVariantValueResponseDto[]> {
    const data = await this.queryBuilderFindOne(id).getOne();

    const record: Record<string, Set<string>> = {};

    data.productVariants.map((productVariant) =>
      productVariant.variantValues.map((variantValue) => {
        if (!record[variantValue.variant.name]) {
          record[variantValue.variant.name] = new Set();
        }
        record[variantValue.variant.name].add(variantValue.value);
      }),
    );

    const sizeOrder = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'];

    const result = Object.entries(record).map(([variant, value]) => ({
      variant,
      value:
        variant === 'Size'
          ? [...Array.from(value)].sort((a, b) => sizeOrder.indexOf(a) - sizeOrder.indexOf(b))
          : [...Array.from(value)].sort((a, b) => a.localeCompare(b)),
    }));

    return plainToInstance(ProductVariantValueResponseDto, result);
  }
}
