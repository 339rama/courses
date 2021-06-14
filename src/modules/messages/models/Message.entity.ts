import { MaxLength, MinLength } from 'class-validator';
import { Account } from 'src/modules/accounts/models/Account/Account.entity';
import { BaseEntity } from 'src/modules/database/models/BaseEntity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('message')
export class Message extends BaseEntity {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Column()
  public author_id!: number;

  @Column()
  public reciever_id!: number;

  @MinLength(1)
  @MaxLength(5000)
  @Column('text')
  message_text: string;

  @Column('boolean', { default: false })
  is_read: boolean;

  @ManyToOne(
    () => Account,
    author => author.sent_messages,
  )
  public author!: Account;

  @ManyToOne(
    () => Account,
    reciever => reciever.recieved_messages,
  )
  public reciever!: Account;
}
