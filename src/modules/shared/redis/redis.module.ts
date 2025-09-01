import { Logger, Module } from '@nestjs/common';
import { RedisService } from './redis.service';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';

@Module({
  controllers: [],
  providers: [
    RedisService,
    {
      provide: 'REDIS_CLIENT',
      useFactory: async (configService: ConfigService) => {
        const logger = new Logger();
        const redisUrl = configService.get<string>('REDIS_URL');
        const redisClient = new Redis(redisUrl);

        redisClient.on('connect', () => {
          logger.log(`Redis client connected`);
        });

        redisClient.on('error', (error) => {
          logger.error(`Redis client error: ${error}`);
        });

        try {
          await redisClient.ping();
        } catch (error) {
          throw new Error(error.message);
        }
        return redisClient;
      },
      inject: [ConfigService],
    },
  ],
  exports: [RedisService],
})
export class RedisModule {}
