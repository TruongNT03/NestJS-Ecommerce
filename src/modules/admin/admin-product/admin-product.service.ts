import { Injectable } from '@nestjs/common';
import { CreateProductDto } from 'src/modules/admin/admin-product/dto/request/create-product.dto';
import { CreateVariantDto } from 'src/modules/admin/admin-product/dto/request/create-variant.dto';
import { SuccessReponseDto } from 'src/common/dto/success-response.dto';
import { BaseService } from 'src/base.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Variant } from 'src/entities/variant.entity';
import { DataSource, In, Repository } from 'typeorm';
import { VariantQueryDto } from 'src/modules/admin/admin-product/dto/request/variant-query.dto';
import { ListVariantResponseDto } from 'src/modules/admin/admin-product/dto/response/list-variant-response.dto';
import { plainToInstance } from 'class-transformer';
import { VariantResponseDto } from 'src/modules/admin/admin-product/dto/response/variant-response.dto';
import { CreateVariantValueDto } from 'src/modules/admin/admin-product/dto/request/create-variant-value.dto';
import { VariantValue } from 'src/entities/variant-value.entity';
import { VariantValueQueryDto } from 'src/modules/admin/admin-product/dto/request/variant-value-query.dto';
import { ListVariantValueResponseDto } from 'src/modules/admin/admin-product/dto/response/list-variant-value-response.dto';
import { VariantValueResponseDto } from 'src/modules/admin/admin-product/dto/response/variant-value-response.dto';
import { Product } from 'src/entities/product.entity';
import { ProductVariant } from 'src/entities/product-variant.entity';
import { ServerException } from 'src/exceptions/sever.exception';
import { ERROR_RESPONSE } from 'src/common/constants/error-response.constants';
import { Categories } from 'src/entities/categories.entity';
import { ListProductQueryDto } from 'src/modules/admin/admin-product/dto/request/list-product-query.dto';
import { ListProductResponseDto } from 'src/modules/admin/admin-product/dto/response/list-product-response.dto';
import { ProductDetailResponseDto } from 'src/modules/admin/admin-product/dto/response/product-detail-response.dto';
import { UpdateProductDto } from './dto/request/update-product.dto';
import { ProductCategories } from 'src/entities/product-categories.entity';

@Injectable()
export class AdminProductService extends BaseService {
  constructor(
    @InjectRepository(Variant)
    private readonly variantRepo: Repository<Variant>,
    @InjectRepository(VariantValue)
    private readonly variantValueRepo: Repository<VariantValue>,
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,
    @InjectRepository(ProductVariant)
    private readonly productVariantRepo: Repository<ProductVariant>,
    private readonly datasource: DataSource,
  ) {
    super();
  }
  async create(dto: CreateProductDto): Promise<SuccessReponseDto> {
    const {
      name,
      description,
      price,
      stock,
      sku,
      imageUrls,
      hasVariant,
      productVariants,
      categoryIds,
    } = dto;
    const queryRunner = this.datasource.createQueryRunner();
    await queryRunner.startTransaction();
    try {
      // Create Product
      const product = await queryRunner.manager.save(Product, {
        name,
        description,
        hasVariant,
      });

      // Find list Category
      const productCategories = categoryIds.map((i) => ({
        categoryId: i,
        productId: product.id,
      }));

      // Create Product-Category join table
      await queryRunner.manager.save(ProductCategories, productCategories);

      // Create Product Image
      // ...

      // Create Product Variant have not variant
      if (!hasVariant && price && stock) {
        await queryRunner.manager.save(ProductVariant, {
          productId: product.id,
          price,
          stock,
          sku,
        });
      }

      // Create Product Variants
      if (productVariants && productVariants?.length && hasVariant) {
        await Promise.all(
          productVariants.map(async (productVariant) => {
            // Find list Variant Values
            const variantValues = await queryRunner.manager.find(VariantValue, {
              where: {
                id: In(productVariant.variantValueIds),
              },
            });

            // Create Product Variant
            await queryRunner.manager.save(ProductVariant, {
              productId: product.id,
              price: productVariant.price,
              stock: productVariant.stock,
              sku: productVariant.sku,
              variantValues: variantValues,
            });
          }),
        );
      }
      await queryRunner.commitTransaction();
      return this.suceesResponse();
    } catch (error) {
      console.error(error);
      this.logger.error(error?.message, {
        context: 'adminProductService.create',
        details: error,
      });
      await queryRunner.rollbackTransaction();
      throw new ServerException(ERROR_RESPONSE.BAD_REQUEST);
    } finally {
      await queryRunner.release();
    }
  }

  async findAll(query: ListProductQueryDto): Promise<ListProductResponseDto> {
    const { page, pageSize } = query;

    const queryBuilder = await this.getQueryBuilderFindAllProduct(query);

    const { data, paginate } = await this.paginate(
      queryBuilder,
      page,
      pageSize,
    );

    return plainToInstance(ListProductResponseDto, {
      data,
      paginate,
    });
  }

  private async getQueryBuilderFindAllProduct(query: ListProductQueryDto) {
    const { categoriesIds } = query;

    const queryBuilder = this.productRepo
      .createQueryBuilder('p')
      .leftJoinAndSelect('p.categories', 'pc')
      .leftJoinAndSelect('p.productVariants', 'pv')
      .leftJoinAndSelect('pv.variantValues', 'variantValues')
      .leftJoinAndSelect('variantValues.variant', 'variant');

    if (categoriesIds && categoriesIds.length) {
      queryBuilder.andWhere('pc.id IN (:...categoriesIds)', { categoriesIds });
    }

    queryBuilder.orderBy('p.updatedAt', 'DESC');
    return queryBuilder;
  }

  async createVariant(dto: CreateVariantDto): Promise<SuccessReponseDto> {
    const { name } = dto;
    await this.variantRepo.save({
      name,
    });
    return this.suceesResponse();
  }

  async findAllVariant(
    query: VariantQueryDto,
  ): Promise<ListVariantResponseDto> {
    const { page, pageSize, keyword } = query;
    const queryBuilder = this.variantRepo.createQueryBuilder('v');
    if (keyword) {
      queryBuilder.andWhere('LOWER(v.name) LIKE :keyword', {
        keyword: `%${keyword.toLowerCase()}%`,
      });
    }
    const { data, paginate } = await this.paginate(
      queryBuilder,
      page,
      pageSize,
    );
    return plainToInstance(ListVariantResponseDto, {
      data: plainToInstance(VariantResponseDto, data),
      paginate,
    });
  }

  async findOne(id: string): Promise<ProductDetailResponseDto> {
    const queryBuilder = this.productRepo
      .createQueryBuilder('p')
      .leftJoinAndSelect('p.categories', 'pc')
      .leftJoinAndSelect('p.productVariants', 'pv')
      .leftJoinAndSelect('pv.variantValues', 'vv')
      .leftJoinAndSelect('vv.variant', 'v')
      .where('p.id = :id', { id });

    const product = await queryBuilder.getOne();
    return plainToInstance(ProductDetailResponseDto, product, {
      excludeExtraneousValues: true,
    });
  }

  async update(id: string, dto: UpdateProductDto): Promise<SuccessReponseDto> {
    const { name, description, categoryIds, productVariants } = dto;

    const queryRunner = this.datasource.createQueryRunner();
    await queryRunner.startTransaction();

    const product = await queryRunner.manager.findOne(Product, {
      where: { id },
      relations: ['categories'],
    });

    if (!product) {
      throw new ServerException({
        ...ERROR_RESPONSE.USER_NOT_FOUND,
        message: 'Product not found',
      });
    }

    try {
      // Update base field
      await queryRunner.manager.update(
        Product,
        { id },
        {
          name,
          description,
        },
      );

      // Update categories
      if (categoryIds && categoryIds.length) {
        // Delete old categories link with product
        await queryRunner.manager.delete(ProductCategories, {
          productId: product.id,
        });

        // Create new Product Category
        await Promise.all(
          categoryIds.map(async (categoryId) => {
            await queryRunner.manager.save(ProductCategories, {
              categoryId: categoryId,
              productId: product.id,
            });
          }),
        );
      }

      // Update Product Variants
      if (productVariants && productVariants.length) {
        await Promise.all(
          productVariants.map(async (pv) => {
            // Find Variant Values
            const variantValues = await queryRunner.manager.find(VariantValue, {
              where: { id: In(pv.variantValueIds) },
            });

            // Find Product Variant by Id
            const productVariant = await queryRunner.manager.findOne(
              ProductVariant,
              { where: { id: pv.id } },
            );

            // Update Product Variant
            productVariant.price = pv.price;
            productVariant.sku = pv.sku;
            productVariant.stock = pv.stock;
            productVariant.variantValues = variantValues;

            // Save Product Variant
            await queryRunner.manager.save(productVariant);
          }),
        );
      }

      await queryRunner.commitTransaction();
      return this.suceesResponse();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new Error(error);
    } finally {
      await queryRunner.release();
    }
  }

  async createVariantValue(
    dto: CreateVariantValueDto,
  ): Promise<SuccessReponseDto> {
    const { value, variantId } = dto;
    await this.variantValueRepo.save({
      value,
      variantId,
    });
    return this.suceesResponse();
  }

  async findAllVariantValue(
    query: VariantValueQueryDto,
  ): Promise<ListVariantValueResponseDto> {
    const { variantId, keyword, pageSize, page } = query;

    const queryBuilder = this.variantValueRepo
      .createQueryBuilder('rv')
      .leftJoinAndSelect('rv.variant', 'v')
      .where('rv.variantId = :variantId', { variantId });

    if (keyword) {
      queryBuilder.andWhere('LOWER(rv.value) LIKE :keyword', {
        keyword: `%${keyword.toLowerCase()}%`,
      });
    }
    const { data, paginate } = await this.paginate(
      queryBuilder,
      page,
      pageSize,
    );
    return plainToInstance(ListVariantValueResponseDto, {
      data: plainToInstance(VariantValueResponseDto, data),
      paginate,
    });
  }
}
