import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from './models/Course.entity';
import { CourseLevel } from './models/CourseLevel.entity';
import { CourseReview } from './models/CourseReview.entity';
import { FavouriteCourse } from './models/FavouriteCourse.entity';
import { HomeworkAnswerFree } from './models/HomeworkAnswerFree.entity';
import { HomeworkIsDone } from './models/HomeworkIsDone.entity';
import { HomeworkQuestion } from './models/HomeworkQuestion.entity';
import { HomeworkResult } from './models/HomeworkResult.entity';
import { Lesson } from './models/Lesson.entity';
import { LessonHomework } from './models/LessonHomework.entity';
import { LessonIsDone } from './models/LessonIsDone.entity';
import { TestVariant } from './models/TestVariant.entity';
import { LessonsService } from './services/lessons.service';
import { CoursesService } from './services/courses.service';
import { CourseLevelsService } from './services/course-levels.service';
import { HomeworksService } from './services/homeworks.service';
import { CourseLevelsController } from './controllers/course-levels.controller';
import { CoursesController } from './controllers/courses.controller';
import { AccountsService } from '../accounts/services/accounts.service';
import { HomeworksController } from './controllers/homeworks.controller';
import { LessonsController } from './controllers/lessons.controller';
import { AccountLessonTimeCode } from '../accounts/models/AccountLessonTimeCode.entity';
import { AccountsModule } from '../accounts/accounts.module';
import { Account } from '../accounts/models/Account/Account.entity';
import { CoursesReviewsService } from './services/courses-reviews.service';
import { HomeworkAnswersService } from './services/homework-answers.service';
import { HomeworkAnswersController } from './controllers/homework-answers.controller';
import { CourseReviewsController } from './controllers/course-reviews.controller';
import { CoursePurchasesController } from './controllers/course-purchase.controller';
import { CoursePurchasesService } from './services/course-purchase.service';

@Module({
  imports: [
    AccountsModule,
    TypeOrmModule.forFeature([
      Account,
      Course,
      CourseLevel,
      Lesson,
      LessonHomework,
      HomeworkResult,
      HomeworkIsDone,
      LessonIsDone,
      HomeworkQuestion,
      HomeworkAnswerFree,
      TestVariant,
      FavouriteCourse,
      CourseReview,
      AccountLessonTimeCode,
    ]),
  ],
  controllers: [
    CourseLevelsController,
    CoursesController,
    HomeworksController,
    LessonsController,
    HomeworkAnswersController,
    CourseReviewsController,
    CoursePurchasesController,
  ],
  providers: [
    CoursesService,
    LessonsService,
    CourseLevelsService,
    HomeworksService,
    AccountsService,
    CoursesReviewsService,
    HomeworkAnswersService,
    CoursePurchasesService,
  ],
  exports: [CoursesService, CourseLevelsService, HomeworksService, LessonsService],
})
export class CoursesModule {}
