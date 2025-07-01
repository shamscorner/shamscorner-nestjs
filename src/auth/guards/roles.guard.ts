import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { Roles } from '../decorators/roles.decorator';
// import { Observable } from 'rxjs';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  // canActivate(
  //   context: ExecutionContext,
  // ): boolean | Promise<boolean> | Observable<boolean> {
  //   return false;
  // }

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get(Roles, context.getHandler());

    if (!roles) return true;

    const request = context.switchToHttp().getRequest<Request>();

    return matchRoles(roles, request);
  }
}

function matchRoles(roles: string[], request: Request) {
  // get the user from request like
  // const user = request.user;

  const user = { role: 'user' }; // admin
  return roles.includes(user.role);
}
