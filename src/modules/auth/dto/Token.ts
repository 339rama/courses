import { ApiProperty } from '@nestjsx/crud/lib/crud';

export class Token {
  @ApiProperty()
  access_token: string;

  @ApiProperty()
  token_type: 'Bearer';
}
