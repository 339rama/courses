import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { ConfigService } from '@nestjs/config';
import { AccountSubscription } from '../models/AccountSubscription.entity';
import { Account } from '../models/Account/Account.entity';

@Injectable()
export class AccountsSubscriptionsService extends TypeOrmCrudService<AccountSubscription> {
  constructor(
    @InjectRepository(AccountSubscription)
    private readonly accountsSubscriptionsRepository: Repository<AccountSubscription>,
    private readonly config: ConfigService,
  ) {
    super(accountsSubscriptionsRepository);
  }

  public getRepo() {
    return this.accountsSubscriptionsRepository;
  }

  public async getAccountLastSubscription(account: Account): Promise<AccountSubscription> {
    return this.accountsSubscriptionsRepository
      .createQueryBuilder('subscription')
      .leftJoinAndSelect('subscription.account', 'account')
      .where('account.id = :id', { id: account.id })
      .orderBy('subscription.created_at', 'ASC')
      .getOne();
  }
}
