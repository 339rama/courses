import { Module } from '@nestjs/common';
import { AdminAccountsModule } from './accounts/accounts.module';
import { AdminAuthModule } from './auth/auth.module';

@Module({
  imports: [AdminAuthModule, AdminAccountsModule],
  controllers: [],
  providers: [],
})
export class AdminModule {}
