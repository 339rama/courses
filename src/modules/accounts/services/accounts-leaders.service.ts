import { Injectable } from '@nestjs/common';
import { PaginationDto } from 'src/core/dto/PaginationDto';
import { queryPaginationBuilder } from 'src/modules/database/builders/paginationBuilder';
import { Account } from '../models/Account/Account.entity';
import { AccountsService } from './accounts.service';

@Injectable()
export class AccountsLeadersService {
  constructor(private readonly accountsService: AccountsService) {}

  public async getLeaders(pagination?: PaginationDto): Promise<Account[]> {
    return queryPaginationBuilder(
      this.accountsService
        .getRepo()
        .createQueryBuilder('account')
        .innerJoinAndSelect('account.courses', 'courses'),
      pagination,
    ).getMany();
  }
}
