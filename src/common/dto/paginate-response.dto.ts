import { PaginateMetaDto } from './paginate-meta.dto';

export abstract class PaginateResponseDto<T> {
  abstract data: T[];

  abstract paginate: PaginateMetaDto;
}
