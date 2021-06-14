import { Injectable } from '@nestjs/common';
import { Token } from 'src/modules/auth/dto/Token';
import { AuthService } from 'src/modules/auth/services/auth.service';
import { AccountRegisterDto } from '../dto/AccountRegisterDto';
import { Account } from '../models/Account/Account.entity';
import { AccountsSessionsService } from './accounts-session.service';
import { AccountsService } from './accounts.service';
import { AccountsPasswordService } from './accounts-password.service';

@Injectable()
export class AccountsAuthService {
  constructor(
    private readonly accountsService: AccountsService,
    private readonly accountsSessionsService: AccountsSessionsService,
    private readonly authService: AuthService,
    private readonly accountsPasswordService: AccountsPasswordService,
  ) {}

  public async register(data: AccountRegisterDto): Promise<Token> {
    const account_data = {} as Account;
    account_data.hash_password = this.accountsPasswordService.getHashPassword(data.password);
    const account = await this.accountsService.getRepo().save(account_data);
    await this.accountsSessionsService.createSession({
      account,
      device_registration_id: data.device_registration_id,
    });
    return this.authService.getTokenResponse(this.authService.getToken(account.id));
  }
}
