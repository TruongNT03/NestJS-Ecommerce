import { ApiProperty } from '@nestjs/swagger';

export class RegisterResponseDto {
  @ApiProperty()
  success: boolean;

  @ApiProperty()
  token: string;
}
