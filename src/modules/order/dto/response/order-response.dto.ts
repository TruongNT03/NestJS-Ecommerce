import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Exclude, Expose, Type } from 'class-transformer';
import { OrderStatus } from 'src/common/enum/order-status.enum';
import { AddressResponseDto } from 'src/modules/address/dto/response/address-response.dto';
import { OrderItemResponseDto } from './order-item-response.dto';
import { VoucherResponseDto } from 'src/modules/voucher/dto/response/voucher-response.dto';
import { PaymentStatus } from 'src/common/enum/payment-status.enum';

@Exclude()
export class OrderResponseDto {
  @Expose()
  @ApiProperty({ type: String })
  id: string;

  @Expose()
  @ApiProperty({ type: AddressResponseDto })
  address: AddressResponseDto;

  @Expose()
  @ApiProperty({ enum: OrderStatus })
  status: OrderStatus;

  @Expose()
  @ApiProperty({ type: [OrderItemResponseDto] })
  orderItems: OrderItemResponseDto[];

  @Expose()
  @ApiProperty({ type: Number })
  amount: number;

  @Expose()
  @ApiProperty({ type: VoucherResponseDto })
  @Type(() => VoucherResponseDto)
  voucher: VoucherResponseDto;

  @Expose()
  @ApiPropertyOptional({ type: String })
  qrUrl?: string;

  @Expose()
  @ApiPropertyOptional({ enum: PaymentStatus })
  qrStatus?: PaymentStatus;

  @Expose()
  @ApiProperty({ type: Date })
  createdAt: Date;
}
