import { Inject, Injectable } from '@nestjs/common';
import { UserRequestPayload } from '../auth/auth.interface';
import { CreateAddressDto } from './dto/request/create-address.dto';
import { SuccessResponseDto } from 'src/common/dto/success-response.dto';
import { BaseService } from 'src/base.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Address } from 'src/entities/address.entity';
import { DataSource, Repository } from 'typeorm';
import { ListAddressQueryDto } from './dto/request/list-address-query.dto';
import { plainToInstance } from 'class-transformer';
import { ListAddressResponseDto } from './dto/response/list-address-response.dto';
import { UpdateAddressDto } from './dto/request/update-address.dto';
import { ServerException } from 'src/exceptions/sever.exception';
import { ERROR_RESPONSE } from 'src/common/constants/error-response.constants';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

@Injectable()
export class AddressService extends BaseService {
  constructor(
    @InjectRepository(Address)
    private readonly addressRepo: Repository<Address>,
    private readonly dataSource: DataSource,
    @Inject(WINSTON_MODULE_PROVIDER)
    private readonly logger: Logger,
  ) {
    super();
  }

  async create(
    user: UserRequestPayload,
    dto: CreateAddressDto,
  ): Promise<SuccessResponseDto> {
    const userId = user.id;
    const { phoneNumber, name, isDefault, detail } = dto;

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      if (isDefault) {
        await queryRunner.manager.update(
          Address,
          { userId: user.id },
          { isDefault: false },
        );
      }

      await this.addressRepo.save({
        userId,
        phoneNumber,
        name,
        detail,
        isDefault,
      });

      await queryRunner.commitTransaction();
      return this.successResponse();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      this.logger.error('Fail to create address', {
        context: 'AddressService.create',
        error,
      });
    } finally {
      await queryRunner.release();
    }
  }

  async findAll(
    user: UserRequestPayload,
    dto: ListAddressQueryDto,
  ): Promise<ListAddressResponseDto> {
    const { page, pageSize } = dto;

    const queryBuilder = this.addressRepo
      .createQueryBuilder('address')
      .where('address.userId = :userId', { userId: user.id })
      .orderBy('address.isDefault', 'DESC');

    const { data, paginate } = await this.paginate(
      queryBuilder,
      page,
      pageSize,
    );

    return plainToInstance(ListAddressResponseDto, { data, paginate });
  }

  async update(
    id: string,
    dto: UpdateAddressDto,
    user: UserRequestPayload,
  ): Promise<SuccessResponseDto> {
    const { detail, phoneNumber, isDefault } = dto;

    const existAddress = await this.addressRepo.findOneBy({ id });
    if (!existAddress) {
      throw new ServerException({
        ...ERROR_RESPONSE.NOT_FOUND,
        message: 'Address not found',
      });
    }

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      if (isDefault) {
        await queryRunner.manager.update(
          Address,
          { userId: user.id },
          { isDefault: false },
        );
      }

      await this.addressRepo.save({
        id,
        ...dto,
      });

      await queryRunner.commitTransaction();
      return this.successResponse();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      this.logger.error('Fail to update address', {
        context: 'AddressService.update',
        error,
      });
    } finally {
      await queryRunner.release();
    }
  }

  async updateToDefault(
    id: string,
    user: UserRequestPayload,
  ): Promise<SuccessResponseDto> {
    const existAddress = await this.addressRepo.findOneBy({ id });
    if (!existAddress) {
      throw new ServerException({
        ...ERROR_RESPONSE.NOT_FOUND,
        message: 'Address not found',
      });
    }

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      await queryRunner.manager.update(
        Address,
        { userId: user.id },
        { isDefault: false },
      );

      await queryRunner.manager.update(Address, { id }, { isDefault: true });

      await queryRunner.commitTransaction();

      return this.successResponse();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      this.logger.error('Fail to update to default address', {
        context: 'AddressService.updateToDefault',
        error,
      });
    } finally {
      await queryRunner.release();
    }
  }
}
