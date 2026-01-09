import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UploadResponseDto {
  @ApiProperty()
  @IsString()
  presignUrl: string;

  @ApiProperty()
  @IsString()
  fileUrl: string;
}
