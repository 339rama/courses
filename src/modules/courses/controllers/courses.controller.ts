import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { Account } from 'src/modules/accounts/models/Account/Account.entity';
import { AccountDecorator } from 'src/modules/admin/auth/decorators/user.decorator';
import JwtAuthenticationGuard from 'src/modules/auth/guards/jwt.guard';
import { Course } from 'src/modules/courses/models/Course.entity';
import { CoursesService } from 'src/modules/courses/services/courses.service';
import { CourseReview } from '../models/CourseReview.entity';
import { CoursesReviewsService } from '../services/courses-reviews.service';

@Crud({
  model: {
    type: Course,
  },
  query: {
    join: {
      account: { eager: true },
    },
    filter: [
      {
        field: 'is_published',
        operator: '$eq',
        value: true,
      },
    ],
  },
})
@Controller('courses')
@UseGuards(JwtAuthenticationGuard)
export class CoursesController implements CrudController<Course> {
  constructor(public service: CoursesService, private readonly reviews: CoursesReviewsService) {}

  get base(): CrudController<Course> {
    return this;
  }

  @Get('favourites')
  public async favouritesCourses(@AccountDecorator() account: Account): Promise<Course[]> {
    return this.service.getAccountFavourites(account);
  }

  @Get('my')
  public async myCourses(@AccountDecorator() account: Account): Promise<Course[]> {
    return this.service.getAccountCourses(account);
  }

  @Post(':id/favourites')
  public async addToFavourite(
    @AccountDecorator() account: Account,
    @Param('id') id: number,
  ): Promise<{ result: boolean }> {
    return this.service.addToAccountFavourites(account, id);
  }

  @Delete(':id/favourites')
  public async removoFromFavourite(
    @AccountDecorator() account: Account,
    @Param('id') id: number,
  ): Promise<{ result: boolean }> {
    return this.service.removeFromAccountFavourites(account, id);
  }

  @Post(':id/likes-dislikes')
  public async addCourseReview(
    @AccountDecorator() account: Account,
    @Param('id') id: number,
    @Body() data: { is_like: boolean; review_text: string },
  ): Promise<{ result: boolean }> {
    return this.reviews.create({
      account_id: account.id,
      course_id: id,
      ...data,
    });
  }

  @Delete(':id/likes-dislikes')
  public async removeCourseReview(
    @AccountDecorator() account: Account,
    @Param('id') id: number,
  ): Promise<{ result: boolean }> {
    return this.reviews.remove({ account_id: account.id, course_id: id });
  }
}
