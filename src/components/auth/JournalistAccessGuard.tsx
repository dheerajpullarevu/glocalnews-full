import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

interface JournalistAccessGuardProps {
  children: ReactNode;
  allowMediaHouseOnly?: boolean;
}

export default function JournalistAccessGuard({ children, allowMediaHouseOnly }: JournalistAccessGuardProps) {
  const { user } = useAuth();
  const isMobileBrowser = /Android|webOS|iPhone|iPad|iPod/i.test(navigator.userAgent);

  if (!user || user.role !== 'journalist') {
    return <Navigate to="/login" />;
  }

  // Independent journalists can only access through mobile app
  if (user.type === 'independent' && !isMobileBrowser) {
    return <Navigate to="/download-app" />;
  }

  // Media house journalists can access through web
  if (allowMediaHouseOnly && user.type !== 'mediaHouse') {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
}