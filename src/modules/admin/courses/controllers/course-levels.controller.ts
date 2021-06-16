import { Controller, UseGuards } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import JwtAuthenticationGuard from 'src/modules/auth/guards/jwt.guard';
import { CourseLevel } from 'src/modules/courses/models/CourseLevel.entity';
import { CourseLevelsService } from 'src/modules/courses/services/course-levels.service';

@Crud({
  model: {
    type: CourseLevel,
  },
})
@Controller('admin/courseLevels')
@UseGuards(JwtAuthenticationGuard)
export class AdminCourseLevelsController implements CrudController<CourseLevel> {
  constructor(public service: CourseLevelsService) {}

  get base(): CrudController<CourseLevel> {
    return this;
  }
}
