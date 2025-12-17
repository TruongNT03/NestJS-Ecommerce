import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/base.service';
import { Voucher } from 'src/entities/voucher.entity';
import { DataSource, Repository } from 'typeorm';
import { ListVoucherQueryDto } from './dto/request/list-voucher-query.dto';
import { plainToInstance } from 'class-transformer';
import { UserRequestPayload } from '../auth/auth.interface';
import { ListVoucherResponseDto } from './dto/response/list-voucher-response.dto';
import { TakeVoucherDto } from './dto/request/take-voucher.dto';
import { SuccessResponseDto } from 'src/common/dto/success-response.dto';
import { ServerException } from 'src/exceptions/sever.exception';
import { ERROR_RESPONSE } from 'src/common/constants/error-response.constants';
import { UserVoucher } from 'src/entities/user-voucher.entity';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

@Injectable()
export class VoucherService extends BaseService {
  constructor(
    @InjectRepository(Voucher)
    private readonly voucherRepo: Repository<Voucher>,
    @InjectRepository(UserVoucher)
    private readonly userVoucherRepo: Repository<UserVoucher>,
    private readonly dataSource: DataSource,
    @Inject(WINSTON_MODULE_PROVIDER)
    private readonly logger: Logger,
  ) {
    super();
  }

  async findAll(
    dto: ListVoucherQueryDto,
    user: UserRequestPayload,
  ): Promise<ListVoucherResponseDto> {
    const { page, pageSize } = dto;

    const queryBuilder = this.voucherRepo
      .createQueryBuilder('v')
      .leftJoinAndSelect('v.userVouchers', 'userVouchers')
      .where('v.expiryAt > :now', { now: new Date() })
      .andWhere('v.isPublic = TRUE');

    const { data, paginate } = await this.paginate(queryBuilder, page, pageSize);

    return plainToInstance(ListVoucherResponseDto, {
      data: data.map((voucher) => ({
        ...voucher,
        isClaim: voucher.userVouchers.map((userVoucher) => userVoucher.userId).includes(user.id),
      })),
      paginate,
    });
  }

  async takeVoucher(user: UserRequestPayload, dto: TakeVoucherDto): Promise<SuccessResponseDto> {
    const { voucherId } = dto;

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const voucher = await queryRunner.manager.findOne(Voucher, {
        where: { id: voucherId },
        lock: { mode: 'pessimistic_write' },
      });

      const userVoucher = await queryRunner.manager.findOne(UserVoucher, {
        where: { userId: user.id, voucherId },
      });
      if (userVoucher) {
        throw new Error('User already take this voucher before');
      }

      if (voucher.stock <= 0) {
        throw new Error('The vouchers have run out');
      }
      if (voucher.expiryAt.getTime() < Date.now()) {
        throw new Error('The vouchers have expiry');
      }

      await queryRunner.manager.save(UserVoucher, {
        voucherId,
        userId: user.id,
      });

      await queryRunner.manager.update(
        Voucher,
        {
          id: voucherId,
        },
        { stock: voucher.stock - 1 },
      );

      await queryRunner.commitTransaction();
      return this.successResponse();
    } catch (error) {
      this.logger.error(error?.message || 'Fail to take voucher', {
        context: 'VoucherService.takeVoucher',
        error,
      });

      await queryRunner.rollbackTransaction();
      throw new ServerException({ ...ERROR_RESPONSE.BAD_REQUEST, message: error?.message });
    } finally {
      await queryRunner.release();
    }
  }

  async findAllPersonalVoucher(
    user: UserRequestPayload,
    query: ListVoucherQueryDto,
  ): Promise<ListVoucherResponseDto> {
    const { page, pageSize } = query;

    const queryBuilder = this.voucherRepo
      .createQueryBuilder('v')
      .leftJoinAndSelect('v.userVouchers', 'uv')
      .where('uv.userId = :userId', { userId: user.id })
      .andWhere('uv.isUsed = FALSE');

    const { data, paginate } = await this.paginate(queryBuilder, page, pageSize);
    return plainToInstance(ListVoucherResponseDto, {
      data,
      paginate,
    });
  }
}
