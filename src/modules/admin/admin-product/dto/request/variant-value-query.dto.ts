import { QueryDto } from 'src/common/dto/query.dto';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, Validate } from 'class-validator';
import { Exist } from 'src/decorators/custom-validate.decorator';
import { Variant } from 'src/entities/variant.entity';
import { Type } from 'class-transformer';

export class VariantValueQueryDto extends QueryDto {
  @ApiPropertyOptional({ type: String, example: 'M' })
  @IsOptional()
  @IsString()
  keyword?: string;

  @ApiProperty({ type: Number, example: 1 })
  @IsNumber()
  @Type(() => Number)
  @Validate(Exist<Variant>, [Variant, 'id', false])
  variantId: number;
}
