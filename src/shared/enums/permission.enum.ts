export enum PermissionAction {
  ANY = '*',
  CREATE = 'create',
  DELETE = 'delete',
  EDIT = 'edit',
  GET_DETAIL = 'get-detail',
  GET_LIST = 'get-list',
  GET = 'get', /** detail & list */
}
export enum PermissionEffect {
  ALLOW = 'allow',
  DENY = 'deny',
}
export enum PermissionResourceTarget {
  ANY = '*',
}
export enum PermissionResource {
  ANY = '*',
  USERS = 'users',
  ROLES = 'roles',
}




