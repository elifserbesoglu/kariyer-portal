import React from 'react';
import { useAuth } from '../../context/AuthContext';
import type { UserRole } from '../../types/auth';
import { Error403, ErrorUnauthorized } from '../../features/errors/ErrorPages';
import { PendingApprovalPage } from '../../pages/auth/PendingApprovalPage';

export interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: UserRole[];
  onNavigateLogin?: () => void;
  onNavigateHome?: () => void;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  allowedRoles,
  onNavigateLogin,
  onNavigateHome,
}) => {
  const { user, isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-4 border-burgundy-700 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs font-semibold text-slate-500">Oturum Doğrulanıyor...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return <ErrorUnauthorized onLogin={onNavigateLogin} />;
  }

  // Strict Security Check: Employer awaiting approval is blocked from portal and shown PendingApprovalPage
  if (user.role === 'Employer' && user.approvalStatus === 'PendingApproval') {
    return <PendingApprovalPage onNavigateHome={onNavigateHome} />;
  }

  if (allowedRoles && allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    return <Error403 onGoHome={onNavigateHome} />;
  }

  return <>{children}</>;
};
