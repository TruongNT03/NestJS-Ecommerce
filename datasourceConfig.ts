import { databaseConfig } from './src/config/database.config';
import { DataSource, DataSourceOptions } from 'typeorm';

const dataSourceOptions: DataSourceOptions = {
  ...databaseConfig,
  migrations: [__dirname + '/src/database/migrations/*.{ts,js}'],
  seeds: [__dirname + '/src/database/seeds/*.{ts,js}'],
  cli: {
    entitiesDir: 'src',
    subscribersDir: 'src',
    migrationsDir: 'src/database/migrations',
  },
} as DataSourceOptions;

export const AppDataSource = new DataSource(dataSourceOptions);
export default dataSourceOptions;
