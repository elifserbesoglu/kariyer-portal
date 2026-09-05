import React from 'react';

export interface PublicLayoutProps {
  children: React.ReactNode;
  onRoleChange?: (role: string) => void;
}

export const PublicLayout: React.FC<PublicLayoutProps> = ({ children }) => {
  return (
    <div className="max-w-1440 w-full mx-auto px-4 md:px-8 py-8 space-y-8">
      {children}
    </div>
  );
};
