import { Body, Controller, Get, HttpCode, Post, UseGuards } from '@nestjs/common';
import { ApiBody, ApiResponse } from '@nestjs/swagger';
import { Crud, CrudController } from '@nestjsx/crud';
import { AccountDecorator } from 'src/modules/admin/auth/decorators/user.decorator';
import { Token } from 'src/modules/auth/dto/Token';
import { LocalAuthGuard } from 'src/modules/auth/guards/localAuth.guard';
import { AuthService } from 'src/modules/auth/services/auth.service';
import JwtAuthenticationGuard from '../../auth/guards/jwt.guard';
import { AccountLoginDto } from '../dto/AccountLoginDto';
import { AccountRegisterDto } from '../dto/AccountRegisterDto';
import { ChangePasswordDto } from '../dto/ChangePasswordDto';
import { EmailConfirmDto } from '../dto/EmailConfirmDto';
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
  async register(data: AccountRegisterDto): Promise<Token> {
    return await this.accountAuthService.register(data);
  }

  @Post('confirmEmail/sendCode')
  async confirmEmailSendCode(@Body() data: { email: string }): Promise<boolean> {
    return await this.accountsEmailService.confirmEmailSendCode(data.email);
  }

  @Post('confirmEmail/do')
  async confirmEmailDo(@Body() data: EmailConfirmDto): Promise<boolean> {
    return await this.accountsEmailService.confirmEmailDo(data);
  }

  @Post('changeEmail/sendCode')
  async changeEmailSendCode(
    @AccountDecorator() account: Account,
    @Body() data: { email: string },
  ): Promise<boolean> {
    return await this.accountsEmailService.changeEmailSendCode(account, data.email);
  }

  @Post('changeEmail/do')
  async changeEmailDo(
    @AccountDecorator() account: Account,
    @Body() data: EmailConfirmDto,
  ): Promise<boolean> {
    return await this.accountsEmailService.changeEmailDo(data);
  }

  @Post('changePassword')
  async changePassword(
    @AccountDecorator() account: Account,
    @Body() data: ChangePasswordDto,
  ): Promise<void> {
    return await this.accountsPasswordService.changePassword(account, data);
  }

  @Post('restorePassword/sendCode')
  async restorePasswordSendCode(@Body() data: { email: any }): Promise<boolean> {
    return await this.accountsPasswordService.restorePasswordSendCode(data.email);
  }

  @Post('restorePassword/do')
  async restorePasswordDo(
    @Body() data: { accountId: number; code: string; newPassword: any },
  ): Promise<boolean> {
    return await this.accountsPasswordService.restorePasswordDo(data);
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
  @UseGuards(JwtAuthenticationGuard)
  async leaders(): Promise<Account[]> {
    return await this.accounsLeadersService.getLeaders();
  }
}
