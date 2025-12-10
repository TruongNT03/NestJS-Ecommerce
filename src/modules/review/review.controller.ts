import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ReviewService } from './review.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Role } from 'src/decorators/role.decorator';
import { RoleType } from 'src/common/enum/role.enum';
import { SuccessResponseDto } from 'src/common/dto/success-response.dto';
import { CreateReviewForOrderItemDto } from './dto/request/create-review-for-order-item.dto';
import { User } from 'src/decorators/user.decorator';
import { UserRequestPayload } from '../auth/auth.interface';
import { ListReviewResponseDto } from './dto/response/list-review-response.dto';
import { ListReviewQueryDto } from './dto/request/list-review-query.dto';

@ApiTags('[USER] REVIEW')
@Role([RoleType.USER])
@ApiBearerAuth()
@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @ApiOperation({ summary: '[USER] CREATE REVIEW FOR ORDER ITEM' })
  @ApiResponse({ status: 200, type: SuccessResponseDto })
  @Post(':orderId/:orderItemId')
  async createReviewForOrderItem(
    @Param('orderId') orderId: string,
    @Param('orderItemId') orderItemId: string,
    @Body() body: CreateReviewForOrderItemDto,
    @User() user: UserRequestPayload,
  ): Promise<SuccessResponseDto> {
    return await this.reviewService.createReviewForOrderItem(
      orderId,
      orderItemId,
      body,
      user,
    );
  }

  @ApiOperation({ summary: '[USER/ADMIN] GET ALL REVIEW OF PRODUCT' })
  @ApiResponse({ status: 200, type: ListReviewResponseDto })
  @Role([RoleType.ADMIN, RoleType.USER])
  @Get(':productId')
  async findAllReviewOfProduct(
    @Param('productId') productId: string,
    @Query() query: ListReviewQueryDto,
  ): Promise<ListReviewResponseDto> {
    return await this.reviewService.findAllReviewOfProduct(productId, query);
  }
}
