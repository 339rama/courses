import { Module } from '@nestjs/common';
import { CoursesModule } from 'src/modules/courses/courses.module';
import { CourseLevelsService } from 'src/modules/courses/services/course-levels.service';
import { CoursesService } from 'src/modules/courses/services/courses.service';
import { HomeworksService } from 'src/modules/courses/services/homeworks.service';
import { LessonsService } from 'src/modules/courses/services/lessons.service';
import { AdminCourseLevelsController } from './controllers/course-levels.controller';
import { AdminCoursesController } from './controllers/courses.controller';
import { AdminHomeworksController } from './controllers/homeworks.controller';
import { AdminLessonsController } from './controllers/lessons.controller';

@Module({
  imports: [CoursesModule],
  controllers: [
    AdminCourseLevelsController,
    AdminCoursesController,
    AdminHomeworksController,
    AdminLessonsController,
  ],
  providers: [CoursesService, CourseLevelsService, HomeworksService, LessonsService],
})
export class AdminCoursesModule {}
