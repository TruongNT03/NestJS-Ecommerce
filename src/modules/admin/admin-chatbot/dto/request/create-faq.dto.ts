import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString } from 'class-validator';
import { FaqType } from 'src/common/enum/faq-type.enum';

export class CreateFaqDto {
  @ApiProperty({ type: String })
  @IsString()
  question: string;

  @ApiProperty({ type: String })
  @IsString()
  answer: string;

  @ApiProperty({ enum: FaqType })
  @IsEnum(FaqType)
  type: FaqType;
}
