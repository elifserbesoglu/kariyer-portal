import type { UserRole } from '../types/auth';

export const ROLE_PERMISSIONS: Record<UserRole, string[]> = {
  Anonymous: [],
  Student: ['Applications.Submit', 'Cv.Manage', 'Events.Register'],
  Alumni: ['Applications.Submit', 'Cv.Manage', 'Events.Register'],
  Employer: ['Jobs.Create', 'Applications.ManageStages', 'Company.EditProfile'],
  CareerCenter: [
    'Companies.Approve',
    'Jobs.Create',
    'Applications.ManageStages',
    'Events.Manage',
    'Reports.View',
    'System.ManageUsers',
    'System.ManageRoles',
    'System.ViewAuditLogs',
    'System.ManageSettings',
  ],
};

export const hasPermission = (role: UserRole | undefined | null, permission: string): boolean => {
  if (!role) return false;
  const permissions = ROLE_PERMISSIONS[role] || [];
  return permissions.includes(permission);
};
