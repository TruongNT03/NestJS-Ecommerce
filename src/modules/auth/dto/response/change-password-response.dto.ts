import { ApiProperty } from '@nestjs/swagger';

export class ChangePasswordResponseDto {
  @ApiProperty()
  accessToken: string;

  @ApiProperty()
  refreshToken: string;
}
