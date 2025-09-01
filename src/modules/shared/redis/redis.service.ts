import { Inject, Injectable } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisService {
  constructor(@Inject('REDIS_CLIENT') private readonly redis: Redis) {}

  async setValue<T = any>(
    key: string,
    value: T,
    ttlSeconds?: number,
  ): Promise<void> {
    const serialized =
      typeof value === 'string' ? value : JSON.stringify(value);
    if (ttlSeconds) {
      await this.redis.set(key, serialized, 'EX', ttlSeconds);
    } else {
      await this.redis.set(key, serialized);
    }
  }

  async getValue<T = any>(key: string): Promise<T> {
    const value = await this.redis.get(key);
    if (!value) return null;
    try {
      return JSON.parse(value) as T;
    } catch (error) {
      return value as T;
    }
  }

  async deleteKey(key: string): Promise<void> {
    await this.redis.del(key);
  }

  getRegisterKey(token: string): string {
    return `register:${token}`;
  }
}
