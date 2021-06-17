import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { HomeworkAnswerFree } from '../models/HomeworkAnswerFree.entity';
import { TestVariant } from '../models/TestVariant.entity';

@Injectable()
export class HomeworkAnswersService extends TypeOrmCrudService<HomeworkAnswerFree> {
  constructor(
    @InjectRepository(HomeworkAnswerFree)
    private readonly repository: Repository<HomeworkAnswerFree>,
    @InjectRepository(TestVariant)
    private readonly testsRepository: Repository<TestVariant>,
  ) {
    super(repository);
  }

  public getRepo() {
    return this.repository;
  }

  public async createAnswerFree(
    data: Pick<HomeworkAnswerFree, 'account_id' | 'answer' | 'lesson_homework_id'>,
  ): Promise<HomeworkAnswerFree> {
    return await this.repository.save(data);
  }

  public async getAnswerFree(
    lessonHomeworkId: number,
    accountId: number,
  ): Promise<HomeworkAnswerFree> {
    return await this.repository.findOne({
      where: { account_id: accountId, lesson_homework_id: lessonHomeworkId },
    });
  }

  public createTestAnswer(
    data: Pick<TestVariant, 'answer' | 'homework_question'>,
  ): Promise<TestVariant> {
    return this.testsRepository.save(data);
  }

  public getTestAnswer(
    data: Pick<TestVariant, 'answer' | 'homework_question'>,
  ): Promise<TestVariant> {
    return this.testsRepository.save(data);
  }
}
