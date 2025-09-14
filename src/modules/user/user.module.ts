import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { RoleEntity } from 'src/entities/role.entity';
import { UserShareService } from './user-share.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, RoleEntity])],
  controllers: [UserController],
  providers: [UserService, UserShareService],
  exports: [UserShareService],
})
export class UserModule {}
