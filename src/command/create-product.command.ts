import { Command, CommandRunner } from 'nest-commander';
import { commandConstants } from './command.constant';
import { DataSource, In } from 'typeorm';
import { PRODUCT_META_DATA } from 'src/master-data/product.data';
import { Product } from 'src/entities/product.entity';
import { ProductStatus } from 'src/common/enum/product-status.enum';
import { Categories } from 'src/entities/categories.entity';
import { ProductVariant } from 'src/entities/product-variant.entity';
import { VariantValue } from 'src/entities/variant-value.entity';
import { ProductCategories } from 'src/entities/product-categories.entity';

@Command({
  name: commandConstants.createProduct,
})
export class CreateProductCommand extends CommandRunner {
  constructor(private readonly dataSource: DataSource) {
    super();
  }
  async run(): Promise<void> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      await queryRunner.query(
        'TRUNCATE TABLE products RESTART IDENTITY CASCADE;',
      );
      await queryRunner.query(
        'TRUNCATE TABLE product_variants RESTART IDENTITY CASCADE;',
      );
      await queryRunner.query(
        'TRUNCATE TABLE product_categories RESTART IDENTITY CASCADE;',
      );
      await queryRunner.query(
        'TRUNCATE TABLE product_variant_values RESTART IDENTITY CASCADE;',
      );
      for (let product of PRODUCT_META_DATA) {
        const productCategories = await queryRunner.manager.find(Categories, {
          where: {
            title: In(product.categoryNames),
          },
        });

        const productEntity = await queryRunner.manager.save(Product, {
          name: product.name,
          description: product.description,
          status: ProductStatus.PUBLISHED,
        });

        for (let category of productCategories) {
          await queryRunner.manager.save(ProductCategories, {
            productId: productEntity.id,
            categoryId: category.id,
          });
        }

        for (let productVariant of product.variants) {
          const variantKeys = Object.keys(productVariant.variantValues);
          const productVariantValueEntities: VariantValue[] = [];
          for (let variantKey of variantKeys) {
            const variantValueEntity = await queryRunner.manager.findOne(
              VariantValue,
              {
                where: {
                  value: productVariant.variantValues[variantKey],
                },
              },
            );
            if (variantValueEntity) {
              productVariantValueEntities.push(variantValueEntity);
            }

            const productVariantEntity = await queryRunner.manager.save(
              ProductVariant,
              {
                productId: productEntity.id,
                sku: productVariant.sku,
                price: productVariant.price,
                stock: productVariant.stock,
                variantValues: productVariantValueEntities,
              },
            );
          }
        }
      }
      await queryRunner.commitTransaction();
      console.log('Products created successfully.');
    } catch (error) {
      console.error('Error creating products:', error);
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }
}
