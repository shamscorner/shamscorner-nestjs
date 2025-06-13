import { HttpException, HttpStatus } from '@nestjs/common';

export class CustomForbiddenException extends HttpException {
  constructor(message?: string) {
    super(message || 'Custom forbidden message!', HttpStatus.FORBIDDEN);
  }
}
