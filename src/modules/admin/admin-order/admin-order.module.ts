import { Module } from '@nestjs/common';
import { AdminOrderService } from './admin-order.service';
import { AdminOrderController } from './admin-order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from 'src/entities/order.entity';
import { NotificationModule } from 'src/modules/notification/notification.module';

@Module({
  imports: [TypeOrmModule.forFeature([Order]), NotificationModule],
  controllers: [AdminOrderController],
  providers: [AdminOrderService],
})
export class AdminOrderModule {}
