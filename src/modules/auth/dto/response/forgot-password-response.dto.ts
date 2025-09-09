import { ApiProperty } from '@nestjs/swagger';

export class ForgotPasswordResponseDto {
  @ApiProperty({
    description: 'UUID token hooked with forgot password request',
  })
  token: string;
}
