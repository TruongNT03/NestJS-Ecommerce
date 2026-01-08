import { Exclude, Expose, Transform, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { CategoryResponseDto } from 'src/modules/categories/dto/response/category-response.dto';
import { ProductDetailVariantResponseDto } from './produt-detail-variant-response.dto';
import { ProductStatus } from 'src/common/enum/product-status.enum';
import { ProductImageDetailResponseDto } from './product-image-detail-response.dto';

@Exclude()
export class AdminProductDetailResponseDto {
  @Expose()
  @ApiProperty({
    type: String,
    example: '377a5d99-ee6d-4e6f-9197-713e0699ac93',
  })
  id: string;

  @Expose()
  @ApiProperty({ type: String, example: 'Áo thun nam' })
  name: string;

  @Expose()
  @ApiProperty({ type: String, example: 'Chất liệu cao cấp' })
  description: string;

  @Expose()
  @ApiProperty({ type: Boolean })
  hasVariant: boolean;

  @Expose()
  @ApiProperty({ type: Number })
  discount: number;

  @Expose()
  @ApiProperty({ enum: ProductStatus })
  status: ProductStatus;

  @Expose()
  @ApiProperty({ type: [CategoryResponseDto] })
  @Type(() => CategoryResponseDto)
  categories: CategoryResponseDto[];

  @Expose()
  @ApiProperty({ type: [ProductImageDetailResponseDto] })
  @Transform(({ value }) => value?.map((i) => ({ id: i.id, url: i.url })))
  productImages: ProductImageDetailResponseDto[];

  @Expose()
  @ApiProperty({ type: [ProductDetailVariantResponseDto] })
  @Type(() => ProductDetailVariantResponseDto)
  productVariants: ProductDetailVariantResponseDto[];
}
