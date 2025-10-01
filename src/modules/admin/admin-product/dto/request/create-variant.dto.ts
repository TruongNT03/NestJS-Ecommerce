import { IsString, Validate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Exist } from 'src/decorators/custome-validate.decorator';
import { Variant } from 'src/entities/variant.entity';

export class CreateVariantDto {
  @ApiProperty({ type: String, example: 'Size' })
  @IsString()
  @Validate(Exist<Variant>, [Variant, 'name', true])
  name: string;
}
