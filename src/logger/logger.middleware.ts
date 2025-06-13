// import { Injectable, NestMiddleware } from '@nestjs/common';
// import { UsersService } from 'src/users/users.service';
import { NextFunction, Request, Response } from 'express';

// @Injectable()
// export class LoggerMiddleware implements NestMiddleware {
//   // constructor(private readonly usersService: UsersService) {}

//   use(req: Request, res: Response, next: NextFunction) {
//     console.log('Request: ', req.method, req.path);
//     console.log('Response: ', res.statusCode);
//     // console.log('User Service: ', this.usersService.findAll());
//     next();
//   }
// }

export function logger(req: Request, res: Response, next: NextFunction) {
  console.log(`Request: ${req.method} ${req.path}`);
  console.log(`Response: ${res.statusCode}`);
  next();
}
