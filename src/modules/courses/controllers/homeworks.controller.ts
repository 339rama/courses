import { Controller, UseGuards } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import JwtAuthenticationGuard from 'src/modules/auth/guards/jwt.guard';
import { LessonHomework } from 'src/modules/courses/models/LessonHomework.entity';
import { HomeworksService } from 'src/modules/courses/services/homeworks.service';

@Crud({
  model: {
    type: LessonHomework,
  },
  routes: { only: ['getOneBase'] },
})
@Controller('homeworks')
@UseGuards(JwtAuthenticationGuard)
export class HomeworksController implements CrudController<LessonHomework> {
  constructor(public service: HomeworksService) {}

  get base(): CrudController<LessonHomework> {
    return this;
  }
}
