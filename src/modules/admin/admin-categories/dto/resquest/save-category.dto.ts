import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUrl, Validate } from 'class-validator';
import { Exist } from 'src/decorators/custom-validate.decorator';
import { Categories } from 'src/entities/categories.entity';

export class SaveCategoryDto {
  @ApiProperty({ example: 'Áo thu đông' })
  @IsString()
  @Validate(Exist<Categories>, [Categories, 'title', true])
  title: string;

  @ApiProperty({ example: 'Áo dành cho mùa thu đông, cảm giác vừa đủ ấm.' })
  @IsString()
  description: string;

  @ApiProperty({ example: 'https://exmaple.jpg' })
  @IsString()
  @IsUrl()
  image: string;
}
