import {
  // HttpAdapterHost,
  NestFactory,
} from '@nestjs/core';
import { AppModule } from './app.module';
// import { AllExceptionsFilter } from './cats/exception-filters/all-exceptions.filter';
// import { HttpExceptionFilter } from './cats/exception-filters/http-exception.filter';
// import { logger } from './logger/logger.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.use(logger); // Global middleware - dependency injection not possible
  // app.useGlobalFilters(new HttpExceptionFilter());

  // base exception filter (can be extended)
  // const { httpAdapter } = app.get(HttpAdapterHost);
  // app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));

  await app.listen(3000);
}
bootstrap();
