import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class ProductVariantValueResponseDto {
  @Expose()
  @ApiProperty({ type: String })
  variant: string;

  @Expose()
  @ApiProperty({ type: [String] })
  value: string[];
}
