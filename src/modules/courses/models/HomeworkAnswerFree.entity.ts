import { MaxLength, MinLength } from 'class-validator';
import { Account } from 'src/modules/accounts/models/Account/Account.entity';
import { BaseEntity } from 'src/modules/database/models/BaseEntity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { LessonHomework } from './LessonHomework.entity';

@Entity('homework_answer_free')
export class HomeworkAnswerFree extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column()
  public account_id!: number;

  @Column()
  public lesson_homework_id!: number;

  @MinLength(3)
  @MaxLength(10000)
  @Column('text')
  answer: string;

  @ManyToOne(
    () => Account,
    account => account.homework_answers_free,
  )
  public account!: Account;

  @ManyToOne(
    () => LessonHomework,
    lesson_homework => lesson_homework.homework_answers_free,
  )
  public lesson_homework!: LessonHomework;
}
