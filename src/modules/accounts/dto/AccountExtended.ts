import { ApiProperty } from '@nestjsx/crud/lib/crud';
import { Account } from '../models/Account/Account.entity';

export class AccountExtendedDto extends Account {
  @ApiProperty()
  is_leader: boolean;
}
