import { HttpStatus } from '@nestjs/common';

export const ERROR_RESPONSE = {
  INTERNAL_SERVER_ERROR: {
    statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
    errorCode: 'INTERNAL SERVER ERROR',
    message: 'Internal server error',
  },
  EMAIL_ALREADY_EXIST: {
    statusCode: HttpStatus.CONFLICT,
    errorCode: 'Conflick Exception',
    message: 'User with email already exist',
  },
  OTP_INVALID: {
    statusCode: HttpStatus.BAD_REQUEST,
    errorCode: 'Bad Request Exception',
    message: 'OTP Is Invalid',
  },
  BAD_REQUEST: {
    statusCode: HttpStatus.BAD_REQUEST,
    errorCode: 'Bad Request Exception',
    message: 'Bad Request',
  },
  INCREDENTIAL: {
    statusCode: HttpStatus.UNAUTHORIZED,
    errorCode: 'UNAUTHORIZED',
    message: 'Username or password is invalid',
  },
};
