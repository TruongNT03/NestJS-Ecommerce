import { Injectable } from '@nestjs/common';
import { UserRequestPayload } from '../auth/auth.interface';
import { CreateAddressDto } from './dto/request/create-address.dto';
import { SuccessResponseDto } from 'src/common/dto/success-response.dto';
import { BaseService } from 'src/base.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Address } from 'src/entities/address.entity';
import { Repository } from 'typeorm';
import { ListAddressQueryDto } from './dto/request/list-address-query.dto';
import { plainToInstance } from 'class-transformer';
import { ListAddressResponseDto } from './dto/response/list-address-response.dto';
import { UpdateAddressDto } from './dto/request/update-address.dto';
import { ServerException } from 'src/exceptions/sever.exception';
import { ERROR_RESPONSE } from 'src/common/constants/error-response.constants';

@Injectable()
export class AddressService extends BaseService {
  constructor(
    @InjectRepository(Address)
    private readonly addressRepo: Repository<Address>,
  ) {
    super();
  }

  async create(
    user: UserRequestPayload,
    dto: CreateAddressDto,
  ): Promise<SuccessResponseDto> {
    const userId = user.id;
    const { address } = dto;
    await this.addressRepo.save({
      userId,
      address,
    });
    return this.successResponse();
  }

  async findAll(
    user: UserRequestPayload,
    dto: ListAddressQueryDto,
  ): Promise<ListAddressResponseDto> {
    const { page, pageSize } = dto;

    const queryBuilder = this.addressRepo
      .createQueryBuilder('address')
      .where('address.userId = :userId', { userId: user.id });

    const { data, paginate } = await this.paginate(
      queryBuilder,
      page,
      pageSize,
    );

    return plainToInstance(ListAddressResponseDto, { data, paginate });
  }

  async update(id: string, dto: UpdateAddressDto): Promise<SuccessResponseDto> {
    const { address } = dto;

    const existAddress = await this.addressRepo.findOneBy({ id });
    if (!existAddress) {
      throw new ServerException({
        ...ERROR_RESPONSE.NOT_FOUND,
        message: 'Address not found',
      });
    }

    await this.addressRepo.save({
      id,
      address,
    });

    return this.successResponse();
  }
}
