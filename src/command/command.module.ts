import { Module } from '@nestjs/common';
import { CreateAdminCommand } from './create-admin.command';
import { CreateAdminQuestion } from './questions/create-admin.question';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { RoleEntity } from 'src/entities/role.entity';
import { databaseConfig } from 'src/config/database.config';
import { CreateVariantCommand } from './create-variant.command';
import { CreateCategoryCommand } from './create-category.command';
import { CreateProductCommand } from './create-product.command';

@Module({
  imports: [
    TypeOrmModule.forRoot(databaseConfig),
    TypeOrmModule.forFeature([UserEntity, RoleEntity]),
  ],
  providers: [
    CreateAdminCommand,
    CreateAdminQuestion,
    CreateVariantCommand,
    CreateCategoryCommand,
    CreateProductCommand,
  ],
})
export class CommandModule {}
