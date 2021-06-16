import { HttpException, HttpStatus } from '@nestjs/common';

export class EmailTakenException extends HttpException {
  constructor() {
    super('Данный email уже занят', HttpStatus.BAD_REQUEST);
  }
}
