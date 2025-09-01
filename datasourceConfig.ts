import { databaseConfig } from './src/config/database.config';
import { DataSource, DataSourceOptions } from 'typeorm';

const dataSourceOptions: DataSourceOptions = {
  ...databaseConfig,
  migrations: [__dirname + '/src/database/migrations/*.{ts,js}'],
} as DataSourceOptions;

export const AppDataSource = new DataSource(dataSourceOptions);
export default dataSourceOptions;
