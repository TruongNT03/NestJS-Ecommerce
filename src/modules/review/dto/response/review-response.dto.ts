import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Type } from 'class-transformer';

@Exclude()
export class UserReviewResponseDto {
  @Expose()
  @ApiProperty({ type: String })
  id: string;

  @Expose()
  @ApiProperty({ type: String })
  name: string;

  @Expose()
  @ApiProperty({ type: String })
  avatar: string;
}

@Exclude()
export class ReviewResponseDto {
  @Expose()
  @ApiProperty({ type: String })
  id: string;

  @Expose()
  @ApiProperty({ type: String })
  comment: string;

  @Expose()
  @ApiProperty({ type: Number })
  rating: number;

  @Expose()
  @ApiProperty({ type: [String] })
  images: string[];

  @Expose()
  @ApiProperty({ type: UserReviewResponseDto })
  @Type(() => UserReviewResponseDto)
  user: UserReviewResponseDto;

  @Expose()
  @ApiProperty({ type: Date })
  createdAt: Date;
}
