import { Controller, Param, Post, UseGuards } from '@nestjs/common';
import { Account } from 'src/modules/accounts/models/Account/Account.entity';
import { AccountDecorator } from 'src/modules/admin/auth/decorators/user.decorator';
import JwtAuthenticationGuard from 'src/modules/auth/guards/jwt.guard';
import { CoursePurhcasesService } from '../services/course-purchase.service';

@Controller('purchases')
@UseGuards(JwtAuthenticationGuard)
export class CoursePurchasesController {
  constructor(private readonly purchases: CoursePurhcasesService) {}

  @Post('courses/:courseId/tinkoff')
  public async buyCourse(
    @AccountDecorator() account: Account,
    @Param('courseId') courseId: number,
  ): Promise<{ result: boolean }> {
    await this.purchases.buyCourse(account, courseId);
    return { result: true };
  }
}
