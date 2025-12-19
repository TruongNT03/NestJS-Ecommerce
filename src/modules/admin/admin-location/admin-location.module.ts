import { Module } from '@nestjs/common';
import { AdminLocationService } from './admin-location.service';
import { AdminLocationController } from './admin-location.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Location } from 'src/entities/location.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Location])],
  controllers: [AdminLocationController],
  providers: [AdminLocationService],
})
export class AdminLocationModule {}
