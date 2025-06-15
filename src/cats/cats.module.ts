import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
// import { UsersService } from 'src/users/users.service';
import { UsersModule } from 'src/users/users.module';
import { ExceptionFiltersController } from './exception-filters.controller';
// import { APP_FILTER, APP_PIPE } from '@nestjs/core';
// import { HttpExceptionFilter } from './exception-filters/http-exception.filter';
// import { AllExceptionsFilter } from './exception-filters/all-exceptions.filter';
// import { ValidationPipe } from './pipes/validation.pipe';

@Module({
  imports: [UsersModule], // If I import here, everything would be shared and sigleton.
  controllers: [CatsController, ExceptionFiltersController],
  // I can pass the UsersService here, but that would create a new instance every time the CatsService is created.
  providers: [
    CatsService,
    // {
    //   provide: APP_FILTER,
    //   useClass: HttpExceptionFilter,
    // },
    // {
    //   provide: APP_FILTER,
    //   useClass: AllExceptionsFilter,
    // },
    // {
    //   provide: APP_PIPE,
    //   useClass: ValidationPipe,
    // },
  ],
})
export class CatsModule {}
