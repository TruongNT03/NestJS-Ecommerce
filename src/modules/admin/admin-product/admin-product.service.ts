import { Inject, Injectable } from '@nestjs/common';
import { CreateProductDto } from 'src/modules/admin/admin-product/dto/request/create-product.dto';
import { CreateVariantDto } from 'src/modules/admin/admin-product/dto/request/create-variant.dto';
import { SuccessResponseDto } from 'src/common/dto/success-response.dto';
import { BaseService } from 'src/base.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Variant } from 'src/entities/variant.entity';
import { Brackets, DataSource, In, Not, Repository } from 'typeorm';
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
import {
  AdminProductSortField,
  ListProductQueryDto,
} from 'src/modules/admin/admin-product/dto/request/list-product-query.dto';
import { ListProductResponseDto } from 'src/modules/admin/admin-product/dto/response/list-product-response.dto';
import { AdminProductDetailResponseDto } from 'src/modules/admin/admin-product/dto/response/product-detail-response.dto';
import { UpdateProductDto } from './dto/request/update-product.dto';
import { UpdateProductStatusDto } from './dto/request/update-product-status.dto';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { ProductStatus } from 'src/common/enum/product-status.enum';
import { ProductCategories } from 'src/entities/product-categories.entity';
import { UpdateProductVariantDto } from './dto/request/update-product-variant.dto';
import { SaveUuidResponseDto } from 'src/common/dto/save-response.dto';
import { UploadDto } from 'src/common/dto/upload.dto';
import { UploadResponseDto } from 'src/common/dto/upload-response.dto';
import { S3Service } from 'src/modules/shared/s3/s3.service';
import { BucketFolder } from 'src/common/enum/bucket-folder.enum';
import { ProductImage } from 'src/entities/product-image.entity';

@Injectable()
export class AdminProductService extends BaseService {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER)
    private readonly logger: Logger,
    @InjectRepository(Variant)
    private readonly variantRepo: Repository<Variant>,
    @InjectRepository(VariantValue)
    private readonly variantValueRepo: Repository<VariantValue>,
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,
    @InjectRepository(ProductVariant)
    private readonly productVariantRepo: Repository<ProductVariant>,
    @InjectRepository(ProductImage)
    private readonly productImageRepo: Repository<ProductImage>,
    private readonly datasource: DataSource,
    private readonly s3Service: S3Service,
  ) {
    super();
  }
  async create(dto: CreateProductDto): Promise<SaveUuidResponseDto> {
    const {
      name,
      description,
      price,
      stock,
      sku,
      status,
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
        status,
      });

      // Create Product Category
      await Promise.all(
        categoryIds.map(async (categoryId) => {
          await queryRunner.manager.save(ProductCategories, {
            productId: product.id,
            categoryId: categoryId,
          });
        }),
      );

      // Create Product Image
      if (imageUrls && imageUrls.length) {
        Promise.all(
          imageUrls.map(async (imageUrl) => {
            await queryRunner.manager.save(ProductImage, {
              url: imageUrl,
              productId: product.id,
            });
          }),
        );
      }

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
            const variantValues = productVariant.variantValueIds?.map((id) => ({
              id,
            }));

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
      return this.saveUuidResponse(product.id);
    } catch (error) {
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

    const { data, paginate } = await this.paginate(queryBuilder, page, pageSize);

    return plainToInstance(ListProductResponseDto, {
      data,
      paginate,
    });
  }

  private async getQueryBuilderFindAllProduct(query: ListProductQueryDto) {
    const { categoriesIds, search, sortBy, sortOrder } = query;

    const queryBuilder = this.productRepo
      .createQueryBuilder('p')
      .leftJoinAndSelect('p.categories', 'pc')
      .leftJoinAndSelect('p.productImages', 'pi')
      .leftJoinAndSelect('p.productVariants', 'pv')
      .leftJoinAndSelect('pv.variantValues', 'variantValues')
      .leftJoinAndSelect('variantValues.variant', 'variant');

    if (categoriesIds && categoriesIds.length) {
      queryBuilder.andWhere('pc.id IN (:...categoriesIds)', { categoriesIds });
    }

    if (search) {
      queryBuilder.andWhere(
        new Brackets((qb) => {
          qb.where('LOWER(p.name) LIKE :search', {
            search: `%${search}%`,
          })
            .orWhere('LOWER(p.description) LIKE :search', {
              search: `%${search}%`,
            })
            .orWhere('LOWER(p.status) LIKE :search', {
              search: `%${search}%`,
            });
        }),
      );
    }

    const sortFieldMap: Record<AdminProductSortField, string> = {
      [AdminProductSortField.NAME]: 'p.name',
      [AdminProductSortField.DESCRIPTION]: 'p.description',
      [AdminProductSortField.STATUS]: 'p.status',
      [AdminProductSortField.CREATED_AT]: 'p.createdAt',
      [AdminProductSortField.UPDATED_AT]: 'p.updatedAt',
    };

    const sortField = sortFieldMap[sortBy];
    if (sortField) {
      if (sortOrder) {
        queryBuilder.orderBy(sortField, sortOrder);
      } else {
        queryBuilder.orderBy(sortField, 'DESC');
      }
    } else {
      queryBuilder.orderBy('p.createdAt', 'DESC');
    }
    return queryBuilder;
  }

  async createVariant(dto: CreateVariantDto): Promise<SuccessResponseDto> {
    const { name } = dto;
    await this.variantRepo.save({
      name,
    });
    return this.successResponse();
  }

  async findAllVariant(query: VariantQueryDto): Promise<ListVariantResponseDto> {
    const { page, pageSize, keyword } = query;
    const queryBuilder = this.variantRepo.createQueryBuilder('v');
    if (keyword) {
      queryBuilder.andWhere('LOWER(v.name) LIKE :keyword', {
        keyword: `%${keyword.toLowerCase()}%`,
      });
    }
    const { data, paginate } = await this.paginate(queryBuilder, page, pageSize);
    return plainToInstance(ListVariantResponseDto, {
      data: plainToInstance(VariantResponseDto, data),
      paginate,
    });
  }

  async findOne(id: string): Promise<AdminProductDetailResponseDto> {
    const queryBuilder = this.productRepo
      .createQueryBuilder('p')
      .leftJoinAndSelect('p.categories', 'pc')
      .leftJoinAndSelect('p.productImages', 'pi')
      .leftJoinAndSelect('p.productVariants', 'pv')
      .leftJoinAndSelect('pv.variantValues', 'vv')
      .leftJoinAndSelect('vv.variant', 'v')
      .where('p.id = :id', { id });

    const product = await queryBuilder.getOne();
    return plainToInstance(AdminProductDetailResponseDto, product);
  }

  private async checkExistProductName(name: string): Promise<boolean> {
    const existProductName = await this.productRepo.findOneBy({ name });
    return !!existProductName;
  }

  private async checkExistProductVariantSku(sku: string): Promise<boolean> {
    const existProductSku = await this.productVariantRepo.findOneBy({ sku });
    return !!existProductSku;
  }

  private async getChangeProductVariant(
    updateProductVariants: UpdateProductVariantDto[],
    productId: string,
  ) {
    // Get all product variant id from request
    const productVariantIdsFromRequest = updateProductVariants
      .map((productVariant) => productVariant.id)
      .filter((productVariantId) => productVariantId);

    // Find all Product Variant exist in database
    const allExistProductVariants = await this.productVariantRepo.findBy({
      productId,
    });

    // Find exist Product Variant in request
    const existProductVariants = allExistProductVariants.filter((productVariant) =>
      productVariantIdsFromRequest.includes(productVariant.id),
    );

    // Find new Product Variant from request without id
    const newProductVariants = updateProductVariants.filter((productVariant) => !productVariant.id);

    // Need deleted Product Variant
    const deleteProductVariants = allExistProductVariants.filter(
      (productVariant) => !productVariantIdsFromRequest.includes(productVariant.id),
    );
    return { existProductVariants, newProductVariants, deleteProductVariants };
  }

  async update(id: string, dto: UpdateProductDto): Promise<SuccessResponseDto> {
    const {
      name,
      description,
      categoryIds,
      productVariants,
      status,
      hasVariant,
      imageUrls,
      price,
      sku,
      stock,
    } = dto;

    // Check mandatory field if status is published
    // Require field has checked in DTO layer
    if (status === ProductStatus.PUBLISHED) {
      const errorMessages = [];
      if (!hasVariant) {
        if (name && (await this.checkExistProductName(name))) {
          errorMessages.push(`Product name #${name} is already exist.`);
        }
        if (sku && (await this.checkExistProductVariantSku(sku))) {
          errorMessages.push(`Product sku #${sku} is already exist.`);
        }
      } else {
        await Promise.all(
          productVariants.map(async (productVariant) => {
            if (
              productVariant.sku &&
              (await this.checkExistProductVariantSku(productVariant.sku))
            ) {
              errorMessages.push(`Product sku #${productVariant.sku} is already exist.`);
            }
          }),
        );
      }
    }

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
          status,
        },
      );

      // Update categories
      if (categoryIds && categoryIds.length) {
        // Delete old categories link with product
        await queryRunner.manager.delete(ProductCategories, {
          productId: product.id,
        });

        // Create new Product Category
        const productCategories = categoryIds.map((categoryId) => ({
          productId: id,
          categoryId: categoryId,
        }));

        await queryRunner.manager.save(ProductCategories, productCategories);
      }

      // Update Product Images
      if (imageUrls && imageUrls.length) {
        // Delete old to be deleted
        await queryRunner.manager.delete(ProductImage, {
          productId: product.id,
          id: Not(In(imageUrls.map((imageUrl) => imageUrl.id))),
        });

        // Create new
        await Promise.all(
          imageUrls.map(async (imageUrl) => {
            await queryRunner.manager.save(ProductImage, {
              id: imageUrl.id,
              productId: product.id,
              url: imageUrl.url,
            });
          }),
        );
      }

      // Update Product Variants
      if (productVariants && productVariants.length && hasVariant) {
        const { deleteProductVariants, existProductVariants, newProductVariants } =
          await this.getChangeProductVariant(productVariants, id);

        // Delete Product Variant do not need
        await queryRunner.manager.delete(ProductVariant, {
          id: In(deleteProductVariants.map((productVariant) => productVariant.id)),
        });

        // Update Product Variant
        await queryRunner.manager.save(ProductVariant, existProductVariants);

        // Create Product Variant
        await queryRunner.manager.save(
          ProductVariant,
          newProductVariants?.map((newProductVariant) => ({
            ...newProductVariant,
            productId: product.id,
            variantValues: newProductVariant.variantValueIds.map((variantValueId) => ({
              id: variantValueId,
            })),
          })),
        );

        // If array empty or undefined delete all old Product Variant
        await queryRunner.manager.delete(ProductVariant, {
          id: In(deleteProductVariants.map((deleteProductVariant) => deleteProductVariant.id)),
        });
      }

      // If don't have variant
      if (!hasVariant) {
        const oldProductVariant = await queryRunner.manager.findOne(ProductVariant, {
          where: { productId: id },
        });
        if (oldProductVariant) {
          await queryRunner.manager.update(
            ProductVariant,
            {
              productId: id,
            },
            {
              price,
              stock,
              sku,
            },
          );
        } else {
          await queryRunner.manager.save(ProductVariant, {
            productId: id,
            price,
            stock,
            sku,
          });
        }
      }

      await queryRunner.commitTransaction();
      return this.successResponse();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new Error(error);
    } finally {
      await queryRunner.release();
    }
  }

  async updateStatus(id: string, dto: UpdateProductStatusDto): Promise<SaveUuidResponseDto> {
    const nextStatus = dto.status;
    // Find Product
    const product = await this.productRepo.findOne({
      where: {
        id,
      },
      relations: [
        'categories',
        'productVariants',
        'productVariants.variantValues',
        'productVariants.variantValues.variant',
      ],
    });
    const currentStatus = product.status;
    // Check mandatory if change from unpublished to published
    // Nothing to check
    if (currentStatus === ProductStatus.PUBLISHED && nextStatus === ProductStatus.UNPUBLISHED) {
      product.status = nextStatus;
      await this.productRepo.save(product);
      return this.saveUuidResponse(product.id);
    }

    // If status change from unpublished to published
    // Need all field valid

    const errorMessages: string[] = [];
    // Check not null field

    if (!product.name) {
      errorMessages.push(`Field name must not empty.`);
    }
    if (!product.description) {
      errorMessages.push(`Field description must not empty.`);
    }
    if (product.productVariants.some((productVariant) => !productVariant.price)) {
      errorMessages.push(`Field price of Product Variant must not empty.`);
    }
    if (product.productVariants.some((productVariant) => !productVariant.sku)) {
      errorMessages.push(`Field sku of Product Variant must not empty.`);
    }
    if (product.productVariants.some((productVariant) => !productVariant.stock)) {
      errorMessages.push(`Field stock of Product Variant must not empty.`);
    }
    if (
      product.hasVariant === true &&
      product.productVariants.some((productVariant) => !productVariant.variantValues)
    ) {
      errorMessages.push(`Field variant value of Product Variant must not empty.`);
    }

    // Check unique field
    const existNameProduct = await this.productRepo.findOneBy({
      name: product.name,
      status: ProductStatus.PUBLISHED,
    });
    if (existNameProduct) {
      errorMessages.push(`Product name #${existNameProduct.name} already exist.`);
    }
    const existSkuProductVariants = await this.productVariantRepo.find({
      where: {
        sku: In(product.productVariants.map((productVariant) => productVariant.sku)),
        product: {
          status: ProductStatus.PUBLISHED,
        },
      },
    });

    if (existSkuProductVariants.length) {
      existSkuProductVariants.forEach((existSkuProductVariant) =>
        errorMessages.push(`Product sku #${existSkuProductVariant.sku} already exist.`),
      );
    }

    if (errorMessages.length) {
      throw new ServerException({
        ...ERROR_RESPONSE.BAD_REQUEST,
        message: errorMessages.join('\n'),
      });
    }

    // Update when have not error
    await this.productRepo.update({ id: id }, { status: nextStatus });

    return this.saveUuidResponse(id);
  }

  async uploadProductImage(dto: UploadDto): Promise<UploadResponseDto> {
    const { fileName, contentType } = dto;
    return await this.s3Service.getPresign(fileName, contentType, BucketFolder.PRODUCT_IMAGE);
  }

  async createVariantValue(dto: CreateVariantValueDto): Promise<SuccessResponseDto> {
    const { value, variantId } = dto;
    await this.variantValueRepo.save({
      value,
      variantId,
    });
    return this.successResponse();
  }

  async findAllVariantValue(query: VariantValueQueryDto): Promise<ListVariantValueResponseDto> {
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
    const { data, paginate } = await this.paginate(queryBuilder, page, pageSize);
    return plainToInstance(ListVariantValueResponseDto, {
      data: plainToInstance(VariantValueResponseDto, data),
      paginate,
    });
  }
}
