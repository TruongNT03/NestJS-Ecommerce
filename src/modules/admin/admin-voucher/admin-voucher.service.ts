import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/base.service';
import { Voucher } from 'src/entities/voucher.entity';
import { Brackets, Repository } from 'typeorm';
import { AdminCreateVoucherDto } from './dto/request/admin-create-voucher.dto';
import { SuccessResponseDto } from 'src/common/dto/success-response.dto';
import { AdminListVoucherQueryDto } from './dto/request/admin-list-voucher-query.dto';
import { AdminListVoucherResponseDto } from './dto/response/admin-list-voucher-response.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class AdminVoucherService extends BaseService {
  constructor(
    @InjectRepository(Voucher)
    private readonly voucherRepo: Repository<Voucher>,
  ) {
    super();
  }

  async create(dto: AdminCreateVoucherDto): Promise<SuccessResponseDto> {
    await this.voucherRepo.save({
      ...dto,
    });

    return this.successResponse();
  }

  async findAll(dto: AdminListVoucherQueryDto): Promise<AdminListVoucherResponseDto> {
    const { page, pageSize, search, typeFilter } = dto;

    const queryBuilder = this.voucherRepo.createQueryBuilder('v');

    if (search) {
      queryBuilder.where(
        new Brackets((qb) =>
          qb
            .where('LOWER(v.code) LIKE :search', { search: `%${search.toLowerCase()}%` })
            .orWhere('LOWER(v.campaignName) LIKE :search', { search: `%${search.toLowerCase()}%` })
            .orWhere('LOWER(v.description) LIKE :search', { search: `%${search.toLowerCase()}%` }),
        ),
      );
    }

    if (typeFilter) {
      queryBuilder.andWhere('v.type = :type', { type: typeFilter });
    }

    const { data, paginate } = await this.paginate(queryBuilder, page, pageSize);
    return plainToInstance(AdminListVoucherResponseDto, {
      data,
      paginate,
    });
  }
}
