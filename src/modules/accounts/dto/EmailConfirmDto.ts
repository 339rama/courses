import { ApiProperty } from '@nestjs/swagger';

export class EmailConfirmDto {
  @ApiProperty()
  accountId: number;
  @ApiProperty()
  code: string;
}
