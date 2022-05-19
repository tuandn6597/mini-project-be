
import { Role } from '@internal/shared/enums/system.enum';
import { PermissionAction, PermissionEffect, PermissionResourceTarget, PermissionResource } from '@internal/shared/enums/permission.enum';
import { Permission, PermissionResourceTargetType, RoleMapPermissionType } from '@internal/shared/types/permission.type';

export const ROLE_MAP_PERMISSIONS: RoleMapPermissionType = {
  [Role.SUPER_ADMIN]: [
    generatePermission(PermissionResource.ANY, PermissionAction.ANY),
  ],
  [Role.TPKD]: [
    generatePermission(PermissionResource.USERS, PermissionAction.GET_LIST),
    generatePermission(PermissionResource.USERS, PermissionAction.EDIT),
  ],
  [Role.SALE_ADMIN]: [
    generatePermission(PermissionResource.USERS, PermissionAction.GET_LIST),
    generatePermission(PermissionResource.USERS, PermissionAction.EDIT),
  ],
  [Role.BAM]: [],
}

export function generatePermission(
  resourceType: PermissionResource,
  action: PermissionAction,
  resourceTarget: PermissionResourceTargetType = PermissionResourceTarget.ANY,
  effect: PermissionEffect = PermissionEffect.ALLOW,
): Permission {
  return {
    resourceTarget,
    action,
    resourceType,
    effect,
  };
}
