import { Controller, UseGuards } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import JwtAuthenticationGuard from 'src/modules/auth/guards/jwt.guard';
import { Lesson } from 'src/modules/courses/models/Lesson.entity';
import { LessonsService } from 'src/modules/courses/services/lessons.service';

@Crud({
  model: {
    type: Lesson,
  },
})
@Controller('admin/lessons')
@UseGuards(JwtAuthenticationGuard)
export class AdminLessonsController implements CrudController<Lesson> {
  constructor(public service: LessonsService) {}

  get base(): CrudController<Lesson> {
    return this;
  }
}
