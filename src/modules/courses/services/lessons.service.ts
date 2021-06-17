import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Account } from 'src/modules/accounts/models/Account/Account.entity';
import { AccountLessonTimeCode } from 'src/modules/accounts/models/AccountLessonTimeCode.entity';
import { Repository } from 'typeorm';
import { Lesson } from '../models/Lesson.entity';

@Injectable()
export class LessonsService extends TypeOrmCrudService<Lesson> {
  constructor(
    @InjectRepository(Lesson)
    private readonly repository: Repository<Lesson>,
    @InjectRepository(AccountLessonTimeCode)
    private readonly timeCodesRepository: Repository<AccountLessonTimeCode>,
  ) {
    super(repository);
  }

  public getRepo() {
    return this.repository;
  }

  public getLessonsByCourseId(courseId: number): Promise<Lesson[]> {
    return this.find({ where: { course: { id: courseId } } });
  }

  public async addTimeCode(
    timeCode: number,
    account: Account,
    lessonId: number,
  ): Promise<{ result: boolean }> {
    await this.timeCodesRepository.save({
      account_id: account.id,
      lesson_id: lessonId,
      time_code: timeCode,
    });
    return { result: true };
  }
}
