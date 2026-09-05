import React, { useState } from 'react';
import { CompanyApprovalPool } from '../features/career-center/CompanyApprovalPool';
import { BulkEmailEngine } from '../features/career-center/BulkEmailEngine';
import { UnifiedCalendarView } from '../features/career-center/UnifiedCalendarView';
import { AlumniTrackingPool } from '../features/career-center/AlumniTrackingPool';
import { AnalyticsReportingCenter } from '../features/career-center/AnalyticsReportingCenter';
import { GlobalSearchCenter } from '../features/career-center/GlobalSearchCenter';
import { UserManagement } from '../features/admin/UserManagement';
import { AdminJobManagement } from '../features/admin/AdminJobManagement';
import { SystemSettings } from '../features/admin/SystemSettings';
import { StatCard } from '../components/cards/StatCard';
import { ShieldCheck, Building2, Calendar, Users, GraduationCap, BarChart3, Settings, Mail, Briefcase } from 'lucide-react';
import { useWorkflow } from '../context/WorkflowContext';

export const CareerCenterLayout: React.FC<{
  children?: React.ReactNode;
  onRoleChange?: (role: string, subTab?: string) => void;
  initialTab?: 'cockpit' | 'users' | 'jobs' | 'calendar' | 'alumni' | 'analytics' | 'settings' | 'search' | 'email';
}> = ({ initialTab = 'cockpit' }) => {
  const { companies, applications } = useWorkflow();
  const [activeTab, setActiveTab] = useState<
    'cockpit' | 'users' | 'jobs' | 'calendar' | 'alumni' | 'analytics' | 'settings' | 'search' | 'email'
  >(initialTab);

  React.useEffect(() => {
    if (initialTab) setActiveTab(initialTab);
  }, [initialTab]);

  const pendingCompaniesCount = companies.filter((c) => c.approvalStatus === 'PendingApproval').length;

  return (
    <div className="space-y-6">
      {/* Top Stat Cards Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
        <StatCard title="Bekleyen Firma" value={pendingCompaniesCount.toString()} subtitle="Vergi Kimlik İncelemede" className="border-l-4 border-l-amber-500" />
        <StatCard title="Bugünkü Başvuru" value={applications.length.toString()} subtitle="Sistem Geneli" className="border-l-4 border-l-navy-900" />
        <StatCard title="Aktif Staj İlanı" value="48" subtitle="Onaylı Staj" className="border-l-4 border-l-purple-500" />
        <StatCard title="Aktif İşveren" value="241" subtitle="Onaylı Şirket" className="border-l-4 border-l-blue-500" />
        <StatCard title="Aktif Öğrenci" value="15.840" subtitle="KTÜN Lisans" className="border-l-4 border-l-emerald-600" />
        <StatCard title="Mezun Sayısı" value="12.450" subtitle="Sisteme Entegre" className="border-l-4 border-l-burgundy-900" />
        <StatCard title="Sistem Statüsü" value="100%" subtitle="OWASP & Production Safe" className="border-l-4 border-l-emerald-400" />
      </div>

      {/* Main Cockpit Banner & Tab Selector */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-burgundy-700 text-white font-bold flex items-center justify-center">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-900 dark:text-white">
              KTÜN Kariyer Gelişim ve Mezun İzleme Merkezi
            </h2>
            <span className="text-xs text-slate-500 font-medium">Birleşik Kurumsal & Sistem Yönetim Cockpit Paneli</span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-1.5 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl text-xs font-bold">
          <button
            onClick={() => setActiveTab('cockpit')}
            className={`px-3 py-2 rounded-lg flex items-center gap-1.5 transition-colors ${
              activeTab === 'cockpit' ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs' : 'text-slate-500'
            }`}
          >
            <Building2 className="w-4 h-4" />
            <span>Firma Onayları</span>
          </button>

          <button
            onClick={() => setActiveTab('users')}
            className={`px-3 py-2 rounded-lg flex items-center gap-1.5 transition-colors ${
              activeTab === 'users' ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs' : 'text-slate-500'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Kullanıcı Yönetimi</span>
          </button>

          <button
            onClick={() => setActiveTab('jobs')}
            className={`px-3 py-2 rounded-lg flex items-center gap-1.5 transition-colors ${
              activeTab === 'jobs' ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs' : 'text-slate-500'
            }`}
          >
            <Briefcase className="w-4 h-4" />
            <span>İlan Yönetimi</span>
          </button>

          <button
            onClick={() => setActiveTab('calendar')}
            className={`px-3 py-2 rounded-lg flex items-center gap-1.5 transition-colors ${
              activeTab === 'calendar' ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs' : 'text-slate-500'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Ortak Takvim</span>
          </button>

          <button
            onClick={() => setActiveTab('alumni')}
            className={`px-3 py-2 rounded-lg flex items-center gap-1.5 transition-colors ${
              activeTab === 'alumni' ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs' : 'text-slate-500'
            }`}
          >
            <GraduationCap className="w-4 h-4" />
            <span>Mezun Takip</span>
          </button>

          <button
            onClick={() => setActiveTab('analytics')}
            className={`px-3 py-2 rounded-lg flex items-center gap-1.5 transition-colors ${
              activeTab === 'analytics' ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs' : 'text-slate-500'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>Analitik</span>
          </button>

          <button
            onClick={() => setActiveTab('email')}
            className={`px-3 py-2 rounded-lg flex items-center gap-1.5 transition-colors ${
              activeTab === 'email' ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs' : 'text-slate-500'
            }`}
          >
            <Mail className="w-4 h-4" />
            <span>Toplu E-Posta Duyuru</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`px-3 py-2 rounded-lg flex items-center gap-1.5 transition-colors ${
              activeTab === 'settings' ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs' : 'text-slate-500'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>Sistem Ayarları</span>
          </button>
        </div>
      </div>

      {/* Tab Content Components */}
      {activeTab === 'cockpit' && <CompanyApprovalPool />}
      {activeTab === 'users' && <UserManagement />}
      {activeTab === 'jobs' && <AdminJobManagement />}
      {activeTab === 'calendar' && <UnifiedCalendarView />}
      {activeTab === 'alumni' && <AlumniTrackingPool />}
      {activeTab === 'analytics' && <AnalyticsReportingCenter />}
      {activeTab === 'settings' && <SystemSettings />}
      {activeTab === 'search' && <GlobalSearchCenter />}
      {activeTab === 'email' && <BulkEmailEngine />}
    </div>
  );
};
