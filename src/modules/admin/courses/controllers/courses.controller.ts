import { Controller, UseGuards } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import JwtAuthenticationGuard from 'src/modules/auth/guards/jwt.guard';
import { Course } from 'src/modules/courses/models/Course.entity';
import { CoursesService } from 'src/modules/courses/services/courses.service';

@Crud({
  model: {
    type: Course,
  },
  query: {
    join: {
      account: { eager: true },
    },
  },
})
@Controller('admin/courses')
@UseGuards(JwtAuthenticationGuard)
export class AdminCoursesController implements CrudController<Course> {
  constructor(public service: CoursesService) {}

  get base(): CrudController<Course> {
    return this;
  }
}
