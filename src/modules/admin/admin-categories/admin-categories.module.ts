import { Module } from '@nestjs/common';
import { AdminCategoriesService } from './admin-categories.service';
import { AdminCategoriesController } from './admin-categories.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Categories } from 'src/entities/categories.entity';
import { S3Module } from 'src/modules/shared/s3/s3.module';
import { CategoriesModule } from 'src/modules/categories/categories.module';

@Module({
  imports: [TypeOrmModule.forFeature([Categories]), S3Module, CategoriesModule],
  controllers: [AdminCategoriesController],
  providers: [AdminCategoriesService],
})
export class AdminCategoriesModule {}
