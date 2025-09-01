import { Module } from '@nestjs/common';
import { ConfigModule, ConfigType } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import databaseConfiguration from './config/database.config';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionFilter } from './exceptions/http-exception.filter';
import { RedisModule } from './modules/shared/redis/redis.module';
import { MailModule } from './modules/shared/mail/mail.module';
import mailConfig from './config/mail.config';

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
    UserModule,
    AuthModule,
    RedisModule,
    MailModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionFilter,
    },
  ],
})
export class AppModule {}
