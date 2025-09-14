import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString } from 'class-validator';
import { MimeType } from '../enum/content-type.enum';

export class UploadDto {
  @ApiProperty()
  @IsString()
  fileName: string;

  @ApiProperty()
  @IsEnum(MimeType)
  contentType: MimeType;
}
