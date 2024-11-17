import { ReactNode } from 'react';
import { Permission } from '../types/permissions';
import { usePermissions } from '../hooks/usePermissions';

interface PermissionGateProps {
  children: ReactNode;
  permissions: Permission[];
  type?: 'all' | 'any';
}

export default function PermissionGate({ 
  children, 
  permissions, 
  type = 'any' 
}: PermissionGateProps) {
  const { hasAllPermissions, hasAnyPermission } = usePermissions();

  const hasAccess = type === 'all' 
    ? hasAllPermissions(permissions)
    : hasAnyPermission(permissions);

  if (!hasAccess) return null;

  return <>{children}</>;
}