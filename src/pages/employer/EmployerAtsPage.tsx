import React, { useState } from 'react';
import { EmployerAtsKanban } from '../../features/employer/EmployerAtsKanban';
import { EmployerJobList } from '../../features/employer/EmployerJobList';
import { StatCard } from '../../components/cards/StatCard';
import { Breadcrumb } from '../../components/ui/Breadcrumb';
import { Building2, Briefcase, Users } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useWorkflow } from '../../context/WorkflowContext';

export interface EmployerPageProps {
  onNavigate?: (view: string) => void;
}

export const EmployerAtsPage: React.FC<EmployerPageProps> = ({ onNavigate }) => {
  const { user } = useAuth();
  const { jobs, applications } = useWorkflow();

  const [activeTab, setActiveTab] = useState<'jobs' | 'ats'>(() => {
    const saved = localStorage.getItem('ktun_employer_active_tab');
    return saved === 'jobs' || saved === 'ats' ? saved : 'ats';
  });

  const handleTabChange = (tab: 'jobs' | 'ats') => {
    setActiveTab(tab);
    localStorage.setItem('ktun_employer_active_tab', tab);
  };

  return (
    <div className="space-y-6">
      {/* Breadcrumb Header */}
      <Breadcrumb
        items={[
          { label: 'İşveren Portalı', href: '#' },
          { label: 'Firma Paneli' },
        ]}
      />

      {/* Page Title & Navigation Bar */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-burgundy-700 text-white font-bold flex items-center justify-center shadow-md">
            <Building2 className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <span>{user?.companyName || 'ASELSAN Konya Silah Sistemleri A.Ş.'}</span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-bold border border-emerald-200 dark:border-emerald-800">
                Onaylı Kurum
              </span>
            </h1>
            <p className="text-xs text-slate-500 font-medium">Firma Yönetim Paneli — İlan İnceleme, Düzenleme & Aday Takip</p>
          </div>
        </div>

        {/* Tab Selector & New Job Button */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl text-xs font-bold">
            <button
              onClick={() => handleTabChange('jobs')}
              className={`px-3 py-2 rounded-lg flex items-center gap-1.5 transition-colors ${
                activeTab === 'jobs' ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs' : 'text-slate-500'
              }`}
            >
              <Briefcase className="w-4 h-4" />
              <span>Yayınlanan İlanlarım ({jobs.length})</span>
            </button>

            <button
              onClick={() => handleTabChange('ats')}
              className={`px-3 py-2 rounded-lg flex items-center gap-1.5 transition-colors ${
                activeTab === 'ats' ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs' : 'text-slate-500'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Aday Takip (ATS) ({applications.length})</span>
            </button>
          </div>
        </div>
      </div>

      {/* High-Level Key Performance Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Yayındaki İlanlar" value={jobs.filter((j) => j.moderationStatus === 'Published').length.toString()} subtitle="Doğrudan Yayında" className="border-l-4 border-l-emerald-500" />
        <StatCard title="Toplam Başvuru" value={applications.length.toString()} subtitle="Aday İncelemede" className="border-l-4 border-l-burgundy-700" />
        <StatCard title="Mülakat Aşaması" value="6" subtitle="Teams & Fiziksel" className="border-l-4 border-l-navy-900" />
        <StatCard title="Tamamlanan İşe Alım" value="2" subtitle="Aday Mühendis" className="border-l-4 border-l-amber-500" />
      </div>

      {/* Main Tab Content */}
      {activeTab === 'jobs' && (
        <EmployerJobList
          onNavigateToAts={() => handleTabChange('ats')}
          onCreateNewJob={() => onNavigate && onNavigate('employer-create-job')}
        />
      )}

      {activeTab === 'ats' && <EmployerAtsKanban />}
    </div>
  );
};
