import { HttpException, HttpStatus } from '@nestjs/common';

export class WrongEmailException extends HttpException {
  constructor() {
    super('Пользователь с таким email не существует', HttpStatus.BAD_REQUEST);
  }
}
