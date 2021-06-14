import { Controller, UseGuards } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { Account } from 'src/modules/accounts/models/Account/Account.entity';
import { AccountsService } from 'src/modules/accounts/services/accounts.service';
import JwtAuthenticationGuard from 'src/modules/auth/guards/jwt.guard';

@Crud({
  model: {
    type: Account,
  },
  query: {
    exclude: ['hash_password'],
    join: {
      subscriptions: { eager: true },
    },
  },
})
@Controller('admin/accounts')
@UseGuards(JwtAuthenticationGuard)
export class AdminAccountsController implements CrudController<Account> {
  constructor(public service: AccountsService) {}

  get base(): CrudController<Account> {
    return this;
  }
}
