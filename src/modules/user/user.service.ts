import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { BaseService } from 'src/base.service';
import { UserShareService } from './user-share.service';

@Injectable()
export class UserService extends BaseService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly userShareService: UserShareService,
  ) {
    super();
  }
}
