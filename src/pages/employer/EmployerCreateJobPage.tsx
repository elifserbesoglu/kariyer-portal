import React from 'react';
import { JobCreationWizard } from '../../features/employer/JobCreationWizard';
import { Breadcrumb } from '../../components/ui/Breadcrumb';
import { Plus } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export interface EmployerPageProps {
  onNavigate?: (view: string) => void;
}

export const EmployerCreateJobPage: React.FC<EmployerPageProps> = ({ onNavigate }) => {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      {/* Breadcrumb Header */}
      <Breadcrumb
        items={[
          { label: 'İşveren Portalı', href: '#' },
          { label: 'Yeni İlan Yayınla' },
        ]}
      />

      {/* Page Title & Navigation Bar */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white font-bold flex items-center justify-center shadow-md">
            <Plus className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <span>Yeni İlan Yayınlama Sihirbazı</span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-burgundy-100 dark:bg-burgundy-950 text-burgundy-700 dark:text-burgundy-300 font-bold border border-burgundy-200 dark:border-burgundy-800">
                Adım Adım
              </span>
            </h1>
            <p className="text-xs text-slate-500 font-medium">
              {user?.companyName || 'ASELSAN Konya'} adına onaylı tam zamanlı/yarı zamanlı veya staj ilanı oluşturun.
            </p>
          </div>
        </div>


      </div>

      {/* Main Dedicated Content: Step-by-Step Job Creation Wizard */}
      <JobCreationWizard onComplete={() => onNavigate && onNavigate('employer-ats')} />
    </div>
  );
};
