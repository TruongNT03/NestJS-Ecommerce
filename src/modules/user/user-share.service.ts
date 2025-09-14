import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { UserResponseDto } from './dto/response/user-response.dto';
import { plainToInstance } from 'class-transformer';
import { ServerException } from 'src/exceptions/sever.exception';
import { ERROR_RESPONSE } from 'src/common/constants/error-response.constants';
import { CreateUserDto } from './dto/create-user.dto';
import { SaveEntityResponseDto } from 'src/common/dto/save-entity-response.dto';
import { RoleEntity } from 'src/entities/role.entity';
import { RoleType } from 'src/common/enum/role.enum';
import { UserRequestPayload } from '../auth/auth.interface';
import { UpdateProfileDto } from '../auth/dto/request/update-profile.dto';

@Injectable()
export class UserShareService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
    @InjectRepository(RoleEntity)
    private readonly roleRepository: Repository<RoleEntity>,
  ) {}
  async findOneByEmail(email: string): Promise<UserResponseDto> {
    return plainToInstance(
      UserResponseDto,
      await this.userRepo.findOneBy({ email: email }),
    );
  }

  async findOne(id: string): Promise<UserResponseDto> {
    const user = await this.userRepo.findOne({
      where: { id },
      relations: ['roles'],
    });
    if (!user) {
      throw new ServerException(ERROR_RESPONSE.USER_NOT_FOUND);
    }
    return plainToInstance(UserResponseDto, user);
  }

  async create(dto: CreateUserDto): Promise<SaveEntityResponseDto> {
    const existUser = await this.findOneByEmail(dto.email);
    if (existUser) {
      throw new ServerException(ERROR_RESPONSE.EMAIL_ALREADY_EXIST);
    }
    const userRole = await this.roleRepository.findOneBy({
      name: RoleType.USER,
    });
    const user = this.userRepo.create({
      email: dto.email,
      password: dto.password,
      roles: [userRole],
    });
    await this.userRepo.save(user);

    return {
      id: user.id,
    };
  }

  async updateProfile(
    user: UserRequestPayload,
    dto: UpdateProfileDto,
  ): Promise<SaveEntityResponseDto> {
    const userEntity = await this.findOne(user.id);
    await this.userRepo.update(
      { id: userEntity.id },
      {
        ...dto,
      },
    );
    return {
      id: userEntity.id,
    };
  }
}
