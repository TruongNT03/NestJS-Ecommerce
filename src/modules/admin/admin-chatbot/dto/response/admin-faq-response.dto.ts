import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { FaqType } from 'src/common/enum/faq-type.enum';

@Exclude()
export class AdminFaqResponseDto {
  @Expose()
  @ApiProperty({ type: Number })
  id: number;

  @Expose()
  @ApiProperty({ type: String })
  question: string;

  @Expose()
  @ApiProperty({ type: String })
  answer: string;

  @Expose()
  @ApiProperty({ enum: FaqType })
  type: FaqType;

  @Expose()
  @ApiProperty({ type: Date })
  createdAt: Date;

  @Expose()
  @ApiProperty({ type: Date })
  updatedAt: Date;
}
