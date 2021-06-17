import { ApiProperty } from '@nestjsx/crud/lib/crud';
import { MaxLength, MinLength } from 'class-validator';

export class AccountRegisterDto {
  @ApiProperty()
  @MinLength(1)
  @MaxLength(100)
  name: string;

  @ApiProperty()
  @MinLength(1)
  @MaxLength(100)
  last_name: string;

  @ApiProperty()
  @MinLength(4)
  @MaxLength(100)
  email: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  @MinLength(7)
  @MaxLength(14)
  phone_number: string;

  @ApiProperty()
  @MaxLength(500)
  photo_link?: string;

  @ApiProperty()
  @MinLength(3)
  @MaxLength(1000)
  description: string;

  @ApiProperty()
  telegram?: string;

  @ApiProperty()
  vk_link?: string;

  @ApiProperty()
  instagram_link?: string;

  @ApiProperty()
  facebook_link?: string;

  @ApiProperty()
  site_link?: string;
}
