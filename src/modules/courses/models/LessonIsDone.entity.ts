import { Account } from 'src/modules/accounts/models/Account/Account.entity';
import { BaseEntity } from 'src/modules/database/models/BaseEntity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Lesson } from './Lesson.entity';

@Entity('lesson_is_done')
export class LessonIsDone extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column()
  public account_id!: number;

  @Column()
  public lesson_id!: number;

  @ManyToOne(
    () => Account,
    account => account.lessons_is_done,
  )
  public account!: Account;

  @ManyToOne(
    () => Lesson,
    lesson => lesson.lessons_is_done,
  )
  public lesson!: Lesson;
}
