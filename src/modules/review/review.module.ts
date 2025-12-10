import { Module } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewController } from './review.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderItem } from 'src/entities/order-item.entity';
import { Review } from 'src/entities/review.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OrderItem, Review])],
  controllers: [ReviewController],
  providers: [ReviewService],
})
export class ReviewModule {}
