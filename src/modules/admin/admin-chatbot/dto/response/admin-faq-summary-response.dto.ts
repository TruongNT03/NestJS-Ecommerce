import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Type } from 'class-transformer';
import { ChatbotTrainingStatus } from 'src/common/enum/chatbot-training-status.enum';

@Exclude()
export class AdminFaqSummaryLatestTrainingResponseDto {
  @Expose()
  @ApiProperty({ type: Number })
  id: number;

  @Expose()
  @ApiProperty({ enum: ChatbotTrainingStatus })
  status: ChatbotTrainingStatus;

  @Expose()
  @ApiProperty({ type: Date })
  createdAt: Date;

  @Expose()
  @ApiProperty({ type: Date })
  updatedAt: Date;
}

@Exclude()
export class AdminFaqSummaryResponseDto {
  @Expose()
  @ApiProperty({ type: Number })
  totalFaqs: number;

  @Expose()
  @ApiProperty({ type: Number })
  totalFaqCategories: number;

  @Expose()
  @ApiProperty({ type: AdminFaqSummaryLatestTrainingResponseDto })
  @Type(() => AdminFaqSummaryLatestTrainingResponseDto)
  latestTraining: AdminFaqSummaryLatestTrainingResponseDto;
}
