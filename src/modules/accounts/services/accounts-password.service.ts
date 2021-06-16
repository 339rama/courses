import { Injectable } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { InjectRepository } from '@nestjs/typeorm';
import { AccountConfirmCode } from '../models/AccountConfirmCode.entity';
import { Repository } from 'typeorm';
import { WrongEmailException } from '../exceptions/WrongEmail.exception';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { ChangePasswordDto } from '../dto/ChangePasswordDto';
import { Account } from '../models/Account/Account.entity';
import { WrongPasswordException } from '../exceptions/WrongPassword.exception';
import { MailService } from 'src/modules/mail/services/mail.service';
import { WrongCodeException } from '../exceptions/WrongCode.exception';

@Injectable()
export class AccountsPasswordService {
  constructor(
    @InjectRepository(AccountConfirmCode)
    private readonly accountsConfirmCodesRepository: Repository<AccountConfirmCode>,
    private readonly accountsService: AccountsService,
    private readonly config: ConfigService,
    private readonly mailService: MailService,
  ) {}

  private async sendPasswordRecoverEmail(
    email: string,
    accountId: number,
    code: string,
  ): Promise<void> {
    const host = this.config.get('HOST');
    const link = `${host}/auth/recover?accountId=${accountId}&code=${code}`;
    const message = `Для смены пароля перейдите по ссылке - ${link}`;
    await this.mailService.send(message, email, 'Восстановление пароля');
  }

  public getHashPassword(password: string): string {
    const crypt_salt = bcrypt.genSaltSync(+this.config.get('CRYPT_SALT'));
    return bcrypt.hashSync(password, crypt_salt);
  }

  public async changePassword(account: Account, data: ChangePasswordDto): Promise<void> {
    const is_wrong_current = !bcrypt.compare(data.current_password, account.hash_password);
    if (is_wrong_current) {
      throw new WrongPasswordException();
    }
    const hash_password = this.getHashPassword(data.new_password);
    await this.accountsService.getRepo().save({ ...account, hash_password });
  }

  public async restorePasswordSendCode(email: string): Promise<boolean> {
    const account = await this.accountsService.findOne({ email });
    if (!account) {
      throw new WrongEmailException();
    }
    const code = this.getRandomCode();
    await this.sendPasswordRecoverEmail(email, account.id, code);
    await this.accountsConfirmCodesRepository.save({ code, account });
    return true;
  }

  public async restorePasswordDo(payload: {
    accountId: number;
    code: string;
    newPassword: any;
  }): Promise<boolean> {
    const { accountId, code, newPassword } = payload;
    const account = await this.accountsService.findOne({ id: accountId });
    if (!account) {
      throw new WrongEmailException();
    }
    const confirm = await this.getAccountConfirmOrFail(code);
    if (confirm.account.id !== accountId) {
      throw new WrongCodeException();
    }
    const hash = this.getHashPassword(newPassword);
    await this.accountsService.getRepo().save({ ...account, hash_password: hash });
    return true;
  }

  public async getAccountConfirmOrFail(code: string): Promise<AccountConfirmCode> {
    return await this.accountsConfirmCodesRepository
      .createQueryBuilder('confirm')
      .leftJoinAndSelect('confirm.account', 'account')
      .where('confirm.code = :code', { code })
      .getOneOrFail();
  }

  private getRandomCode(): string {
    return Math.random()
      .toString(36)
      .replace(/[^a-z]+/g, '')
      .substr(0, 10);
  }
}
