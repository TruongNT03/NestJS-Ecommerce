import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { PaymentStatus } from 'src/common/enum/payment-status.enum';

@Exclude()
export class CheckPaymentStatusResponseDto {
  @Expose()
  @ApiProperty({ enum: PaymentStatus })
  status: PaymentStatus;
}
