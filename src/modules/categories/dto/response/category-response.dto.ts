import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class CategoryResponseDto {
  @Expose()
  @ApiProperty({ example: 1 })
  id: number;

  @Expose()
  @ApiProperty({ example: 'Áo thu đông' })
  title: string;

  @Expose()
  @ApiProperty({ example: 'Áo dành cho mùa thu đông, cảm giác vừa đủ ấm.' })
  description: string;

  @Expose()
  @ApiProperty({ example: 'https://exmaple.jpg' })
  image: string;

  @Expose()
  @ApiProperty({ type: Date })
  createdAt: Date;

  @Expose()
  @ApiProperty({ type: Date })
  updatedAt: Date;
}
