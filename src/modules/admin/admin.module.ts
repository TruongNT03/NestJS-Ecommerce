import { Module } from '@nestjs/common';
import { AdminUserModule } from 'src/modules/admin/admin-user/admin-user.module';
import { AdminProductModule } from 'src/modules/admin/admin-product/admin-product.module';
import { AdminCategoriesModule } from 'src/modules/admin/admin-categories/admin-categories.module';
import { AdminChatModule } from 'src/modules/admin/admin-chat/admin-chat.module';

@Module({
  imports: [
    AdminUserModule,
    AdminCategoriesModule,
    AdminProductModule,
    AdminChatModule,
  ],
})
export class AdminModule {}
