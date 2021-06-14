import { Lesson } from 'src/modules/courses/models/Lesson.entity';
import { BaseEntity } from 'src/modules/database/models/BaseEntity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Account } from './Account/Account.entity';

@Entity('account_lesson_time_code')
export class AccountLessonTimeCode extends BaseEntity {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Column()
  public account_id!: number;

  @Column()
  public lesson_id!: number;

  @Column('integer', { nullable: false })
  time_code: number;

  //relations
  @ManyToOne(
    () => Account,
    account => account.time_codes,
  )
  public account!: Account;

  @ManyToOne(
    () => Lesson,
    lesson => lesson.time_codes,
  )
  public lesson!: Lesson;
}
