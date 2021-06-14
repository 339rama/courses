import { Module } from '@nestjs/common';
import { AdminAuthController } from './controllers/auth.controller';
import { AdminAuthService } from './service/auth.service';

@Module({
  imports: [],
  controllers: [AdminAuthController],
  providers: [AdminAuthService],
})
export class AdminAuthModule {}
