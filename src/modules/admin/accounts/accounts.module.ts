import { Module } from '@nestjs/common';
import { AdminAccountsController } from './controllers/accounts.controller';

@Module({
  imports: [],
  controllers: [AdminAccountsController],
  providers: [],
})
export class AdminAccountsModule {}
