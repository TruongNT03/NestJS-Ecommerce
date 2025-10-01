import { Exclude, Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { VariantResponseDto } from 'src/modules/admin/admin-product/dto/response/variant-response.dto';

@Exclude()
export class VariantValueResponseDto {
  @Expose()
  @ApiProperty({ type: Number, example: 1, description: 'Variant Value Id' })
  id: number;

  @Expose()
  @ApiProperty({ type: String, example: 'M', description: 'Variant Value' })
  value: string;

  @Expose()
  @ApiProperty({ type: Date })
  createdAt: Date;

  @Expose()
  @ApiProperty({ type: Date })
  updatedAt: Date;

  // @Expose()
  // @ApiProperty({ type: Date, example: null })
  // deletedAt: Date;
}
