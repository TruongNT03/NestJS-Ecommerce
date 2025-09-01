import { HttpException, HttpStatus } from '@nestjs/common';
import { ErrorResponseDto } from 'src/common/dto/http-error-response.dto';

export class ServerException extends HttpException {
  constructor(response: ErrorResponseDto, status?: number) {
    const statusCode: number =
      status || response.statusCode || HttpStatus.INTERNAL_SERVER_ERROR;
    super({ ...response }, statusCode);
  }
}
