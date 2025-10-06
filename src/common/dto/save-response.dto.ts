import { ApiProperty } from '@nestjs/swagger';

export class SaveUuidResponseDto {
  @ApiProperty({
    type: String,
    example: '377a5d99-ee6d-4e6f-9197-713e0699ac93',
  })
  id: string;
}

export class SaveNumberIdResponseDto {
  @ApiProperty({ type: Number, example: 1 })
  id: number;
}
