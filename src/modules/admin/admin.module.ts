import { Module } from '@nestjs/common';
import { AdminAccountsModule } from './accounts/accounts.module';
import { AdminAuthModule } from './auth/auth.module';
import { AdminCoursesModule } from './courses/courses.module';

@Module({
  imports: [AdminAuthModule, AdminAccountsModule, AdminCoursesModule],
  controllers: [],
  providers: [],
})
export class AdminModule {}
