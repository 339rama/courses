import { Injectable } from '@nestjs/common';
import { Account } from 'src/modules/accounts/models/Account/Account.entity';
import { Token } from 'src/modules/auth/dto/Token';
import { AuthService } from 'src/modules/auth/services/auth.service';

@Injectable()
export class AdminAuthService {
  constructor(private readonly authService: AuthService) {}

  public async login(account: Account): Promise<Token> {
    return this.authService.getTokenResponse(this.authService.getToken(account.id));
  }
}
