export type Permission = 
  | 'create:article'
  | 'edit:article'
  | 'delete:article'
  | 'manage:users'
  | 'manage:comments'
  | 'manage:media'
  | 'view:analytics';

export type Role = 'admin' | 'journalist' | 'user';

export const rolePermissions: Record<Role, Permission[]> = {
  admin: [
    'create:article',
    'edit:article',
    'delete:article',
    'manage:users',
    'manage:comments',
    'manage:media',
    'view:analytics'
  ],
  journalist: [
    'create:article',
    'edit:article',
    'manage:media'
  ],
  user: []
};