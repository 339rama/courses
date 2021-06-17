import { Injectable } from '@nestjs/common';
import { Account } from 'src/modules/accounts/models/Account/Account.entity';
import { AccountsService } from 'src/modules/accounts/services/accounts.service';
import { AlreadyBoughtException } from '../exceptions/AlreadyBoughtException';
import { CoursesService } from './courses.service';

@Injectable()
export class CoursePurhcasesService {
  constructor(
    private readonly service: CoursesService,
    protected readonly accounts: AccountsService,
  ) {}

  public async buyCourse(account: Account, courseId: number): Promise<void> {
    const acc = (await this.accounts
      .getRepo()
      .createQueryBuilder('acc')
      .select('acc.id')
      .where('acc.id =:id', { id: account.id })
      .loadAllRelationIds({ relations: ['bought_courses'] })
      .getOne()) as Account & Partial<Record<'bought_courses', number[]>>;
    if (acc.bought_courses.includes(courseId)) {
      throw new AlreadyBoughtException();
    }
    await this.accounts.accountRelationsBuilder(account, 'bought_courses').add(courseId);
  }
}
