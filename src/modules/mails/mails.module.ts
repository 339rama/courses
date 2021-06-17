import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { MailService } from '../mail/services/mail.service';

@Module({
  imports: [MailerModule],
  controllers: [],
  providers: [MailService],
})
export class MailsModule {}
