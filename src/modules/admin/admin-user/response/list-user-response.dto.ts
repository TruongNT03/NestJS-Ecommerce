import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { PaginateMetaDto } from 'src/common/dto/paginate-meta.dto';
import { PaginateResponseDto } from 'src/common/dto/paginate-response.dto';
import { UserResponseDto } from 'src/modules/user/dto/response/user-response.dto';

@Exclude()
export class UserListResponseDto extends PaginateResponseDto<UserResponseDto> {
  @Expose()
  @ApiProperty({ type: [UserResponseDto] })
  data: UserResponseDto[];

  @Expose()
  @ApiProperty({ type: PaginateMetaDto })
  paginate: PaginateMetaDto;
}
