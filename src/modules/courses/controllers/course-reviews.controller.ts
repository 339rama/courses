import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import JwtAuthenticationGuard from 'src/modules/auth/guards/jwt.guard';
import { CourseReview } from '../models/CourseReview.entity';
import { CoursesReviewsService } from '../services/courses-reviews.service';

@Crud({
  model: {
    type: CourseReview,
  },
})
@Controller('reviews')
@UseGuards(JwtAuthenticationGuard)
export class CourseReviewsController implements CrudController<CourseReview> {
  constructor(public service: CoursesReviewsService) {}

  get base(): CrudController<CourseReview> {
    return this;
  }

  @Get('courses/:id')
  public courseReviews(@Param('id') id: number): Promise<CourseReview[]> {
    return this.service.getCourseReviews(id);
  }
}
