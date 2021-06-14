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

@Injectable()
export class AccountsPasswordService {
  constructor(
    @InjectRepository(AccountConfirmCode)
    private readonly accountsConfirmCodesRepository: Repository<AccountConfirmCode>,
    private readonly accountsService: AccountsService,
    private readonly config: ConfigService,
  ) {}

  private async sendPassword(password: string): Promise<void> {
    // todo send email with password
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

  public async restorePassword(email: string): Promise<boolean> {
    const account = this.accountsService.findOne({ email });
    if (!account) {
      throw new WrongEmailException();
    }
    const newPass = this.getRandomPass();
    await this.sendPassword(newPass);
    const hash = this.getHashPassword(newPass);
    await this.accountsService.getRepo().save({ ...account, hash_password: hash });
    return true;
  }

  private getRandomPass(): string {
    return Math.random()
      .toString(36)
      .replace(/[^a-z]+/g, '')
      .substr(0, 10);
  }
}
