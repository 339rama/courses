import { ApiProperty } from '@nestjs/swagger';
import { Account } from 'src/modules/accounts/models/Account/Account.entity';

export class CourseBuyDto {
  @ApiProperty({ type: Account })
  account: Account;
  @ApiProperty()
  course_id: number;
  @ApiProperty()
  amount: number;
}
