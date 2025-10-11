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
import { NotificationModule } from './modules/notification/notification.module';
import { AdminUserModule } from './modules/admin/admin-user/admin-user.module';
import { AdminCategoriesModule } from './modules/admin/admin-categories/admin-categories.module';
import { AdminProductModule } from './modules/admin/admin-product/admin-product.module';
import { ChatModule } from './modules/chat/chat.module';
import { BullModule } from '@nestjs/bullmq';
import { redisConfiguration } from './config';
import { ChatQueueModule } from './modules/shared/queue/chat/chat-queue.module';
import { OnlineUserModule } from './modules/shared/online-user/online-user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfiguration, mailConfig, redisConfiguration],
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
    BullModule.forRootAsync({
      inject: [redisConfiguration.KEY],
      useFactory: (redisConfig: ConfigType<typeof redisConfiguration>) => ({
        connection: {
          host: redisConfig.host,
          port: redisConfig.port,
        },
      }),
    }),
    UserModule,
    AuthModule,
    RedisModule,
    MailModule,
    S3Module,
    NotificationModule,
    AdminUserModule,
    AdminCategoriesModule,
    AdminProductModule,
    ChatModule,
    ChatQueueModule,
    OnlineUserModule,
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
