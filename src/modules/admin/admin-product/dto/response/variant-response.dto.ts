import { Exclude, Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

@Exclude()
export class VariantResponseDto {
  @Expose()
  @ApiProperty({ type: Number, example: 1, description: 'Variant Id' })
  id: number;

  @Expose()
  @ApiProperty({ type: String, example: 'Size', description: 'Variant name' })
  name: string;
}
