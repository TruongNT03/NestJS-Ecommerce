import { SeederOptions } from 'typeorm-extension';
import { databaseConfig } from './src/config/database.config';
import { DataSource, DataSourceOptions } from 'typeorm';
import 'dotenv/config';

const dataSourceOptions: DataSourceOptions & SeederOptions = {
  ...databaseConfig,
  migrations: [__dirname + '/src/database/migrations/*.{ts,js}'],
  seeds: [
    process.env.NODE_ENV === 'production'
      ? './dist/src/database/seeds/*.{ts,js}'
      : './src/database/seeds/*.{ts,js}',
  ],
  cli: {
    entitiesDir: 'src',
    subscribersDir: 'src',
    migrationsDir: 'src/database/migrations',
  },
} as DataSourceOptions & SeederOptions;

export const AppDataSource = new DataSource(dataSourceOptions);
export default dataSourceOptions;
