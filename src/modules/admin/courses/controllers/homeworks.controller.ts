import { Controller, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import {
  Crud,
  CrudController,
  CrudRequest,
  Override,
  ParsedBody,
  ParsedRequest,
} from '@nestjsx/crud';
import { TransformedBody } from 'src/core/decorators/TransformBody.decorator';
import { TransformInterceptor } from 'src/core/interceptors/transform.interceptor';
import { TransformIdToEntityInterceptor } from 'src/core/interceptors/transformIdToEntity.interceptor';
import JwtAuthenticationGuard from 'src/modules/auth/guards/jwt.guard';
import { LessonHomework } from 'src/modules/courses/models/LessonHomework.entity';
import { HomeworksService } from 'src/modules/courses/services/homeworks.service';

@Crud({
  model: {
    type: LessonHomework,
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
@Controller('admin/homeworks')
@UseGuards(JwtAuthenticationGuard)
export class AdminHomeworksController implements CrudController<LessonHomework> {
  constructor(public service: HomeworksService) {}

  get base(): CrudController<LessonHomework> {
    return this;
  }

  @Override()
  async createOne(@ParsedRequest() req: CrudRequest, @ParsedBody() dto: any) {
    return await this.service.createHomework(dto);
  }
}
