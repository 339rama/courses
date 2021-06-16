import { HttpException, HttpStatus } from '@nestjs/common';

export class EmailConfirmException extends HttpException {
  constructor() {
    super('Что-то пошло не так', HttpStatus.BAD_REQUEST);
  }
}
