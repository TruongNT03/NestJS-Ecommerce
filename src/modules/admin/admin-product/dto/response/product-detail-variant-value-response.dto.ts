import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Type } from 'class-transformer';
import { VariantResponseDto } from './variant-response.dto';

@Exclude()
export class ProductDetailVariantValueResponseDto {
  @Expose()
  @ApiProperty({
    type: Number,
    example: 'ca07d01b-cbe6-4c4f-aa4c-d55e937eefd7',
  })
  id: number;

  @Expose()
  @ApiProperty({ type: String, example: 'M' })
  value: string;

  @Expose()
  @ApiProperty()
  @Type(() => VariantResponseDto)
  variant: VariantResponseDto;
}
