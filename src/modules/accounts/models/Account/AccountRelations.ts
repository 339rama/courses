import { Course } from 'src/modules/courses/models/Course.entity';
import { CourseReview } from 'src/modules/courses/models/CourseReview.entity';
import { FavouriteCourse } from 'src/modules/courses/models/FavouriteCourse.entity';
import { HomeworkAnswerFree } from 'src/modules/courses/models/HomeworkAnswerFree.entity';
import { HomeworkIsDone } from 'src/modules/courses/models/HomeworkIsDone.entity';
import { HomeworkResult } from 'src/modules/courses/models/HomeworkResult.entity';
import { LessonIsDone } from 'src/modules/courses/models/LessonIsDone.entity';
import { BaseEntity } from 'src/modules/database/models/BaseEntity';
import { JoinTable, ManyToMany, OneToMany } from 'typeorm';
import { AccountConfirmCode } from '../AccountConfirmCode.entity';
import { AccountLessonTimeCode } from '../AccountLessonTimeCode.entity';

export class AccountRelations extends BaseEntity {
  @OneToMany(
    () => AccountConfirmCode,
    code => code.account,
    {
      cascade: true,
    },
  )
  confirm_codes?: AccountConfirmCode[];

  @OneToMany(
    () => Course,
    course => course.author,
    {
      cascade: true,
    },
  )
  courses?: Course[];

  @OneToMany(
    () => HomeworkResult,
    result => result.account,
    {
      cascade: true,
    },
  )
  homework_results?: Course[];

  @OneToMany(
    () => HomeworkIsDone,
    homework_is_done => homework_is_done.account,
  )
  homeworks_is_done!: HomeworkIsDone[];

  @OneToMany(
    () => LessonIsDone,
    lesson_is_done => lesson_is_done.account,
  )
  lessons_is_done!: LessonIsDone[];

  @OneToMany(
    () => HomeworkAnswerFree,
    answer => answer.account,
  )
  homework_answers_free!: HomeworkAnswerFree[];

  @OneToMany(
    () => AccountLessonTimeCode,
    time_code => time_code.account,
  )
  time_codes!: AccountLessonTimeCode[];

  @OneToMany(
    () => FavouriteCourse,
    course => course.account,
  )
  favourite_courses!: FavouriteCourse[];

  @OneToMany(
    () => CourseReview,
    review => review.account,
  )
  reviews!: CourseReview[];

  @ManyToMany(
    () => Course,
    course => course.buyers,
  )
  @JoinTable()
  bought_courses: Course[];
}
