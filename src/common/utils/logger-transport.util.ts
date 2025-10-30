import { WinstonModuleOptions } from 'nest-winston';
import * as winston from 'winston';
import * as dotenv from 'dotenv';
import chalk from 'chalk';

dotenv.config();

export const getWinstonConfig = (appName: string): WinstonModuleOptions => {
  const nodeEnv = process.env.NODE_ENV;

  const consoleFormat = winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.colorize({ level: true, message: true }),
    winston.format.printf((info) => {
      const appPrefix = chalk.blue(`[${appName}]`);
      const context = chalk.cyan(`[${info.context || 'Application'}]`);

      let errorOutput = '';
      const error = info.error;
      if (info.stack) {
        errorOutput = `\n\t${chalk.red(info.stack)}`;
      } else if (error instanceof Error) {
        errorOutput = `\n\t${chalk.red(error)}`;
      }

      if (info.message) {
        return `${appPrefix} - ${info.timestamp}   ${context} ${info.level}: ${info.message} ${errorOutput}`;
      } else {
        return `${appPrefix} - ${info.timestamp}   ${context} ${info.level}: ${JSON.stringify(info)}`;
      }
    }),
  );

  return {
    transports: [
      new winston.transports.Console({
        level: nodeEnv === 'production' ? 'info' : 'debug',
        format: consoleFormat,
        handleExceptions: true,
      }),
    ],
  };
};
