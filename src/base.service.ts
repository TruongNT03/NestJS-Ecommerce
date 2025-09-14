import { SelectQueryBuilder } from 'typeorm';
import { SuccessReponseDto } from './common/dto/success-response.dto';
import { PAGINATE_CONSTANTS } from './common/constants/paginate.constants';
import { PaginateResponseDto } from './common/dto/paginate-response.dto';

export class BaseService {
  protected async paginate<T>(
    queryBuilder: SelectQueryBuilder<T>,
    page: number = PAGINATE_CONSTANTS.PAGE,
    pageSize: number = PAGINATE_CONSTANTS.PAGE_SIZE,
  ): Promise<PaginateResponseDto<T>> {
    const result = await queryBuilder
      .take(pageSize)
      .skip((page - 1) * pageSize)
      .getManyAndCount();
    const data = result[0];
    const totalItem = result[1];
    const totalPage = pageSize > 0 ? Math.ceil(totalItem / pageSize) : 1;
    return {
      data,
      paginate: {
        page,
        pageSize,
        totalItem,
        totalPage,
      },
    };
  }

  protected suceesResponse(): SuccessReponseDto {
    return {
      success: true,
    };
  }
}
