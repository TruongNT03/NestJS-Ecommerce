import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class CreatePaymentResponseDto {
  @Expose()
  @ApiProperty({ type: String })
  id: string;

  @Expose()
  @ApiProperty({ type: Number })
  amount: number;

  @Expose()
  @ApiProperty({ type: String })
  currency: string;

  @Expose()
  @ApiProperty({ type: String })
  qrImageUrl: String;

  @Expose()
  @ApiProperty({ type: Date })
  createdAr: Date;
}
