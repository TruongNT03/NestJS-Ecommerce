import { Module } from '@nestjs/common';
import { UserProductService } from './user-product.service';
import { UserProductController } from './user-product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/entities/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  controllers: [UserProductController],
  providers: [UserProductService],
})
export class UserProductModule {}
