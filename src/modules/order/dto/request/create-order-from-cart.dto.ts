import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { ArrayUnique, IsArray, IsEnum, IsOptional, IsUUID } from 'class-validator';
import { PaymentType } from 'src/common/enum/payment-type.enum';

export class CreateOrderFromCartDto {
  @ApiProperty({ type: [String] })
  @Transform(({ value }) => (Array.isArray(value) ? value : [value]))
  @IsArray()
  @ArrayUnique()
  @IsUUID('4', { each: true })
  cartItemIds: string[];

  @ApiProperty()
  @IsUUID()
  addressId: string;

  @ApiProperty({ enum: PaymentType })
  @IsEnum(PaymentType)
  paymentType: PaymentType;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsUUID()
  voucherId?: string;
}
