import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { SuccessReponseDto } from 'src/common/dto/success-response.dto';
import { ServerException } from 'src/exceptions/sever.exception';
import { ERROR_RESPONSE } from 'src/common/constants/error-response.constants';
import { hassingPassword } from 'src/common/utils/hash.util';
import { SaveEntityResponseDto } from 'src/common/dto/save-entity-response.dto';
import { UserResponseDto } from './dto/response/user-response.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(dto: CreateUserDto): Promise<SaveEntityResponseDto> {
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

  async findOneByEmail(email: string): Promise<UserResponseDto> {
    return plainToInstance(
      UserResponseDto,
      await this.userRepository.findOneBy({ email: email }),
    );
  }

  async findOne(id: string): Promise<UserResponseDto> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new ServerException(ERROR_RESPONSE.USER_NOT_FOUND);
    }
    return plainToInstance(UserResponseDto, user);
  }
}
