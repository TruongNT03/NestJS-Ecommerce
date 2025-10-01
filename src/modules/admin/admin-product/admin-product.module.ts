import { Module } from '@nestjs/common';
import { AdminProductService } from './admin-product.service';
import { AdminProductController } from './admin-product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Variant } from 'src/entities/variant.entity';
import { VariantValue } from 'src/entities/variant-value.entity';
import { Product } from 'src/entities/product.entity';
import { ProductVariant } from 'src/entities/product-variant.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Variant, VariantValue, Product, ProductVariant]),
  ],
  controllers: [AdminProductController],
  providers: [AdminProductService],
})
export class AdminProductModule {}
