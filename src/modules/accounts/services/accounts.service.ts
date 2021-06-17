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

  public async getManyExtended(req: CrudRequest): Promise<AccountExtendedDto[]> {
    const res = (await this.getMany(req)) as any;
    if (res?.data) {
      res.data = res.data.map(account => ({ ...account, is_leader: !!account?.courses?.length }));
      return res;
    }
    return res.map(account => ({ ...account, is_leader: !!account?.courses?.length }));
  }

  public async getOneExtended(req: CrudRequest): Promise<AccountExtendedDto> {
    const account = await this.getOne(req);
    return { ...account, is_leader: !!account?.courses?.length };
  }

  public async updateMe(data: Partial<Account>): Promise<Account> {
    return this.getRepo().save(data);
  }
}
