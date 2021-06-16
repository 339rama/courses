import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from './models/Course.entity';
import { CourseLevel } from './models/CourseLevel.entity';
import { CoursePurchase } from './models/CoursePurchase.entity';
import { CourseReview } from './models/CourseReview.entity';
import { FavouriteCourse } from './models/FavouriteCourse.entity';
import { HomeworkAnswerFree } from './models/HomeworkAnswerFree.entity';
import { HomeworkIsDone } from './models/HomeworkIsDone.entity';
import { HomeworkQuestion } from './models/HomeworkQuestion.entity';
import { HomeworkResult } from './models/HomeworkResult.entity';
import { Lesson } from './models/Lesson.entity';
import { LessonComment } from './models/LessonComment.entity';
import { LessonCommentAnswer } from './models/LessonCommentAnswer.entity';
import { LessonCommentAnswerReview } from './models/LessonCommentAnswerReview.entity';
import { LessonCommentReview } from './models/LessonCommentReview.entity';
import { LessonFile } from './models/LessonFile.entity';
import { LessonHomework } from './models/LessonHomework.entity';
import { LessonIsDone } from './models/LessonIsDone.entity';
import { LessonViewed } from './models/LessonViewed.entity';
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

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Course,
      CourseLevel,
      Lesson,
      LessonHomework,
      LessonFile,
      HomeworkResult,
      HomeworkIsDone,
      LessonIsDone,
      HomeworkQuestion,
      HomeworkAnswerFree,
      TestVariant,
      FavouriteCourse,
      CourseReview,
      LessonViewed,
      CoursePurchase,
      LessonComment,
      LessonCommentAnswer,
      LessonCommentReview,
      LessonCommentAnswerReview,
    ]),
  ],
  controllers: [CourseLevelsController, CoursesController, HomeworksController, LessonsController],
  providers: [
    CoursesService,
    LessonsService,
    CourseLevelsService,
    HomeworksService,
    AccountsService,
  ],
  exports: [CoursesService, CourseLevelsService, HomeworksService, LessonsService],
})
export class CoursesModule {}
