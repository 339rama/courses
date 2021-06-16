import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Course } from '../models/Course.entity';
import { CourseLevel } from '../models/CourseLevel.entity';

@Injectable()
export class CourseLevelsService extends TypeOrmCrudService<CourseLevel> {
  constructor(
    @InjectRepository(Course)
    private readonly repository: Repository<CourseLevel>,
  ) {
    super(repository);
  }

  public getRepo() {
    return this.repository;
  }
}
