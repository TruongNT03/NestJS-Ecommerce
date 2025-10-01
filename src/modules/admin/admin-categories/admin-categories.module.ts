import { Module } from '@nestjs/common';
import { AdminCategoriesService } from './admin-categories.service';
import { AdminCategoriesController } from './admin-categories.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Categories } from 'src/entities/categories.entity';
import { S3Module } from 'src/modules/shared/s3/s3.module';

@Module({
  imports: [TypeOrmModule.forFeature([Categories]), S3Module],
  controllers: [AdminCategoriesController],
  providers: [AdminCategoriesService],
})
export class AdminCategoriesModule {}
