import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { logger } from './logger/logger.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.use(logger); // Global middleware - dependency injection not possible
  await app.listen(3000);
}
bootstrap();
