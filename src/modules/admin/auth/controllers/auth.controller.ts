import { Controller, HttpCode, Post, UseGuards } from '@nestjs/common';
import { ApiBody, ApiResponse } from '@nestjs/swagger';
import { Account } from 'src/modules/accounts/models/Account/Account.entity';
import { Token } from 'src/modules/auth/dto/Token';
import { LocalAuthGuard } from 'src/modules/auth/guards/localAuth.guard';
import { AdminLoginDto } from '../dto/LoginDto';
import { AccountDecorator } from '../decorators/user.decorator';
import { AdminAuthService } from '../service/auth.service';

@Controller('admin/auth')
export class AdminAuthController {
  constructor(private readonly authService: AdminAuthService) {}

  @ApiBody({ type: AdminLoginDto })
  @ApiResponse({
    status: 200,
    description: 'Success login',
    type: Token,
  })
  @HttpCode(200)
  @UseGuards(LocalAuthGuard)
  @Post('base')
  async login(@AccountDecorator() account: Account) {
    return await this.authService.login(account);
  }
}
