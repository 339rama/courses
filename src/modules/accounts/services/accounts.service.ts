import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Account } from '../models/Account/Account.entity';
import { CrudRequest } from '@nestjsx/crud';
import { AccountExtendedDto } from '../dto/AccountExtended';
import { AccountsSubscriptionsService } from './account-subscription.service';

@Injectable()
export class AccountsService extends TypeOrmCrudService<Account> {
  constructor(
    @InjectRepository(Account)
    private readonly accountsRepository: Repository<Account>,
    private readonly accountsSubscriptionsService: AccountsSubscriptionsService,
  ) {
    super(accountsRepository);
  }

  public getRepo() {
    return this.accountsRepository;
  }

  // TODO calculate "is_leader" field
  public async getOneExtended(req: CrudRequest): Promise<AccountExtendedDto> {
    const account = await this.getOne(req);
    const last_subscription = await this.accountsSubscriptionsService.getAccountLastSubscription(
      account,
    );
    const is_subscription_actual = last_subscription ? true : false;
    const is_leader = false;
    return { ...account, is_subscription_actual, is_leader };
  }
}
