import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Account } from '../models/Account/Account.entity';
import { CrudRequest } from '@nestjsx/crud';
import { AccountExtendedDto } from '../dto/AccountExtended';

@Injectable()
export class AccountsService extends TypeOrmCrudService<Account> {
  constructor(
    @InjectRepository(Account)
    private readonly accountsRepository: Repository<Account>,
  ) {
    super(accountsRepository);
  }

  public getRepo() {
    return this.accountsRepository;
  }

  public accountRelationsBuilder(account: Account, relation: string) {
    return this.getRepo()
      .createQueryBuilder()
      .relation(relation)
      .of(account);
  }

  // TODO calculate "is_leader" field
  public async getManyExtended(req: CrudRequest): Promise<AccountExtendedDto[]> {
    const accounts = (await this.getMany(req)) as Account[];
    return accounts.map(account => ({ ...account, is_leader: true, is_subscription_actual: true }));
  }

  public async getOneExtended(req: CrudRequest): Promise<AccountExtendedDto> {
    const account = await this.getOne(req);
    const is_leader = false;
    return { ...account, is_leader };
  }
}
