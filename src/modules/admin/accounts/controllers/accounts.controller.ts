import { Controller, Get, UseGuards, UseInterceptors } from '@nestjs/common';
import { Crud, CrudController, CrudRequest, Override, ParsedRequest } from '@nestjsx/crud';
import { listResponseInterceptor } from 'src/core/interceptors/ListResponse.interceptor';
import { AccountExtendedDto } from 'src/modules/accounts/dto/AccountExtended';
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
      courses: { eager: true },
    },
    alwaysPaginate: true,
  },
  routes: { getManyBase: { decorators: [UseInterceptors(listResponseInterceptor('accounts'))] } },
})
@Controller('admin/accounts')
@UseGuards(JwtAuthenticationGuard)
export class AdminAccountsController implements CrudController<Account> {
  constructor(public service: AccountsService) {}

  get base(): CrudController<Account> {
    return this;
  }

  @Override()
  @Get()
  async getOne(@ParsedRequest() req: CrudRequest): Promise<AccountExtendedDto> {
    return await this.service.getOneExtended(req);
  }

  @Override()
  @Get()
  async getMany(@ParsedRequest() req: CrudRequest): Promise<AccountExtendedDto[]> {
    return await this.service.getManyExtended(req);
  }
}
