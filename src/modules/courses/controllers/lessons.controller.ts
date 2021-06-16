import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { Account } from 'src/modules/accounts/models/Account/Account.entity';
import { AccountDecorator } from 'src/modules/admin/auth/decorators/user.decorator';
import JwtAuthenticationGuard from 'src/modules/auth/guards/jwt.guard';
import { Lesson } from 'src/modules/courses/models/Lesson.entity';
import { LessonsService } from 'src/modules/courses/services/lessons.service';

@Crud({
  model: {
    type: Lesson,
  },
  routes: { only: ['getOneBase'] },
})
@Controller('lessons')
@UseGuards(JwtAuthenticationGuard)
export class LessonsController implements CrudController<Lesson> {
  constructor(public service: LessonsService) {}

  get base(): CrudController<Lesson> {
    return this;
  }

  @Post(':id/timeCode')
  public async addTimeCode(
    @AccountDecorator() account: Account,
    @Param('id') id: number,
    @Body() data: { time_code: number },
  ): Promise<{ result: boolean }> {
    return await this.service.addTimeCode(data.time_code, account, id);
  }
}
