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
    errorCode: 'otp_is_invalid',
    message: 'OTP is invalid',
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
  UNAUTHORIZED: {
    statusCode: HttpStatus.UNAUTHORIZED,
    errorCode: 'unauthorized',
    message: 'Authentication required',
  },
  USER_NOT_FOUND: {
    statusCode: HttpStatus.NOT_FOUND,
    errorCode: 'user_not_found',
    message: 'User not found',
  },
  INVALID_TOKEN_USAGE: {
    statusCode: HttpStatus.FORBIDDEN,
    errorCode: 'invalid_token_usage',
    message: 'Invalid token type',
  },
};
