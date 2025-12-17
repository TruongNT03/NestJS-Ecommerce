import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, Validate } from 'class-validator';
import { Exist } from 'src/decorators/custom-validate.decorator';
import { Variant } from 'src/entities/variant.entity';

export class CreateVariantValueDto {
  @ApiProperty({ type: String, example: 'M' })
  @IsString()
  value: string;

  @ApiProperty({ type: Number, example: 1 })
  @IsNumber()
  @Validate(Exist<Variant>, [Variant, 'id', false])
  variantId: number;
}
