import { Controller, UseGuards, UseInterceptors } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { listResponseInterceptor } from 'src/core/interceptors/ListResponse.interceptor';
import JwtAuthenticationGuard from 'src/modules/auth/guards/jwt.guard';
import { Course } from 'src/modules/courses/models/Course.entity';
import { CoursesService } from 'src/modules/courses/services/courses.service';

@Crud({
  model: {
    type: Course,
  },
  query: {
    join: {
      author: { eager: true },
      level: { eager: true },
    },
    alwaysPaginate: true,
  },
  routes: { getManyBase: { decorators: [UseInterceptors(listResponseInterceptor('courses'))] } },
})
@Controller('admin/courses')
@UseGuards(JwtAuthenticationGuard)
export class AdminCoursesController implements CrudController<Course> {
  constructor(public service: CoursesService) {}

  get base(): CrudController<Course> {
    return this;
  }
}
