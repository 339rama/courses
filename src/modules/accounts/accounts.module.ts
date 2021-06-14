import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountsController } from './controllers/accounts.controller';
import { Account } from './models/Account/Account.entity';
import { AccountLessonTimeCode } from './models/AccountLessonTimeCode.entity';
import { AccountSession } from './models/AccountSession.entity';
import { AccountSubscription } from './models/AccountSubscription.entity';
import { AccountsSubscriptionsService } from './services/account-subscription.service';
import { AccountsAuthService } from './services/accounts-auth.service';
import { AccountsEmailService } from './services/accounts-email.service';
import { AccountsLeadersService } from './services/accounts-leaders.service';
import { AccountsPasswordService } from './services/accounts-password.service';
import { AccountsSessionsService } from './services/accounts-session.service';
import { AccountsService } from './services/accounts.service';

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([Account, AccountSubscription, AccountSession, AccountLessonTimeCode]),
  ],
  controllers: [AccountsController],
  providers: [
    AccountsService,
    AccountsSessionsService,
    AccountsSubscriptionsService,
    AccountsLeadersService,
    AccountsAuthService,
    AccountsEmailService,
    AccountsPasswordService,
  ],
  exports: [
    AccountsService,
    AccountsSessionsService,
    AccountsSubscriptionsService,
    AccountsLeadersService,
  ],
})
export class AccountsModule {}
