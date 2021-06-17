import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { CourseLevel } from '../models/CourseLevel.entity';

@Injectable()
export class CourseLevelsService extends TypeOrmCrudService<CourseLevel> {
  constructor(
    @InjectRepository(CourseLevel)
    private readonly repository: Repository<CourseLevel>,
  ) {
    super(repository);
  }

  public getRepo() {
    return this.repository;
  }
}
