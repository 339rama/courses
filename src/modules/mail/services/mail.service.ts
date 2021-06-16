import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private readonly service: MailerService) {}

  public async send(message: string, to: string, subject: string): Promise<void> {
    return await this.service.sendMail({
      to,
      subject,
      from: 'noreply@mail.com',
      text: message,
      // html: '<b>welcome</b>',
    });
  }
}
