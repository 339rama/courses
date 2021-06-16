import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Course } from '../models/Course.entity';
import { AccountsService } from 'src/modules/accounts/services/accounts.service';
import { Account } from 'src/modules/accounts/models/Account/Account.entity';

@Injectable()
export class CoursesService extends TypeOrmCrudService<Course> {
  constructor(
    @InjectRepository(Course)
    private readonly repository: Repository<Course>,
    private readonly accountsService: AccountsService,
  ) {
    super(repository);
  }

  public getRepo() {
    return this.repository;
  }

  public async addToAccountFavourites(
    account: Account,
    courseId: number,
  ): Promise<{ result: boolean }> {
    await this.accountsService
      .getRepo()
      .createQueryBuilder()
      .relation('favourite_courses')
      .of(account)
      .add(courseId);
    return { result: true };
  }

  public async removeFromAccountFavourites(
    account: Account,
    courseId: number,
  ): Promise<{ result: boolean }> {
    await this.accountsService
      .getRepo()
      .createQueryBuilder()
      .relation('favourite_courses')
      .of(account)
      .remove(courseId);
    return { result: true };
  }

  public async getAccountFavourites(account: Account): Promise<Course[]> {
    return await this.accountsService
      .getRepo()
      .createQueryBuilder()
      .relation('favourite_courses')
      .of(account)
      .loadMany();
  }
  public async getAccountCourses(account: Account): Promise<Course[]> {
    return await this.accountsService
      .getRepo()
      .createQueryBuilder()
      .relation('courses')
      .of(account)
      .loadMany();
  }
}
