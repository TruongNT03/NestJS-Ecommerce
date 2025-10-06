import { Exclude, Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

@Exclude()
export class VariantValueResponseDto {
  @Expose()
  @ApiProperty({ type: Number, example: 1, description: 'Variant Value Id' })
  id: number;

  @Expose()
  @ApiProperty({ type: String, example: 'M', description: 'Variant Value' })
  value: string;
}
