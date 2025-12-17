import { Module } from '@nestjs/common';
import { AdminVoucherService } from './admin-voucher.service';
import { AdminVoucherController } from './admin-voucher.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Voucher } from 'src/entities/voucher.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Voucher])],
  controllers: [AdminVoucherController],
  providers: [AdminVoucherService],
})
export class AdminVoucherModule {}
