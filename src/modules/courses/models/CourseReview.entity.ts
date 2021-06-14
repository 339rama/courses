import { MaxLength, MinLength } from 'class-validator';
import { Account } from 'src/modules/accounts/models/Account/Account.entity';
import { BaseEntity } from 'src/modules/database/models/BaseEntity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Course } from './Course.entity';

@Entity('course_review')
export class CourseReview extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column()
  public account_id!: number;

  @Column()
  public course_id!: number;

  @MinLength(3)
  @MaxLength(5000)
  @Column('text')
  review_text?: string;

  @Column('boolean', { nullable: false })
  is_like: boolean;

  @ManyToOne(
    () => Account,
    account => account.reviews,
  )
  public account!: Account;

  @ManyToOne(
    () => Course,
    course => course.reviews,
  )
  public course!: Course;
}
