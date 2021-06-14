import { Account } from 'src/modules/accounts/models/Account/Account.entity';
import { BaseEntity } from 'src/modules/database/models/BaseEntity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { LessonHomework } from './LessonHomework.entity';

@Entity('homework_is_done')
export class HomeworkIsDone extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column()
  public account_id!: number;

  @Column()
  public lesson_homework_id!: number;

  @ManyToOne(
    () => Account,
    account => account.homeworks_is_done,
  )
  public account!: Account;

  @ManyToOne(
    () => LessonHomework,
    lesson_homework => lesson_homework.homeworks_is_done,
  )
  public lesson_homework!: LessonHomework;
}
