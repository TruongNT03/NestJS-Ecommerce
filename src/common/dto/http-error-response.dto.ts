import { ApiProperty } from '@nestjs/swagger';

export class ErrorResponseDto {
  @ApiProperty()
  statusCode: number;

  @ApiProperty()
  path?: string;

  @ApiProperty()
  errorCode: string;

  @ApiProperty()
  message: string;

  @ApiProperty()
  timestamps?: string;

  @ApiProperty()
  details?: object;
}
