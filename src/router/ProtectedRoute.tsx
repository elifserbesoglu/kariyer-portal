import React from 'react';
import { useAuth } from '../context/AuthContext';
import type { UserRole } from '../types/auth';

export interface ProtectedRouteProps {
  allowedRoles: UserRole[];
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles, children, fallback }) => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated || !user) {
    return (
      fallback || (
        <div className="p-12 text-center space-y-3 bg-white dark:bg-slate-900 rounded-2xl border m-8">
          <h2 className="text-lg font-bold text-red-600">401 — Oturum Açılması Gerekiyor</h2>
          <p className="text-xs text-slate-500">Bu kurumsal sayfaya erişmek için lütfen giriş yapınız.</p>
        </div>
      )
    );
  }

  if (!allowedRoles.includes(user.role)) {
    return (
      fallback || (
        <div className="p-12 text-center space-y-3 bg-white dark:bg-slate-900 rounded-2xl border m-8">
          <h2 className="text-lg font-bold text-amber-600">403 — Yetkisiz Erişim Engellendi</h2>
          <p className="text-xs text-slate-500">
            Rolünüz (<strong>{user.role}</strong>) bu modüle erişim yetkisine sahip değildir.
          </p>
        </div>
      )
    );
  }

  return <>{children}</>;
};
