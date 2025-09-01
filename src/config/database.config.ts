import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import 'dotenv/config';

export const databaseConfig: TypeOrmModuleOptions = {
  type: process.env.DATABASE_TYPE as any,
  host: process.env.DATABASE_HOST || '',
  port: parseInt(process.env.DATABASE_PORT || '5432', 10),
  database: process.env.DATABASE_NAME || '',
  username: process.env.DATABASE_USERNAME || '',
  password: process.env.DATABASE_PASSWORD || '',
  entities: [__dirname + '/../entities/*.entity.{ts,js}'],
  namingStrategy: new SnakeNamingStrategy(),
  synchronize: false,
};

export default registerAs('database', () => databaseConfig);
