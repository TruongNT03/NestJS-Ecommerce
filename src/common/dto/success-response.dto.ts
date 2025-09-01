import { ApiProperty } from '@nestjs/swagger';

export class SuccessReponseDto {
  @ApiProperty()
  id: string;
}
