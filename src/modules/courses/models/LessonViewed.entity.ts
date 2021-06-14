import { Account } from 'src/modules/accounts/models/Account/Account.entity';
import { BaseEntity } from 'src/modules/database/models/BaseEntity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Lesson } from './Lesson.entity';

@Entity('lesson_viewed')
export class LessonViewed extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column()
  public account_id!: number;

  @Column()
  public lesson_id!: number;

  @ManyToOne(
    () => Account,
    account => account.lesson_views,
  )
  public account!: Account;

  @ManyToOne(
    () => Lesson,
    lesson => lesson.lesson_views,
  )
  public lesson!: Lesson;
}
