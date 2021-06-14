import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { ConfigService } from '@nestjs/config';
import { AccountSession } from '../models/AccountSession.entity';

@Injectable()
export class AccountsSessionsService extends TypeOrmCrudService<AccountSession> {
  constructor(
    @InjectRepository(AccountSession)
    private readonly accountsSessionsRepository: Repository<AccountSession>,
    private readonly config: ConfigService,
  ) {
    super(accountsSessionsRepository);
  }

  public getRepo() {
    return this.accountsSessionsRepository;
  }

  public async createSession(data: Partial<AccountSession>): Promise<AccountSession> {
    return await this.accountsSessionsRepository.save(data);
  }
}
