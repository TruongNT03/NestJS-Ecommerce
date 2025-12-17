import { ApiProperty } from '@nestjs/swagger';
import { IsString, Validate } from 'class-validator';
import { Exist } from 'src/decorators/custom-validate.decorator';
import { Voucher } from 'src/entities/voucher.entity';

export class TakeVoucherDto {
  @ApiProperty({ type: String })
  @IsString()
  @Validate(Exist, [Voucher, 'id', false, false])
  voucherId: string;
}
