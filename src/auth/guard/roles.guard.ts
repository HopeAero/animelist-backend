import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorador';
import { User, UserRole } from 'src/users/entities/user.entity';

@Injectable()
export class RolesGuard implements CanActivate {

  constructor(private readonly reflector : Reflector) {}

  canActivate(context: ExecutionContext): boolean  {

    const requiredRoles  = this.reflector.getAllAndOverride<UserRole[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass()
    ]);

    if (!requiredRoles ) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();

    if (user.role === UserRole.ADMIN) {
      return true;
    }

    return requiredRoles.includes(user.role);
  }
}
