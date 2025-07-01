import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    return validateRequest(request);
  }
}

function validateRequest(request: Request): boolean {
  // Implement your authentication logic here
  // For example, check if the request has a valid token
  const token = request.headers['authorization'];
  console.log('AuthGuard: token:', request.headers);
  if (token && token === 'valid-token') {
    return true;
  }
  return false;
}
