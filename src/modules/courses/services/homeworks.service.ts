import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { LessonHomework } from '../models/LessonHomework.entity';
import { TestVariant } from '../models/TestVariant.entity';
import { HomeworkQuestion } from '../models/HomeworkQuestion.entity';
import { HomeworkType } from '../enums/HomeworkType';

@Injectable()
export class HomeworksService extends TypeOrmCrudService<LessonHomework> {
  constructor(
    @InjectRepository(LessonHomework)
    private readonly repository: Repository<LessonHomework>,
    @InjectRepository(TestVariant)
    private readonly testVariants: Repository<TestVariant>,
    @InjectRepository(HomeworkQuestion)
    private readonly questions: Repository<HomeworkQuestion>,
  ) {
    super(repository);
  }

  public getRepo() {
    return this.repository;
  }

  async createHomework(data: any): Promise<any> {
    const type = data.homework_type as HomeworkType;
    const lesson = data.lesson;
    const homework = await this.repository.save({ lesson });
    if (type === HomeworkType.TEST) {
      for await (const test of data.tests) {
        const test_question = await this.questions.save({ question: test.question });
        const variants = test.variants;
        for await (const variant of variants) {
          await this.testVariants.save({});
        }
      }
    }
  }
}
