import { HttpException, HttpStatus } from '@nestjs/common';

export class WrongCredentialsException extends HttpException {
  constructor() {
    super('Неверные данные входа', HttpStatus.BAD_REQUEST);
  }
}
