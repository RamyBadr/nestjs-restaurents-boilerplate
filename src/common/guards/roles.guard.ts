import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    // console.log(roles,"roles");

    if (!roles) {
      return true;
    }
    // console.log(roles, 'roles');

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    const role = user.role;

    const hasRole = roles.includes(role);
    //user && user.roles &&
    return hasRole;
  }
}
