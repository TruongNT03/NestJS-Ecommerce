import { Module } from '@nestjs/common';
import { CreateAdminCommand } from './create-admin.command';
import { CreateAdminQuestion } from './questions/create-admin.question';

@Module({
  providers: [CreateAdminCommand, CreateAdminQuestion],
})
export class CommandModule {}
