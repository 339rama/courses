import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { CourseReview } from '../models/CourseReview.entity';

@Injectable()
export class CoursesReviewsService extends TypeOrmCrudService<CourseReview> {
  constructor(
    @InjectRepository(CourseReview)
    private readonly repository: Repository<CourseReview>,
  ) {
    super(repository);
  }

  public getRepo() {
    return this.repository;
  }

  public async create(
    data: Pick<CourseReview, 'account_id' | 'course_id' | 'is_like' | 'review_text'>,
  ): Promise<{ result: boolean }> {
    await this.repository.save(data);
    return { result: true };
  }

  public async remove(data: {
    account_id: number;
    course_id: number;
  }): Promise<{ result: boolean }> {
    this.repository.delete({ account_id: data.account_id, course_id: data.course_id });
    return { result: true };
  }

  public async getCourseReviews(courseId: number): Promise<CourseReview[]> {
    return await this.repository
      .createQueryBuilder('review')
      .leftJoinAndSelect('review.account', 'author')
      .where('review.course_id =:id', { id: courseId })
      .getMany();
  }
}
