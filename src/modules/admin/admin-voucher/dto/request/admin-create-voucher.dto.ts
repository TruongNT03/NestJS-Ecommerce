import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDate,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  Validate,
} from 'class-validator';
import { Exist } from 'src/decorators/custom-validate.decorator';
import { Voucher, VoucherType } from 'src/entities/voucher.entity';

export class AdminCreateVoucherDto {
  @ApiProperty({ type: String })
  @IsString()
  @Validate(Exist, [Voucher, 'code', true, false])
  code: string;

  @ApiProperty({ enum: VoucherType })
  @IsEnum(VoucherType)
  type: VoucherType;

  @ApiProperty({ type: Number })
  @IsNumber()
  discountValue: number;

  @ApiPropertyOptional({ type: Number })
  @IsOptional()
  @IsNumber()
  maxDiscountValue?: number;

  @ApiPropertyOptional({ type: Number })
  @IsOptional()
  @IsNumber()
  minOrderValue: number;

  @ApiProperty({ type: Number })
  @IsNumber()
  stock: number;

  @ApiProperty({ type: Date })
  @IsDate()
  expiryAt: Date;

  @ApiProperty({ type: Boolean })
  @IsBoolean()
  isPublic: boolean;

  @ApiProperty({ type: String })
  @IsString()
  campaignName: string;

  @ApiProperty({ type: String })
  @IsString()
  description: string;
}
