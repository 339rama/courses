import { BaseEntity } from 'src/modules/database/models/BaseEntity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { SubscriptionType } from '../enums/SubscriptionType';
import { Account } from './Account/Account.entity';

@Entity('account_subscription')
export class AccountSubscription extends BaseEntity {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Column('boolean', { default: true, nullable: false })
  is_test: boolean;

  @Column('boolean', { default: false, nullable: false })
  is_canceled: boolean;

  @Column('enum', { enum: SubscriptionType, default: SubscriptionType.MONTH })
  sub_type: SubscriptionType;

  @ManyToOne(
    () => Account,
    account => account.subscriptions,
    { onDelete: 'CASCADE' },
  )
  account: Account;

  @Column('timestamp', { nullable: false })
  expires_at: string;
}
