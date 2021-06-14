import { HttpException, HttpStatus } from '@nestjs/common';

export class WrongCodeException extends HttpException {
  constructor() {
    super('Неверный код', HttpStatus.BAD_REQUEST);
  }
}
