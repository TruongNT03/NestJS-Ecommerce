import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { VoucherType } from 'src/entities/voucher.entity';

@Exclude()
export class AdminVoucherResponseDto {
  @Expose()
  @ApiProperty({ type: String })
  id: string;

  @Expose()
  @ApiProperty({ type: String })
  code: string;

  @Expose()
  @ApiProperty({ enum: VoucherType })
  type: VoucherType;

  @Expose()
  @ApiProperty({ type: Number })
  discountValue: number;

  @Expose()
  @ApiProperty({ type: Number })
  maxDiscountValue?: number;

  @Expose()
  @ApiProperty({ type: Number })
  minOrderValue: number;

  @Expose()
  @ApiProperty({ type: Number })
  stock: number;

  @Expose()
  @ApiProperty({ type: Number })
  totalUsed: number;

  @Expose()
  @ApiProperty({ type: String })
  campaignName: string;

  @Expose()
  @ApiProperty({ type: String })
  description: string;

  @Expose()
  @ApiProperty({ type: Date })
  expiryAt: Date;

  @Expose()
  @ApiProperty({ type: Boolean })
  isPublic: boolean;

  @Expose()
  @ApiProperty({ type: Date })
  createdAt: Date;

  @Expose()
  @ApiProperty({ type: Date })
  updatedAt: Date;
}
