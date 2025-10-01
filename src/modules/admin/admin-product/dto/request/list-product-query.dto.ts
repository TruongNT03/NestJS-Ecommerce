import { QueryDto } from 'src/common/dto/query.dto';
import { IsArray, IsNumber, IsOptional, Validate } from 'class-validator';
import { Exist } from 'src/decorators/custome-validate.decorator';
import { Categories } from 'src/entities/categories.entity';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';

export class ListProductQueryDto extends QueryDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsArray()
  @Type(() => Number)
  @IsNumber({}, { each: true })
  @Validate(Exist<Categories>, [Categories, 'id', false], { each: true })
  @Transform(({ value }) => (Array.isArray(value) ? value : [value]))
  categoriesIds: number[];
}
