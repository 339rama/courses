import { Body, Controller, Get, HttpCode, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBody, ApiResponse } from '@nestjs/swagger';
import { Crud, CrudController } from '@nestjsx/crud';
import { PaginationParams } from 'src/core/decorators/PaginationParams.decorator';
import { TransformedBody } from 'src/core/decorators/TransformBody.decorator';
import { BooleanResponse } from 'src/core/dto/BooleanResponse';
import { PaginationDto } from 'src/core/dto/PaginationDto';
import { booleanResponse } from 'src/core/helpers/booleanResponse';
import { AccountDecorator } from 'src/modules/admin/auth/decorators/user.decorator';
import { Token } from 'src/modules/auth/dto/Token';
import { LocalAuthGuard } from 'src/modules/auth/guards/localAuth.guard';
import { AuthService } from 'src/modules/auth/services/auth.service';
import JwtAuthenticationGuard from '../../auth/guards/jwt.guard';
import { AccountLoginDto } from '../dto/AccountLoginDto';
import { AccountRegisterDto } from '../dto/AccountRegisterDto';
import { ChangePasswordDto } from '../dto/ChangePasswordDto';
import { EmailConfirmDto } from '../dto/EmailConfirmDto';
import { RestorePasswordDto } from '../dto/RestorePasswordDto';
import { Account } from '../models/Account/Account.entity';
import { AccountsAuthService } from '../services/accounts-auth.service';
import { AccountsEmailService } from '../services/accounts-email.service';
import { AccountsLeadersService } from '../services/accounts-leaders.service';
import { AccountsPasswordService } from '../services/accounts-password.service';
import { AccountsService } from '../services/accounts.service';

@Crud({
  model: {
    type: Account,
  },
  query: {
    exclude: ['hash_password'],
  },
})
@Controller('accounts')
export class AccountsController implements CrudController<Account> {
  constructor(
    public service: AccountsService,
    private readonly authService: AuthService,
    private readonly accountAuthService: AccountsAuthService,
    private readonly accountsEmailService: AccountsEmailService,
    private readonly accountsPasswordService: AccountsPasswordService,
    private readonly accounsLeadersService: AccountsLeadersService,
  ) {}

  get base(): CrudController<Account> {
    return this;
  }

  @Post('register')
  async register(@TransformedBody() data: AccountRegisterDto): Promise<Token> {
    return await this.accountAuthService.register(data);
  }

  @Post('confirmEmail/sendCode')
  async confirmEmailSendCode(@Body() data: { email: string }): Promise<boolean> {
    return await this.accountsEmailService.confirmEmailSendCode(data.email);
  }

  @Post('confirmEmail/do')
  async confirmEmailDo(@TransformedBody() data: EmailConfirmDto): Promise<boolean> {
    return await this.accountsEmailService.confirmEmailDo(data);
  }

  @Post('changeEmail/sendCode')
  @UseGuards(JwtAuthenticationGuard)
  async changeEmailSendCode(
    @AccountDecorator() account: Account,
    @Body() data: { email: string },
  ): Promise<BooleanResponse> {
    await this.accountsEmailService.changeEmailSendCode(account, data.email);
    return booleanResponse();
  }

  @Post('changeEmail/do')
  @UseGuards(JwtAuthenticationGuard)
  async changeEmailDo(
    @AccountDecorator() account: Account,
    @TransformedBody() data: EmailConfirmDto,
  ): Promise<BooleanResponse> {
    await this.accountsEmailService.changeEmailDo(data);
    return booleanResponse();
  }

  @Post('changePassword')
  @UseGuards(JwtAuthenticationGuard)
  async changePassword(
    @AccountDecorator() account: Account,
    @TransformedBody() data: ChangePasswordDto,
  ): Promise<void> {
    return await this.accountsPasswordService.changePassword(account, data);
  }

  @Post('restorePassword/sendCode')
  async restorePasswordSendCode(@Body() data: { email: any }): Promise<BooleanResponse> {
    await this.accountsPasswordService.restorePasswordSendCode(data.email);
    return booleanResponse();
  }

  @Post('restorePassword/do')
  async restorePasswordDo(@TransformedBody() data: RestorePasswordDto): Promise<BooleanResponse> {
    await this.accountsPasswordService.restorePasswordDo(data);
    return booleanResponse();
  }

  @ApiBody({ type: AccountLoginDto })
  @ApiResponse({
    status: 200,
    description: 'Success login',
    type: Token,
  })
  @HttpCode(200)
  @UseGuards(LocalAuthGuard)
  @Post('auth/base')
  async authBase(@AccountDecorator() account: Account): Promise<Token> {
    return this.authService.getTokenResponse(this.authService.getToken(account.id));
  }

  @Get('me')
  @UseGuards(JwtAuthenticationGuard)
  async myAccount(@AccountDecorator() account: Account): Promise<Account> {
    return account;
  }

  @Get('leaders')
  async leaders(@PaginationParams() params: PaginationDto): Promise<Account[]> {
    return await this.accounsLeadersService.getLeaders(params);
  }

  @Patch('')
  @UseGuards(JwtAuthenticationGuard)
  public async updateMe(
    @AccountDecorator() account: Account,
    @TransformedBody() data: Partial<Account>,
  ): Promise<Account> {
    return this.service.updateMe({ ...account, ...data });
  }
}
