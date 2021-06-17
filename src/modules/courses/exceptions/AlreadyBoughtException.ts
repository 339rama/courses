import { HttpException, HttpStatus } from '@nestjs/common';

export class AlreadyBoughtException extends HttpException {
  constructor() {
    super('Курс уже оплачен', HttpStatus.BAD_REQUEST);
  }
}
