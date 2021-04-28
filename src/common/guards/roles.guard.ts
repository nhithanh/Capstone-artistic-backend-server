import {
    CanActivate,
    ExecutionContext,
    HttpException,
    HttpStatus,
    Inject,
    Injectable,
  } from '@nestjs/common';
  import { Reflector } from '@nestjs/core';
import { ROLE } from '../constants/roles.constant';
import { META_DATA_ROLES_KEY } from '../decorators/role.decorator';
  
  @Injectable()
  export class PermissionGuard implements CanActivate {
    @Inject()
    private readonly reflector: Reflector;
  
    async canActivate(context: ExecutionContext): Promise<boolean> {
      const requireRoles = this.reflector.getAllAndOverride<ROLE[]>(
        META_DATA_ROLES_KEY,
        [context.getHandler(), context.getClass()],
      );
      if (!requireRoles) {
        return true;
      }
      const { user } = context.switchToHttp().getRequest();

      // check role user ở đây

      throw new HttpException(
        {
          statusCode: 403,
          message: `User with id: ${user.id} is not have ${requireRoles} role`,
        },
        HttpStatus.FORBIDDEN,
      );
    }
  }
  