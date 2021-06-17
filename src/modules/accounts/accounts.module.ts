import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailModule } from '../mail/mail.module';
import { MailService } from '../mail/services/mail.service';
import { AccountsController } from './controllers/accounts.controller';
import { Account } from './models/Account/Account.entity';
import { AccountConfirmCode } from './models/AccountConfirmCode.entity';
import { AccountLessonTimeCode } from './models/AccountLessonTimeCode.entity';
import { AccountsAuthService } from './services/accounts-auth.service';
import { AccountsEmailService } from './services/accounts-email.service';
import { AccountsLeadersService } from './services/accounts-leaders.service';
import { AccountsPasswordService } from './services/accounts-password.service';
import { AccountsService } from './services/accounts.service';

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([Account, AccountLessonTimeCode, AccountConfirmCode]),
    MailModule,
  ],

  controllers: [AccountsController],
  providers: [
    MailService,
    AccountsService,
    AccountsLeadersService,
    AccountsAuthService,
    AccountsEmailService,
    AccountsPasswordService,
  ],
  exports: [AccountsService, AccountsLeadersService],
})
export class AccountsModule {}
