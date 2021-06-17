import { ApiProperty } from '@nestjs/swagger';

export class EmailConfirmDto {
  @ApiProperty()
  account_id: number;
  @ApiProperty()
  code: string;
}
