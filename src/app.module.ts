import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { UsersModule } from './users/users.module';
import {
  // LoggerMiddleware,
  logger as LoggerMiddleware,
} from './logger/logger.middleware';
import { UsersController } from './users/users.controller';

@Module({
  imports: [CatsModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  // configure(consumer: MiddlewareConsumer) {
  //   consumer.apply(LoggerMiddleware).forRoutes('*'); // /cats, /users, etc.
  //   consumer.apply(LoggerMiddleware, AnotherMiddleware, ...).forRoutes('*'); // /cats, /users
  // }

  // configure(consumer: MiddlewareConsumer) {
  //   consumer.apply(LoggerMiddleware).forRoutes({
  //     path: '/cats',
  //     method: RequestMethod.GET,
  //   });
  // }

  // configure(consumer: MiddlewareConsumer) {
  //   consumer.apply(LoggerMiddleware).forRoutes({
  //     path: '/cats/*splat', // wildcard route `/cats/` wouldn't match
  //     method: RequestMethod.ALL,
  //   });
  // }

  // configure(consumer: MiddlewareConsumer) {
  //   consumer.apply(LoggerMiddleware).forRoutes({
  //     path: '/cats/{*splat}', // wildcard route with optional parameter `/cats/` would match
  //     method: RequestMethod.ALL,
  //   });
  // }

  // configure(consumer: MiddlewareConsumer) {
  //   consumer.apply(LoggerMiddleware).forRoutes({
  //     path: '/cats/{*splat}', // wildcard route with optional parameter `/cats/` would match
  //     method: RequestMethod.ALL,
  //   });
  // }

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .exclude(
        { path: 'users', method: RequestMethod.GET },
        { path: 'users', method: RequestMethod.POST },
        // 'users/{*splat}',
      )
      .forRoutes(UsersController);
  }
}
