import { Course } from 'src/modules/courses/models/Course.entity';
import { CoursePurchase } from 'src/modules/courses/models/CoursePurchase.entity';
import { CourseReview } from 'src/modules/courses/models/CourseReview.entity';
import { FavouriteCourse } from 'src/modules/courses/models/FavouriteCourse.entity';
import { HomeworkAnswerFree } from 'src/modules/courses/models/HomeworkAnswerFree.entity';
import { HomeworkIsDone } from 'src/modules/courses/models/HomeworkIsDone.entity';
import { HomeworkResult } from 'src/modules/courses/models/HomeworkResult.entity';
import { LessonComment } from 'src/modules/courses/models/LessonComment.entity';
import { LessonCommentAnswer } from 'src/modules/courses/models/LessonCommentAnswer.entity';
import { LessonCommentAnswerReview } from 'src/modules/courses/models/LessonCommentAnswerReview.entity';
import { LessonCommentReview } from 'src/modules/courses/models/LessonCommentReview.entity';
import { LessonIsDone } from 'src/modules/courses/models/LessonIsDone.entity';
import { LessonViewed } from 'src/modules/courses/models/LessonViewed.entity';
import { BaseEntity } from 'src/modules/database/models/BaseEntity';
import { Message } from 'src/modules/messages/models/Message.entity';
import { Purchase } from 'src/modules/payment/models/Purchase.entity';
import { OneToMany } from 'typeorm';
import { AccountConfirmCode } from '../AccountConfirmCode.entity';
import { AccountLessonTimeCode } from '../AccountLessonTimeCode.entity';
import { AccountSession } from '../AccountSession.entity';
import { AccountSubscription } from '../AccountSubscription.entity';

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
    () => AccountSubscription,
    subscription => subscription.account,
    {
      cascade: true,
    },
  )
  subscriptions?: AccountSubscription[];

  @OneToMany(
    () => AccountSession,
    session => session.account,
    {
      cascade: true,
    },
  )
  sessions?: AccountSubscription[];

  @OneToMany(
    () => Course,
    course => course.account,
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

  @OneToMany(
    () => LessonViewed,
    view => view.account,
  )
  lesson_views!: LessonViewed[];

  @OneToMany(
    () => CoursePurchase,
    purchase => purchase.account,
  )
  courses_purchases!: CoursePurchase[];

  @OneToMany(
    () => LessonComment,
    comment => comment.account,
  )
  lessons_comments!: LessonComment[];

  @OneToMany(
    () => LessonCommentAnswer,
    comment_answer => comment_answer.account,
  )
  lessons_comments_answers!: LessonCommentAnswer[];

  @OneToMany(
    () => LessonCommentReview,
    comment_review => comment_review.account,
  )
  lessons_comments_reviews!: LessonCommentReview[];

  @OneToMany(
    () => LessonCommentAnswerReview,
    answer_review => answer_review.account,
  )
  lessons_comments_answers_reviews!: LessonCommentAnswerReview[];

  @OneToMany(
    () => Message,
    message => message.author,
  )
  sent_messages!: Message[];

  @OneToMany(
    () => Message,
    message => message.reciever,
  )
  recieved_messages!: Message[];

  @OneToMany(
    () => Purchase,
    purchase => purchase.account,
  )
  purchases!: Purchase[];
}
