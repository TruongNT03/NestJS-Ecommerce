import { Module } from '@nestjs/common';
import { AdminProductService } from './admin-product.service';
import { AdminProductController } from './admin-product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Variant } from 'src/entities/variant.entity';
import { VariantValue } from 'src/entities/variant-value.entity';
import { Product } from 'src/entities/product.entity';
import { ProductVariant } from 'src/entities/product-variant.entity';
import { S3Service } from 'src/modules/shared/s3/s3.service';
import { S3Module } from 'src/modules/shared/s3/s3.module';
import { ProductImage } from 'src/entities/product-image.entity';

@Module({
  imports: [
    S3Module,
    TypeOrmModule.forFeature([
      Variant,
      VariantValue,
      Product,
      ProductVariant,
      ProductImage,
    ]),
  ],
  controllers: [AdminProductController],
  providers: [AdminProductService],
})
export class AdminProductModule {}
