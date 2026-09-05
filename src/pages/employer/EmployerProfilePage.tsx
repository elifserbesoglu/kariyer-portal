import React from 'react';
import { CompanyProfileEditor } from '../../features/employer/CompanyProfileEditor';
import { Breadcrumb } from '../../components/ui/Breadcrumb';
import { Settings } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export interface EmployerPageProps {
  onNavigate?: (view: string) => void;
}

export const EmployerProfilePage: React.FC<EmployerPageProps> = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      {/* Breadcrumb Header */}
      <Breadcrumb
        items={[
          { label: 'İşveren Portalı', href: '#' },
          { label: 'Profil ve Hesap Ayarları' },
        ]}
      />

      {/* Page Title & Navigation Bar */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-navy-900 text-white font-bold flex items-center justify-center shadow-md">
            <Settings className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <span>Firma Profil ve Hesap Ayarları</span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold border border-slate-200 dark:border-slate-700">
                Kurumsal Düzenleyici
              </span>
            </h1>
            <p className="text-xs text-slate-500 font-medium">
              {user?.companyName || 'ASELSAN Konya'} kurumsal bilgilerini, yetkili kişi temas detaylarını ve güvenlik ayarlarını yönetin.
            </p>
          </div>
        </div>


      </div>

      {/* Main Dedicated Content: Company Profile Editor */}
      <CompanyProfileEditor />
    </div>
  );
};
