import React, { createContext, useContext, useState, useEffect } from 'react';
import type { CompanyApprovalDto } from '../types/api';

interface CompanyContextType {
  companies: CompanyApprovalDto[];
  approveCompany: (companyId: string) => void;
  rejectCompany: (companyId: string, reason: string) => void;
}

const CompanyContext = createContext<CompanyContextType | undefined>(undefined);

export const CompanyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [companies, setCompanies] = useState<CompanyApprovalDto[]>(() => {
    try {
      const saved = localStorage.getItem('ktun_companies');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('ktun_companies', JSON.stringify(companies));
    } catch {
      // Storage error fallback
    }
  }, [companies]);

  const approveCompany = (companyId: string) => {
    setCompanies((prev) =>
      prev.map((c) => (c.id === companyId ? { ...c, approvalStatus: 'Approved' as const } : c))
    );
  };

  const rejectCompany = (companyId: string, reason: string) => {
    setCompanies((prev) =>
      prev.map((c) => (c.id === companyId ? { ...c, approvalStatus: 'Rejected' as const, notes: reason } : c))
    );
  };

  return (
    <CompanyContext.Provider value={{ companies, approveCompany, rejectCompany }}>
      {children}
    </CompanyContext.Provider>
  );
};

export const useCompany = () => {
  const context = useContext(CompanyContext);
  if (!context) {
    throw new Error('useCompany must be used within a CompanyProvider');
  }
  return context;
};
