import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class AdminOrderStaticResponseDto {
  @Expose()
  @ApiProperty({ type: Number })
  pending: number;

  @Expose()
  @ApiProperty({ type: Number })
  confirmed: number;

  @Expose()
  @ApiProperty({ type: Number })
  shipping: number;

  @Expose()
  @ApiProperty({ type: Number })
  completed: number;
}
