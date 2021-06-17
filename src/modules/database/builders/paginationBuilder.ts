import { PaginationDto } from 'src/core/dto/PaginationDto';
import { SelectQueryBuilder } from 'typeorm';

export const queryPaginationBuilder = <T>(
  builder: SelectQueryBuilder<T>,
  pagination?: PaginationDto,
): SelectQueryBuilder<T> => {
  if (pagination?.limit) {
    builder.limit(pagination.limit);
  }
  if (pagination?.skip) {
    builder.skip(pagination.skip);
  }
  return builder;
};
