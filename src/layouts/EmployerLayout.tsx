import React, { useState } from 'react';
import { EmployerAtsKanban } from '../features/employer/EmployerAtsKanban';
import { JobCreationWizard } from '../features/employer/JobCreationWizard';
import { CompanyProfileEditor } from '../features/employer/CompanyProfileEditor';
import { StatCard } from '../components/cards/StatCard';
import { Building2, Plus, Users, Settings } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const EmployerLayout: React.FC<{ initialTab?: 'ats' | 'create-job' | 'profile' }> = ({ initialTab = 'ats' }) => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'ats' | 'create-job' | 'profile'>(initialTab);

  React.useEffect(() => {
    if (initialTab) setActiveTab(initialTab);
  }, [initialTab]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Yayındaki İlanlar" value="4" subtitle="Doğrudan Yayında" className="border-l-4 border-l-emerald-500" />
        <StatCard title="Toplam Başvuru" value="42" subtitle="Aday İncelemede" className="border-l-4 border-l-burgundy-700" />
        <StatCard title="Mülakat Aşaması" value="6" subtitle="Teams & Fiziksel" className="border-l-4 border-l-navy-900" />
        <StatCard title="Tamamlanan İşe Alım" value="2" subtitle="Aday Mühendis" className="border-l-4 border-l-amber-500" />
      </div>

      <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-burgundy-700 text-white font-bold flex items-center justify-center">
            <Building2 className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-900 dark:text-white">
              {user?.companyName || 'ASELSAN Konya Silah Sistemleri A.Ş.'}
            </h2>
            <span className="text-xs text-slate-500 font-medium">Kurumsal İşveren Portalı</span>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl text-xs font-bold">
          <button
            onClick={() => setActiveTab('ats')}
            className={`px-3 py-2 rounded-lg flex items-center gap-1.5 transition-colors ${
              activeTab === 'ats' ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs' : 'text-slate-500'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>ATS Kanban Pano</span>
          </button>

          <button
            onClick={() => setActiveTab('create-job')}
            className={`px-3 py-2 rounded-lg flex items-center gap-1.5 transition-colors ${
              activeTab === 'create-job' ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs' : 'text-slate-500'
            }`}
          >
            <Plus className="w-4 h-4 text-burgundy-700" />
            <span>Yeni İlan Oluştur</span>
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`px-3 py-2 rounded-lg flex items-center gap-1.5 transition-colors ${
              activeTab === 'profile' ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs' : 'text-slate-500'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>Firma Profil Ayarları</span>
          </button>
        </div>
      </div>

      {activeTab === 'ats' && <EmployerAtsKanban />}
      {activeTab === 'create-job' && <JobCreationWizard onComplete={() => setActiveTab('ats')} />}
      {activeTab === 'profile' && <CompanyProfileEditor />}
    </div>
  );
};
