import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common';
import { Account } from 'src/modules/accounts/models/Account/Account.entity';
import { AccountDecorator } from 'src/modules/admin/auth/decorators/user.decorator';
import JwtAuthenticationGuard from 'src/modules/auth/guards/jwt.guard';
import { CourseBuyDto } from '../dto/CourseBuyDto';
import { CoursePurchasesService } from '../services/course-purchase.service';

@Controller('purchases')
@UseGuards(JwtAuthenticationGuard)
export class CoursePurchasesController {
  constructor(private readonly purchases: CoursePurchasesService) {}

  @Post('courses/:courseId/tinkoff')
  public async buyCourse(
    @AccountDecorator() account: Account,
    @Param('courseId') courseId: number,
    @Body() data: Pick<CourseBuyDto, 'amount'>,
  ): Promise<{ result: boolean }> {
    await this.purchases.buyCourse({ account, course_id: courseId, ...data });
    return { result: true };
  }
}
