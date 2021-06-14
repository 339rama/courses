import { Account } from 'src/modules/accounts/models/Account/Account.entity';
import { BaseEntity } from 'src/modules/database/models/BaseEntity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Course } from './Course.entity';

@Entity('course_purchase')
export class CoursePurchase extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column()
  public account_id!: number;

  @Column()
  public course_id!: number;

  @ManyToOne(
    () => Account,
    account => account.courses_purchases,
  )
  public account!: Account;

  @ManyToOne(
    () => Course,
    course => course.courses_purchases,
  )
  public course!: Course;
}
