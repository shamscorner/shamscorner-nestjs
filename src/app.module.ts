import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';

// import { APP_GUARD } from '@nestjs/core';
// import { HttpExceptionFilter } from './cats/exception-filters/http-exception.filter';
// import { APP_FILTER } from '@nestjs/core';
import { AuthModule } from './auth/auth.module';
// import { RolesGuard } from './auth/guards/roles.guard';
import { CatsModule } from './cats/cats.module';
// import { LoggingInterceptor } from './cats/interceptors/logging.interceptor';
import {
  // LoggerMiddleware,
  logger as LoggerMiddleware,
} from './logger/logger.middleware';
import { UsersController } from './users/users.controller';
import { UsersModule } from './users/users.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [CatsModule, UsersModule, AuthModule],
  controllers: [AppController],
  providers: [
    AppService,
    // {
    //   provide: APP_FILTER,
    //   useClass: HttpExceptionFilter,
    // },
    // {
    //   provide: APP_GUARD,
    //   useClass: RolesGuard,
    // },
    // {
    //   provide: 'APP_INTERCEPTOR',
    //   useClass: LoggingInterceptor,
    // },
  ],
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
