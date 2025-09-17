import { Exclude } from 'class-transformer';
import { PaginateResponseDto } from 'src/common/dto/paginate-response.dto';
import { UserResponseDto } from 'src/modules/user/dto/response/user-response.dto';

@Exclude()
export class UserListResponseDto extends PaginateResponseDto<UserResponseDto> {}
