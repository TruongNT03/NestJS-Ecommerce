import { Module } from '@nestjs/common';
import { AdminUserModule } from 'src/modules/admin/admin-user/admin-user.module';
import { AdminProductModule } from 'src/modules/admin/admin-product/admin-product.module';
import { AdminCategoriesModule } from 'src/modules/admin/admin-categories/admin-categories.module';
import { AdminChatModule } from 'src/modules/admin/admin-chat/admin-chat.module';
import { AdminOrderModule } from './admin-order/admin-order.module';
import { AdminChatbotModule } from './admin-chatbot/admin-chatbot.module';
import { AdminDashboardModule } from './admin-dashboard/admin-dashboard.module';

@Module({
  imports: [
    AdminUserModule,
    AdminCategoriesModule,
    AdminProductModule,
    AdminChatModule,
    AdminOrderModule,
    AdminChatbotModule,
    AdminDashboardModule,
  ],
})
export class AdminModule {}
