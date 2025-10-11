import { Module } from '@nestjs/common';
import { OnlineUserService } from './online-user.service';

@Module({
  imports: [],
  providers: [OnlineUserService],
  exports: [OnlineUserService],
})
export class OnlineUserModule {}
