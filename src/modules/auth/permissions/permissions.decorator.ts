import { SetMetadata } from '@nestjs/common';
import { CustomDecorator } from '@nestjs/common/decorators/core/set-metadata.decorator';
import { PermissionAction, PermissionResource, PermissionEffect, PermissionResourceTarget } from '@internal/shared/enums/permission.enum';
import { PermissionResourceTargetType } from '@internal/shared/types/permission.type';

export const REQUIRED_PERMISSION = Symbol('REQUIRED_PERMISSION');

export const RequiresPermission = (
  resourceType: PermissionResource,
  action: PermissionAction,
  resourceTarget: PermissionResourceTargetType = PermissionResourceTarget.ANY,
  effect: PermissionEffect = PermissionEffect.ALLOW,
): CustomDecorator<typeof REQUIRED_PERMISSION> =>
  SetMetadata(REQUIRED_PERMISSION, { resourceType, action, resourceTarget, effect });
