import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Type } from 'class-transformer';
import { OrderStatus } from 'src/common/enum/order-status.enum';
import { OrderItemResponseDto } from 'src/modules/order/dto/response/order-item-response.dto';

@Exclude()
export class AdminOrderDetailUserResponseDto {
  @Expose()
  @ApiProperty({ type: String })
  id: string;

  @Expose()
  @ApiProperty({ type: String })
  email: string;

  @Expose()
  @ApiProperty({ type: String })
  avatar: string;

  @Expose()
  @ApiProperty({ type: String })
  gender: string;
}

@Exclude()
export class AdminOrderDetailAddressResponseDto {
  @Expose()
  @ApiProperty({ type: String })
  id: string;

  @Expose()
  @ApiProperty({ type: String })
  name: string;

  @Expose()
  @ApiProperty({ type: String })
  phoneNumber: string;

  @Expose()
  @ApiProperty({ type: String })
  detail: string;
}

@Exclude()
export class AdminOrderDetailResponseDto {
  @Expose()
  @ApiProperty({ type: String })
  id: string;

  @Expose()
  @ApiProperty({ enum: OrderStatus })
  status: OrderStatus;

  @Expose()
  @ApiProperty({ type: Number })
  amount: number;

  @Expose()
  @ApiProperty({ type: AdminOrderDetailUserResponseDto })
  @Type(() => AdminOrderDetailUserResponseDto)
  user: AdminOrderDetailUserResponseDto;

  @Expose()
  @ApiProperty({ type: AdminOrderDetailAddressResponseDto })
  @Type(() => AdminOrderDetailAddressResponseDto)
  address: AdminOrderDetailAddressResponseDto;

  @Expose()
  @ApiProperty({ type: [OrderItemResponseDto] })
  @Type(() => OrderItemResponseDto)
  orderItems: OrderItemResponseDto[];

  @Expose()
  @ApiProperty({ type: Date })
  createdAt: Date;
}
