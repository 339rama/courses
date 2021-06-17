import { MaxLength, MinLength } from 'class-validator';
import { Account } from 'src/modules/accounts/models/Account/Account.entity';
import { BaseEntity } from 'src/modules/database/models/BaseEntity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, ManyToMany } from 'typeorm';
import { CourseLevel } from './CourseLevel.entity';
import { CourseReview } from './CourseReview.entity';
import { FavouriteCourse } from './FavouriteCourse.entity';
import { Lesson } from './Lesson.entity';

@Entity('course')
export class Course extends BaseEntity {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @MinLength(3)
  @MaxLength(100)
  @Column('varchar', { nullable: false })
  name: string;

  @MinLength(3)
  @MaxLength(100)
  @Column('varchar', { nullable: false })
  photo_link: string;

  @MinLength(3)
  @MaxLength(5000)
  @Column('varchar', { nullable: false })
  description: string;

  @Column('integer', { nullable: false })
  cost: number;

  @Column('boolean', { default: false })
  is_published: boolean;

  //relations
  @ManyToOne(
    () => CourseLevel,
    level => level.course,
    { onDelete: 'SET NULL', eager: true },
  )
  level: CourseLevel;

  @OneToMany(
    () => Lesson,
    lesson => lesson.course,
    {
      cascade: true,
    },
  )
  lessons?: Lesson[];

  @ManyToOne(
    () => Account,
    author => author.courses,
    { onDelete: 'CASCADE' },
  )
  author: Account;

  @OneToMany(
    () => FavouriteCourse,
    course => course.course,
  )
  favourite_courses!: FavouriteCourse[];

  @OneToMany(
    () => CourseReview,
    review => review.course,
  )
  reviews!: CourseReview[];

  @ManyToMany(
    () => Account,
    account => account.bought_courses,
  )
  buyers: Account[];
}
