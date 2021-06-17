import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { Account } from 'src/modules/accounts/models/Account/Account.entity';
import { AccountDecorator } from 'src/modules/admin/auth/decorators/user.decorator';
import JwtAuthenticationGuard from 'src/modules/auth/guards/jwt.guard';
import { HomeworkAnswerFree } from '../models/HomeworkAnswerFree.entity';
import { TestVariant } from '../models/TestVariant.entity';
import { HomeworkAnswersService } from '../services/homework-answers.service';

@Crud({
  model: {
    type: HomeworkAnswerFree,
  },
})
@Controller('answers')
@UseGuards(JwtAuthenticationGuard)
export class HomeworkAnswersController implements CrudController<HomeworkAnswerFree> {
  constructor(public service: HomeworkAnswersService) {}

  get base(): CrudController<HomeworkAnswerFree> {
    return this;
  }

  @Post('test/homeworks/:homework_id')
  public createTestAnswer(
    @AccountDecorator() account: Account,
    @Param('homework_id') homework_id: number,
    @Body() data: any,
  ): Promise<any> {
    return {} as Promise<TestVariant>;
  }

  @Get('test/homeworks/:homework_id')
  public getTestAnswer(
    @AccountDecorator() account: Account,
    @Param('homework_id') homework_id: number,
  ): Promise<any> {
    return {} as Promise<TestVariant>;
  }

  @Post('free/homeworks/:homework_id')
  public async createFreeAnswer(
    @AccountDecorator() account: Account,
    @Param('homework_id') homework_id: number,
    @Body() data: Pick<HomeworkAnswerFree, 'answer'>,
  ): Promise<{ result: boolean }> {
    await this.service.createAnswerFree({
      account_id: account.id,
      lesson_homework_id: homework_id,
      ...data,
    });
    return { result: true };
  }

  @Get('free/homeworks/:homework_id')
  public getFreeAnswer(
    @AccountDecorator() account: Account,
    @Param('homework_id') homeworkId: number,
  ): Promise<HomeworkAnswerFree> {
    return this.service.getAnswerFree(homeworkId, account.id);
  }
}
