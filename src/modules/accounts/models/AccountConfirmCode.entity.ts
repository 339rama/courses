import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Account } from './Account/Account.entity';

@Entity('account_confirm_code')
export class AccountConfirmCode {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Column('varchar')
  code: string;

  @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP' })
  readonly created_at: string;

  @ManyToOne(
    () => Account,
    account => account.confirm_codes,
    { onDelete: 'CASCADE' },
  )
  account: Account;
}
