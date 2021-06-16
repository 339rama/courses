import { Injectable } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { InjectRepository } from '@nestjs/typeorm';
import { AccountConfirmCode } from '../models/AccountConfirmCode.entity';
import { Repository } from 'typeorm';
import { Account } from '../models/Account/Account.entity';
import { WrongCodeException } from '../exceptions/WrongCode.exception';
import { MailService } from 'src/modules/mail/services/mail.service';
import { ConfigService } from '@nestjs/config';
import { EmailConfirmException } from '../exceptions/EmailConfirm.exception';
import { EmailConfirmDto } from '../dto/EmailConfirmDto';
import { EmailTakenException } from '../exceptions/EmailTaken.exception';

@Injectable()
export class AccountsEmailService {
  constructor(
    @InjectRepository(AccountConfirmCode)
    private readonly accountsConfirmCodesRepository: Repository<AccountConfirmCode>,
    private readonly accountsService: AccountsService,
    private readonly mailService: MailService,
    private readonly config: ConfigService,
  ) {}

  private async sendEmailTo(
    type: 'CONFIRM' | 'CHANGE',
    account: Account,
    code: string,
  ): Promise<void> {
    const host = this.config.get('HOST');
    const link =
      type === 'CONFIRM'
        ? `${host}/confirm/original?accountId=${account.id}&code=${code}`
        : `${host}/confirm/changed?accountId=${account.id}&code=${code}`;
    const confirmMessage = `Перейдите по ссылке для подтверждения email - ${link}`;
    await this.mailService.send(confirmMessage, account.email, 'Потверждение почты');
  }

  private getRandomCode(): string {
    return Math.random()
      .toString(36)
      .replace(/[^a-z]+/g, '')
      .substr(0, 16);
  }

  public async confirmEmailSendCode(email: string): Promise<boolean> {
    const account = await this.accountsService.getRepo().findOneOrFail({ email });
    const code = this.getRandomCode();
    await this.accountsConfirmCodesRepository.save({ code, account });
    await this.sendEmailTo('CONFIRM', account, code);
    return true;
  }

  public async confirmEmailDo(payload: EmailConfirmDto): Promise<boolean> {
    const { accountId, code } = payload;
    const confirm = await this.getAccountConfirmOrFail(code);
    const account = confirm.account;
    if (!(account.id !== accountId) || confirm.code !== code) {
      throw new EmailConfirmException();
    }
    await this.accountsService.getRepo().save({ ...account, is_email_confirmed: true });
    return true;
  }

  public async changeEmailSendCode(account: Account, email: string): Promise<boolean> {
    const code = this.getRandomCode();
    const dublicate = await this.accountsService.findOne({ email });
    if (dublicate) {
      throw new EmailTakenException();
    }
    await this.accountsConfirmCodesRepository.save({ code, account });
    await this.sendEmailTo('CHANGE', account, code);
    return true;
  }

  public async changeEmailDo(payload: EmailConfirmDto): Promise<boolean> {
    const { code, accountId } = payload;
    const confirm = await this.getAccountConfirmOrFail(code);
    if (confirm.account.id !== accountId) {
      throw new WrongCodeException();
    }
    await this.accountsService.getRepo().save({ ...confirm.account, is_email_confirmed: true });
    return true;
  }

  public async getAccountConfirmOrFail(code: string): Promise<AccountConfirmCode> {
    return await this.accountsConfirmCodesRepository
      .createQueryBuilder('confirm')
      .leftJoinAndSelect('confirm.account', 'account')
      .where('confirm.code = :code', { code })
      .getOneOrFail();
  }

  public async confirmEmail(code: string): Promise<boolean> {
    const confirm = await this.getAccountConfirmOrFail(code);
    const account = confirm.account;
    await this.accountsService.getRepo().save({ ...account, is_email_confirmed: true });
    return true;
  }
}
