import { ApiProperty } from '@nestjs/swagger';

export class SaveEntityResponseDto {
  @ApiProperty({ type: Number || String })
  id: number | string;
}
