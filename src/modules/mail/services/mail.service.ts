import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private readonly service: MailerService) {}

  public async send(message: string, to: string, subject: string): Promise<void> {
    console.log(message, to, subject);

    // return await this.service.sendMail({
    //   to,
    //   subject,
    //   text: message,
    //   // html: '<b>welcome</b>',
    // });
  }
}
