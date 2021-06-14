import { Injectable } from '@nestjs/common';
import { Account } from '../models/Account/Account.entity';
import { AccountsService } from './accounts.service';

@Injectable()
export class AccountsLeadersService {
  constructor(private readonly accountsService: AccountsService) {}

  public async getLeaders(): Promise<Account[]> {
    // TODO return only accounts with cources
    return this.accountsService.find();
  }
}
