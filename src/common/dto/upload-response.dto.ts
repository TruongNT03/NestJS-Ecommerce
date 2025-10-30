import { ApiProperty } from '@nestjs/swagger';

export class UploadResponseDto {
  @ApiProperty()
  presignUrl: string;

  @ApiProperty()
  fileUrl: string;
}
