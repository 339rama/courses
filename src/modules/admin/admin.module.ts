import { Module } from '@nestjs/common';
import { AdminAccountsModule } from './accounts/accounts.module';
import { AdminAccountsController } from './accounts/controllers/accounts.controller';
import { AdminAuthModule } from './auth/auth.module';
import { AdminHomeworksController } from './courses/controllers/homeworks.controller';
import { AdminCoursesModule } from './courses/courses.module';

@Module({
  imports: [AdminAuthModule, AdminAccountsModule, AdminCoursesModule],
  controllers: [],
  providers: [],
})
export class AdminModule {}
