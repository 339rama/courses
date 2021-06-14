import { Account } from 'src/modules/accounts/models/Account/Account.entity';
import { BaseEntity } from 'src/modules/database/models/BaseEntity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { HomeworkResultType } from '../enums/HomeworkResultType';
import { LessonHomework } from './LessonHomework.entity';

@Entity('homework_result')
export class HomeworkResult extends BaseEntity {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Column('integer', { nullable: false })
  total_answers: string;

  @Column('integer', { nullable: false })
  right_answers: string;

  @Column('enum', { enum: HomeworkResultType, nullable: false })
  result: HomeworkResultType;

  //relations
  @ManyToOne(
    () => LessonHomework,
    homework => homework.results,
    { onDelete: 'CASCADE' },
  )
  homework: LessonHomework;

  @ManyToOne(
    () => Account,
    account => account.homework_results,
    { onDelete: 'CASCADE' },
  )
  account: Account;
}
