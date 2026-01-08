import { Exclude, Expose, Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { ProductImageDetailResponseDto } from 'src/modules/admin/admin-product/dto/response/product-image-detail-response.dto';

@Exclude()
export class ProductSummaryResponseDto {
  @Expose()
  @ApiProperty({ type: String })
  id: string;

  @Expose()
  @ApiProperty({ type: String })
  name: string;

  @Expose()
  @ApiProperty({ type: Number })
  discount: number;

  @Expose()
  @ApiProperty({ type: [ProductImageDetailResponseDto] })
  @Transform(({ value }) => (Array.isArray(value) ? value.sort((a, b) => a.id - b.id) : []))
  productImages: ProductImageDetailResponseDto[];
}
