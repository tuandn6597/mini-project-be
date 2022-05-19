
import { Role } from '@internal/shared/enums/system.enum';
import { PermissionResource, PermissionResourceTarget, PermissionAction, PermissionEffect } from '@internal/shared/enums/permission.enum';

export type PermissionResourceTargetType = PermissionResourceTarget | string | {[key: string]: any};

export type RoleMapPermissionType = {
  [k in Role]: Permission[] | []
}

export type Permission = {
  resourceType: PermissionResource;
  resourceTarget: PermissionResourceTargetType;
  action: PermissionAction;
  effect: PermissionEffect;
}

