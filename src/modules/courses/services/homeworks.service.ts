import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { LessonHomework } from '../models/LessonHomework.entity';

@Injectable()
export class HomeworksService extends TypeOrmCrudService<LessonHomework> {
  constructor(
    @InjectRepository(LessonHomework)
    private readonly repository: Repository<LessonHomework>,
  ) {
    super(repository);
  }

  public getRepo() {
    return this.repository;
  }
}
