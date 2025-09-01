import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import * as _ from 'lodash';
import { ERROR_RESPONSE } from 'src/common/constants/error-response.constants';
import { convertErrorToObject } from 'src/common/utils/error.util';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}
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

    httpAdapter.reply(ctx.getResponse(), errorData, httpStatus);
  }
}
