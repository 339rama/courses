import { ApiProperty } from '@nestjsx/crud/lib/crud';

export class AccountLoginDto {
  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;
}
