import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/base.service';
import { Location } from 'src/entities/location.entity';
import { Brackets, Repository } from 'typeorm';
import { AdminCreateLocationDto } from './dto/request/admin-create-location-response.dto';
import { SuccessResponseDto } from 'src/common/dto/success-response.dto';
import { AdminListLocationQueryDto } from './dto/request/admin-list-location-query.dto';
import { AdminListLocationResponseDto } from './dto/response/admin-list-location-response.dto';
import { plainToInstance } from 'class-transformer';
import { AdminUpdateLocationDto } from './dto/request/admin-update-location.dto';
import { ServerException } from 'src/exceptions/sever.exception';
import { ERROR_RESPONSE } from 'src/common/constants/error-response.constants';

@Injectable()
export class AdminLocationService extends BaseService {
  constructor(
    @InjectRepository(Location)
    private readonly locationRepo: Repository<Location>,
  ) {
    super();
  }

  async create(dto: AdminCreateLocationDto): Promise<SuccessResponseDto> {
    await this.locationRepo.save({ ...dto });
    return this.successResponse();
  }

  async findAll(dto: AdminListLocationQueryDto): Promise<AdminListLocationResponseDto> {
    const { page, pageSize, search } = dto;
    const queryBuilder = this.locationRepo.createQueryBuilder('location');
    if (search) {
      queryBuilder.where(
        new Brackets((qb) =>
          qb
            .where('LOWER(location.address) LIKE :search', {
              search: `%${search.toLocaleLowerCase()}%`,
            })
            .orWhere('LOWER(location.hotline) LIKE :search', {
              search: `%${search.toLocaleLowerCase()}%`,
            })
            .orWhere('LOWER(location.openTIme) LIKE :search', {
              search: `%${search.toLocaleLowerCase()}%`,
            })
            .orWhere('LOWER(location.closeTime) LIKE :search', {
              search: `%${search.toLocaleLowerCase()}%`,
            })
            .orWhere('LOWER(location.openDate) LIKE :search', {
              search: `%${search.toLocaleLowerCase()}%`,
            }),
        ),
      );
    }

    const { data, paginate } = await this.paginate(queryBuilder, page, pageSize);
    return plainToInstance(AdminListLocationResponseDto, {
      data,
      paginate,
    });
  }

  async update(id: string, dto: AdminUpdateLocationDto): Promise<SuccessResponseDto> {
    const location = await this.findOne(id);
    await this.locationRepo.save({
      id,
      ...dto,
    });

    return this.successResponse();
  }

  async findOne(id: string) {
    const location = await this.locationRepo.findOneBy({ id });
    if (!location) {
      throw new ServerException(ERROR_RESPONSE.NOT_FOUND);
    }
  }
}
