import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { Request, Response } from 'express';

// @Catch(HttpException)
// @Catch(ForbiddenException)
@Catch(BadRequestException, ForbiddenException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
