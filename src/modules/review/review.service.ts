import { Inject, Injectable } from '@nestjs/common';
import { BaseService } from 'src/base.service';
import { CreateReviewForOrderItemDto } from './dto/request/create-review-for-order-item.dto';
import { SuccessResponseDto } from 'src/common/dto/success-response.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderItem } from 'src/entities/order-item.entity';
import { DataSource, Repository } from 'typeorm';
import { ServerException } from 'src/exceptions/sever.exception';
import { ERROR_RESPONSE } from 'src/common/constants/error-response.constants';
import { UserRequestPayload } from '../auth/auth.interface';
import { OrderStatus } from 'src/common/enum/order-status.enum';
import { Review } from 'src/entities/review.entity';
import { ListReviewResponseDto } from './dto/response/list-review-response.dto';
import { ListReviewQueryDto } from './dto/request/list-review-query.dto';
import { plainToInstance } from 'class-transformer';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

@Injectable()
export class ReviewService extends BaseService {
  constructor(
    @InjectRepository(OrderItem)
    private readonly orderItemRepo: Repository<OrderItem>,
    @InjectRepository(Review)
    private readonly reviewRepo: Repository<Review>,
    private readonly datasource: DataSource,
    @Inject(WINSTON_MODULE_PROVIDER)
    private readonly logger: Logger,
  ) {
    super();
  }

  async createReviewForOrderItem(
    orderId: string,
    orderItemId: string,
    dto: CreateReviewForOrderItemDto,
    user: UserRequestPayload,
  ): Promise<SuccessResponseDto> {
    const { comment, rating, images } = dto;

    const orderItem = await this.orderItemRepo.findOne({
      where: {
        id: orderItemId,
        orderId,
        order: {
          userId: user.id,
        },
      },
      relations: ['order', 'productVariant'],
    });

    if (!orderItem) {
      throw new ServerException(ERROR_RESPONSE.NOT_FOUND);
    }

    if (orderItem.order.status !== OrderStatus.COMPLETED) {
      throw new ServerException({
        ...ERROR_RESPONSE.BAD_REQUEST,
        message: 'Can not review uncompleted order.',
      });
    }

    if (orderItem.isReviewed) {
      throw new ServerException({
        ...ERROR_RESPONSE.BAD_REQUEST,
        message: 'Each order item must have review one time.',
      });
    }

    const queryRunner = this.datasource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      await queryRunner.manager.save(Review, {
        orderItemId,
        images,
        productId: orderItem.productVariant.productId,
        rating,
        comment,
        userId: user.id,
      });

      await queryRunner.manager.update(
        OrderItem,
        {
          id: orderItemId,
        },
        { isReviewed: true },
      );

      await queryRunner.commitTransaction();
      return this.successResponse();
    } catch (error) {
      this.logger.error('Fail to create review for ordet item', {
        context: 'ReviewService.createReviewForOrderItem',
        error,
      });
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  async findAllReviewOfProduct(
    productId: string,
    dto: ListReviewQueryDto,
  ): Promise<ListReviewResponseDto> {
    const { page, pageSize, hasImages, rating } = dto;

    const queryBuilder = this.reviewRepo
      .createQueryBuilder('review')
      .leftJoinAndSelect('review.user', 'user')
      .where('review.productId = :productId', { productId })
      .orderBy('review.createdAt', 'DESC');

    if (rating) {
      queryBuilder.andWhere('review.rating = :rating', { rating });
    }

    if (hasImages === 'true') {
      queryBuilder.andWhere('review.images IS NOT NULL');
    }

    const { data, paginate } = await this.paginate(
      queryBuilder,
      page,
      pageSize,
    );

    return plainToInstance(ListReviewResponseDto, {
      data,
      paginate,
    });
  }
}
