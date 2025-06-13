import {
  BadRequestException,
  Controller,
  ForbiddenException,
  Get,
  // HttpException,
  // HttpStatus,
  Post,
  UseFilters,
} from '@nestjs/common';
// import { HttpExceptionFilter } from './exception-filters/http-exception.filter';
import { CatchEverythingFilter } from './exception-filters/catch-everything.filter';
// import { CustomForbiddenException } from './exceptions/forbidden.exception';

@Controller('exception-filters')
export class ExceptionFiltersController {
  @Get('test-exception')
  testException() {
    throw new Error('This is a test exception');
  }

  @Post('forbidden-access')
  // @UseFilters(new HttpExceptionFilter()) // instance of filter
  // @UseFilters(HttpExceptionFilter) // class way
  // @UseFilters(CatchEverythingFilter)
  forbiddenAccess() {
    // throw new HttpException('Forbidden access!', 403);

    // throw new HttpException('Forbidden access!', HttpStatus.FORBIDDEN);

    // throw new HttpException(
    //   {
    //     error: 'Forbidden access!',
    //     message: 'You do not have permission to access this resource.',
    //     timestamp: new Date().toISOString(),
    //   },
    //   HttpStatus.FORBIDDEN,
    // );

    // throw new HttpException(
    //   new Error('Forbidden access!'),
    //   HttpStatus.FORBIDDEN,
    // );

    // try {
    //   throw new Error('User is not authorized');
    // } catch (error) {
    //   throw new HttpException(
    //     'You do not have permission to access this resource.',
    //     HttpStatus.FORBIDDEN,
    //     {
    //       cause: error,
    //     },
    //   );
    // }

    // custom exception
    // throw new CustomForbiddenException(
    //   'You are not allowed to access this resource!', // optional message
    // );

    throw new ForbiddenException();

    // try {
    //   throw new Error('User is not authorized');
    // } catch (error) {
    //   throw new ForbiddenException('Forbidden access!', {
    //     cause: error, // optional cause
    //     description: 'User is not authorized to access this resource.',
    //   });
    // }

    // throw new BadRequestException();
  }
}
