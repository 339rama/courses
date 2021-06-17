import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { PaginationDto } from '../dto/PaginationDto';

export const PaginationParams = createParamDecorator(
  async (
    keys: { limit?: string; skip?: string } = { limit: 'limit', skip: 'skip' },
    context: ExecutionContext,
  ): Promise<PaginationDto | undefined> => {
    const req = context.switchToHttp().getRequest() as Request;
    const query = req.query;
    const pagination = {} as PaginationDto;
    if (query[keys.limit]) {
      pagination.limit = +query[keys.limit];
    }
    if (query[keys.skip]) {
      pagination.skip = +query[keys.skip];
    }
    return pagination;
  },
);
