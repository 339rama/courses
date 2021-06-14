import { Injectable } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { InjectRepository } from '@nestjs/typeorm';
import { AccountConfirmCode } from '../models/AccountConfirmCode.entity';
import { Repository } from 'typeorm';
import { Account } from '../models/Account/Account.entity';
import { WrongCodeException } from '../exceptions/WrongCode.exception';

@Injectable()
export class AccountsEmailService {
  constructor(
    @InjectRepository(AccountConfirmCode)
    private readonly accountsConfirmCodesRepository: Repository<AccountConfirmCode>,
    private readonly accountsService: AccountsService,
  ) {}

  private async sendEmailCode(email: string): Promise<void> {
    // TODO send email
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
    console.log(code);
    await this.accountsConfirmCodesRepository.save({ code, account });
    await this.sendEmailCode(code);
    return true;
  }

  public async confirmEmailDo(code: string): Promise<boolean> {
    const confirm = await this.getAccountConfirmOrFail(code);
    const account = confirm.account;
    await this.accountsService.getRepo().save({ ...account, is_email_confirmed: true });
    return true;
  }

  public async changeEmailSendCode(account: Account, email: string): Promise<boolean> {
    const code = this.getRandomCode();
    console.log(code);
    await this.accountsConfirmCodesRepository.save({ code, account });
    await this.sendEmailCode(code);
    return true;
  }

  public async changeEmailDo(account: Account, code: string): Promise<boolean> {
    const confirm = await this.getAccountConfirmOrFail(code);
    if (confirm.account.id !== account.id) {
      throw new WrongCodeException();
    }
    await this.accountsService.getRepo().save({ ...account, is_email_confirmed: true });
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
