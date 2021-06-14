import { ApiProperty } from '@nestjsx/crud/lib/crud';

export class AdminLoginDto {
  @ApiProperty()
  email: string;
  @ApiProperty()
  password: string;
}
