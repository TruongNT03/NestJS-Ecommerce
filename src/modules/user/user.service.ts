import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { SuccessReponseDto } from 'src/common/dto/success-response.dto';
import { ServerException } from 'src/exceptions/sever.exception';
import { ERROR_RESPONSE } from 'src/common/constants/error-response.constants';
import { hassingPassword } from 'src/common/utils/hash.util';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(dto: CreateUserDto): Promise<SuccessReponseDto> {
    const existUser = await this.findOneByEmail(dto.email);
    if (existUser) {
      throw new ServerException(ERROR_RESPONSE.EMAIL_ALREADY_EXIST);
    }
    const user = await this.userRepository.save({
      email: dto.email,
      password: dto.password,
    });

    return {
      id: user.id,
    };
  }

  async findOneByEmail(email: string): Promise<User | null> {
    return await this.userRepository.findOneBy({ email: email });
  }
}
