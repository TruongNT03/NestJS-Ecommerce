import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { ROLE } from 'src/decorators/role.decorator';
import { UserRequestPayload } from '../auth.interface';
import { RoleType } from 'src/common/enum/role.enum';
import { IS_PUBLIC } from 'src/decorators/public.decorator';
import { ServerException } from 'src/exceptions/sever.exception';
import { ERROR_RESPONSE } from 'src/common/constants/error-response.constants';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isPublic = this.reflector.getAllAndOverride(IS_PUBLIC, [
      context.getClass(),
      context.getHandler(),
    ]);
    if (isPublic) {
      return true;
    }
    const user: UserRequestPayload = context.switchToHttp().getRequest().user;
    const acceptRoles: RoleType[] = this.reflector.getAllAndOverride(ROLE, [
      context.getClass(),
      context.getHandler(),
    ]);
    const userRole = user.roles;
    if (!userRole) {
      throw new ServerException(ERROR_RESPONSE.ROLE_REQUIRED);
    }
    return userRole.some((role) => acceptRoles.includes(role));
  }
}
