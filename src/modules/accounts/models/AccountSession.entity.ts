import { BaseEntity } from 'src/modules/database/models/BaseEntity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Account } from './Account/Account.entity';

@Entity('account_session')
export class AccountSession extends BaseEntity {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Column('varchar')
  device_registration_id?: string;

  @ManyToOne(
    () => Account,
    account => account.sessions,
    { onDelete: 'CASCADE' },
  )
  account: Account;
}
