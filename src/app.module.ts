import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AccountsModule } from './modules/accounts/accounts.module';
import { AdminModule } from './modules/admin/admin.module';
import { AuthModule } from './modules/auth/auth.module';
import { CoursesModule } from './modules/courses/courses.module';
import { DatabaseModule } from './modules/database/database.module';
import { MessagesModule } from './modules/messages/messages.module';
import { PaymentModule } from './modules/payment/paymens.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`./config/.env.${process.env.NODE_ENV}`, './config/.env'],
    }),
    DatabaseModule,
    AccountsModule,
    AuthModule,
    AdminModule,
    CoursesModule,
    MessagesModule,
    PaymentModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}