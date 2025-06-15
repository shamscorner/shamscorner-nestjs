import {
  // HttpAdapterHost,
  NestFactory,
} from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
// import { logger } from './logger/logger.middleware';
// import { AllExceptionsFilter } from './cats/exception-filters/all-exceptions.filter';
// import { HttpExceptionFilter } from './cats/exception-filters/http-exception.filter';
// import { ValidationPipe } from './cats/pipes/validation.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.use(logger); // Global middleware - dependency injection not possible
  // app.useGlobalFilters(new HttpExceptionFilter());

  // base exception filter (can be extended)
  // const { httpAdapter } = app.get(HttpAdapterHost);
  // app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));

  // Global pipes
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
}
bootstrap();
