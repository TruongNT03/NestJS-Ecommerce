import { Module } from '@nestjs/common';
import { VoucherService } from './voucher.service';
import { VoucherController } from './voucher.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Voucher } from 'src/entities/voucher.entity';
import { UserVoucher } from 'src/entities/user-voucher.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Voucher, UserVoucher])],
  controllers: [VoucherController],
  providers: [VoucherService],
})
export class VoucherModule {}
