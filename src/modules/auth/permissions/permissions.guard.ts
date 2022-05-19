import { ExecutionContext, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { REQUIRED_PERMISSION } from './permissions.decorator';
import { ROLE_MAP_PERMISSIONS } from './permissions.helpers';
import { Permission } from '@internal/shared/types/permission.type';
import { PermissionAction, PermissionEffect, PermissionResource, PermissionResourceTarget } from '@internal/shared/enums/permission.enum';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../auth.service';

@Injectable()
export class PermissionsGuard extends AuthGuard('jwt') {
  constructor(
    private readonly reflector: Reflector,
    @Inject(AuthService) private readonly authService: AuthService,
  ) {
    super()
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const shouldActive = await super.canActivate(context);
    if (!shouldActive) {
      throw new UnauthorizedException();
    }
    const requiredPermission = this.getRequiredPermission(context);
    if (!requiredPermission) {
      return true;
    }

    const req = context.switchToHttp().getRequest();
    if (!req.user) {
      throw new UnauthorizedException();
    }
    const { roles } = await this.authService.validate(req.user);
    const matchPermissions = roles.map(role => {
      const grantedPermissions = [...ROLE_MAP_PERMISSIONS[role.code], ...role.permissions];
      return this.grantedMatchRequired(grantedPermissions, requiredPermission);
    })

    if (!matchPermissions.length) {
      return false;
    }

    return matchPermissions.some(Boolean);
  }

  private grantedMatchRequired(grantedPermissions: Permission[], requiredPermission: Permission): boolean {
    if (requiredPermission.effect !== PermissionEffect.ALLOW) {
      throw new Error('should only be used with ALLOW effect permissions');
    }

    const matchingPermissions = grantedPermissions.filter(
      (p) =>
        [PermissionResource.ANY, requiredPermission.resourceType].includes(p.resourceType) &&
        [PermissionAction.ANY, requiredPermission.action].includes(p.action) &&
        [PermissionResourceTarget.ANY, requiredPermission.resourceTarget].includes(p.resourceTarget)
    );

    if (!matchingPermissions.length) {
      return false;
    }

    return !matchingPermissions.some((p) => p.effect === PermissionEffect.DENY);
  }

  private getRequiredPermission(context: ExecutionContext): Permission {
    return this.reflector.get<Permission>(REQUIRED_PERMISSION, context.getHandler());
  }
}
