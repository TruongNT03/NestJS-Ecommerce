import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { OrderStatus } from 'src/common/enum/order-status.enum';
import { AddressResponseDto } from 'src/modules/address/dto/response/address-response.dto';
import { OrderItemResponseDto } from './order-item-response.dto';

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
  @ApiProperty({ type: Date })
  createdAt: Date;
}
