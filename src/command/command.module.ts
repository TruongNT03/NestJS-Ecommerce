import { Module } from '@nestjs/common';
import { CreateAdminCommand } from './create-admin.command';
import { CreateAdminQuestion } from './questions/create-admin.question';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { RoleEntity } from 'src/entities/role.entity';
import { databaseConfig } from 'src/config/database.config';

@Module({
  imports: [
    TypeOrmModule.forRoot(databaseConfig),
    TypeOrmModule.forFeature([UserEntity, RoleEntity]),
  ],
  providers: [CreateAdminCommand, CreateAdminQuestion],
})
export class CommandModule {}
