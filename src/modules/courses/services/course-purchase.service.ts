import { Injectable } from '@nestjs/common';
import { Account } from 'src/modules/accounts/models/Account/Account.entity';
import { AccountsService } from 'src/modules/accounts/services/accounts.service';
import { CourseBuyDto } from '../dto/CourseBuyDto';
import { AlreadyBoughtException } from '../exceptions/AlreadyBoughtException';
import { CoursesService } from './courses.service';

@Injectable()
export class CoursePurchasesService {
  constructor(
    private readonly service: CoursesService,
    protected readonly accounts: AccountsService,
  ) {}

  public async buyCourse(payload: CourseBuyDto): Promise<void> {
    const { account, course_id: courseId, amount } = payload;
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
    const course = await this.service
      .getRepo()
      .createQueryBuilder('course')
      .leftJoinAndSelect('course.author', 'author')
      .where('course.id =:id', { id: courseId })
      .getOne();
    const author = course.author;
    await this.accounts.getRepo().save({ ...account, wallet: account.wallet - amount });
    await this.accounts.getRepo().save({ ...author, wallet: author.wallet + amount });
    await this.accounts.accountRelationsBuilder(account, 'bought_courses').add(courseId);
  }
}
