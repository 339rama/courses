import { Controller, Get, Param, UseGuards, UseInterceptors } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { TransformInterceptor } from 'src/core/interceptors/transform.interceptor';
import { TransformIdToEntityInterceptor } from 'src/core/interceptors/transformIdToEntity.interceptor';
import JwtAuthenticationGuard from 'src/modules/auth/guards/jwt.guard';
import { Lesson } from 'src/modules/courses/models/Lesson.entity';
import { LessonsService } from 'src/modules/courses/services/lessons.service';

@Crud({
  model: {
    type: Lesson,
  },
  routes: {
    createOneBase: {
      decorators: [
        UseInterceptors(TransformIdToEntityInterceptor),
        UseInterceptors(TransformInterceptor),
      ],
    },
  },
})
@Controller('admin/lessons')
@UseGuards(JwtAuthenticationGuard)
export class AdminLessonsController implements CrudController<Lesson> {
  constructor(public service: LessonsService) {}

  get base(): CrudController<Lesson> {
    return this;
  }

  @Get('courses/:courseId')
  public getCourseLessons(@Param('courseId') courseId: number) {
    return this.service.getLessonsByCourseId(courseId);
  }
}
