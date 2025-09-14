import { Module } from '@nestjs/common';
import { S3Service } from './s3.service';
import { ConfigModule } from '@nestjs/config';
import { s3Configuration } from 'src/config';

@Module({
  imports: [ConfigModule.forFeature(s3Configuration)],
  controllers: [],
  providers: [S3Service],
  exports: [S3Service],
})
export class S3Module {}
