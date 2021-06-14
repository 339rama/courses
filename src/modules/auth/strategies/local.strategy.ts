import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { WrongCredentialsException } from '../exceptions/WrongCredentialsException';
import { AccountsService } from 'src/modules/accounts/services/accounts.service';
import { Account } from 'src/modules/accounts/models/Account/Account.entity';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AuthService,
    private readonly accountsService: AccountsService,
  ) {
    super({
      usernameField: 'email',
    });
  }
  async validate(email: string, password: string): Promise<Account> {
    const account = await this.accountsService.findOne({ email });
    if (!account) {
      throw new WrongCredentialsException();
    }
    const isVerified = await this.authService.verifyPassword(password, account.hash_password);
    if (!isVerified) {
      throw new WrongCredentialsException();
    }
    return account;
  }
}
