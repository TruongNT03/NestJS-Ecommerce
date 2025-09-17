import { Injectable } from '@nestjs/common';
import { UserListResponseDto } from './response/list-user-response.dto';

@Injectable()
export class AdminUserService {
  async findAll(): Promise<UserListResponseDto> {
    return;
  }
}
