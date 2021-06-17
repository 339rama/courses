import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountsModule } from 'src/modules/accounts/accounts.module';
import { Account } from 'src/modules/accounts/models/Account/Account.entity';
import { AccountLessonTimeCode } from 'src/modules/accounts/models/AccountLessonTimeCode.entity';
import { AccountsService } from 'src/modules/accounts/services/accounts.service';
import { CoursesModule } from 'src/modules/courses/courses.module';
import { Course } from 'src/modules/courses/models/Course.entity';
import { Lesson } from 'src/modules/courses/models/Lesson.entity';
import { LessonHomework } from 'src/modules/courses/models/LessonHomework.entity';
import { CourseLevelsService } from 'src/modules/courses/services/course-levels.service';
import { CoursesService } from 'src/modules/courses/services/courses.service';
import { HomeworksService } from 'src/modules/courses/services/homeworks.service';
import { LessonsService } from 'src/modules/courses/services/lessons.service';
import { AdminCourseLevelsController } from './controllers/course-levels.controller';
import { AdminCoursesController } from './controllers/courses.controller';
import { AdminHomeworksController } from './controllers/homeworks.controller';
import { AdminLessonsController } from './controllers/lessons.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Account, Course, LessonHomework, Lesson, AccountLessonTimeCode]),
    CoursesModule,
  ],
  controllers: [
    AdminCourseLevelsController,
    AdminCoursesController,
    AdminHomeworksController,
    AdminLessonsController,
  ],
  providers: [
    AccountsService,
    CoursesService,
    CourseLevelsService,
    HomeworksService,
    LessonsService,
  ],
})
export class AdminCoursesModule {}
