import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Type } from 'class-transformer';
import { OrderStatus } from 'src/common/enum/order-status.enum';
import { PaymentStatus } from 'src/common/enum/payment-status.enum';
import { PaymentType } from 'src/common/enum/payment-type.enum';
import { AdminVoucherResponseDto } from 'src/modules/admin/admin-voucher/dto/response/admin-voucher-response.dto';

@Exclude()
export class AdminOrderResponseDto {
  @Expose()
  @ApiProperty({ type: String })
  id: string;

  @Expose()
  @ApiProperty({ type: String })
  userEmail: string;

  @Expose()
  @ApiProperty({ enum: OrderStatus })
  status: OrderStatus;

  @Expose()
  @ApiProperty({ type: Number })
  amount: number;

  @Expose()
  @ApiProperty({ enum: PaymentType })
  paymentMethod: PaymentType;

  @Expose()
  @ApiProperty({ enum: PaymentStatus })
  paymentStatus: PaymentStatus;

  @Expose()
  @ApiProperty({ type: AdminVoucherResponseDto })
  @Type(() => AdminVoucherResponseDto)
  voucher: AdminVoucherResponseDto;

  @Expose()
  @ApiProperty({ type: Date })
  createdAt: Date;

  @Expose()
  @ApiProperty({ type: Date })
  updatedAt: Date;
}
