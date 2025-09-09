import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpAdapterHost } from '@nestjs/core';
import * as _ from 'lodash';
import { ERROR_RESPONSE } from 'src/common/constants/error-response.constants';
import { convertErrorToObject } from 'src/common/utils/error.util';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  constructor(
    private readonly httpAdapterHost: HttpAdapterHost,
    private readonly configService: ConfigService,
  ) {}
  catch(exception: any, host: ArgumentsHost) {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();
    const isHttpException = exception instanceof HttpException;
    const httpStatus = isHttpException
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;
    const errorData = {
      statusCode: httpStatus,
      timestamps: new Date().toISOString(),
      path: httpAdapter.getRequestUrl(ctx.getRequest()),
    };

    if (isHttpException) {
      let exceptionResponse = exception.getResponse();
      if (typeof exceptionResponse === 'string') {
        exceptionResponse = { message: exceptionResponse };
      }
      _.assign(
        errorData,
        { statusCode: exception.getStatus() },
        exceptionResponse,
      );
    } else {
      _.assign(errorData, {
        ...ERROR_RESPONSE.INTERNAL_SERVER_ERROR,
        details: convertErrorToObject(exception),
      });
    }
    const isDevelopment =
      this.configService.get<string>('IS_DEVELOPMENT') === 'true';
    if (isDevelopment) {
      _.omit(errorData, ['details']);
    }
    httpAdapter.reply(ctx.getResponse(), errorData, httpStatus);
  }
}
