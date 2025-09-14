import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService, ConfigType } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import databaseConfiguration from './config/database.config';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { AllExceptionFilter } from './exceptions/all-exception.filter';
import { RedisModule } from './modules/shared/redis/redis.module';
import { MailModule } from './modules/shared/mail/mail.module';
import mailConfig from './config/mail.config';
import { JwtGuard } from './modules/auth/guard/jwt.guard';
import { WinstonModule } from 'nest-winston';
import { S3Module } from './modules/shared/s3/s3.module';
import { RoleGuard } from './modules/auth/guard/role.guard';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfiguration, mailConfig],
    }),
    TypeOrmModule.forRootAsync({
      inject: [databaseConfiguration.KEY],
      useFactory: (
        databaseConfig: ConfigType<typeof databaseConfiguration>,
      ) => {
        return databaseConfig;
      },
    }),
    WinstonModule.forRootAsync({
      inject: [ConfigService],
      useFactory: () => ({}),
    }),
    UserModule,
    AuthModule,
    RedisModule,
    MailModule,
    S3Module,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionFilter,
    },
    {
      provide: APP_GUARD,
      useClass: JwtGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RoleGuard,
    },
  ],
})
export class AppModule {}
