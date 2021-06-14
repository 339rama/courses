import { Account } from 'src/modules/accounts/models/Account/Account.entity';
import { BaseEntity } from 'src/modules/database/models/BaseEntity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Course } from './Course.entity';

@Entity('favourite_course')
export class FavouriteCourse extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column()
  public account_id!: number;

  @Column()
  public course_id!: number;

  @ManyToOne(
    () => Account,
    account => account.favourite_courses,
  )
  public account!: Account;

  @ManyToOne(
    () => Course,
    lesson => lesson.favourite_courses,
  )
  public course!: Course;
}
