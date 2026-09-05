import React, { useEffect } from 'react';
import { usePublicRouter } from '../../router/PublicRouter';
import { setPageTitle } from '../../utils/seo';
import { Breadcrumb } from '../../components/ui/Breadcrumb';
import { Button } from '../../components/ui/Button';
import { JobCard } from '../../components/cards/JobCard';
import { SectionTitle } from '../../components/ui/SectionTitle';
import { Error404 } from '../../features/errors/ErrorPages';
import { MOCK_COMPANIES, MOCK_JOBS } from '../../mockData/publicData';
import { MapPin, Phone, Mail, Globe, ShieldCheck } from 'lucide-react';

export const CompanyDetailPage: React.FC = () => {
  const { routeParams, navigate } = usePublicRouter();
  const companyId = routeParams.id || 'aselsan';
  const company = MOCK_COMPANIES.find((c) => c.id === companyId) || MOCK_COMPANIES[0];

  useEffect(() => {
    if (company) {
      setPageTitle(`${company.name} - Firma Profili`, company.about);
    }
  }, [company]);

  if (!company) return <Error404 onGoHome={() => navigate('home')} />;

  const activeJobs = MOCK_JOBS.filter((j) => j.companyId === company.id);

  return (
    <div className="space-y-8">
      <Breadcrumb
        items={[
          { label: 'Anlaşmalı Firmalar', onClick: () => navigate('companies') },
          { label: company.name },
        ]}
      />

      {/* Cover & Hero Section */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
        <div className="h-48 md:h-64 w-full relative">
          <img src={company.coverImage} alt={company.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        </div>

        <div className="p-6 md:p-8 relative -mt-16 flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-24 h-24 rounded-2xl border-4 border-white dark:border-slate-900 p-3 bg-white shadow-md flex items-center justify-center shrink-0">
              <img src={company.logo} alt={company.name} className="max-h-full max-w-full object-contain" />
            </div>
            <div className="space-y-1 text-white md:text-slate-900 dark:md:text-white pt-2">
              <div className="flex items-center gap-2">
                <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">{company.name}</h1>
                <ShieldCheck className="w-5 h-5 text-burgundy-500 fill-burgundy-100" aria-label="KTÜN Onaylı Kurumsal Partner" />
              </div>
              <p className="text-xs md:text-sm font-semibold opacity-90">{company.sector}</p>
              <div className="flex items-center gap-2 text-xs opacity-80 pt-1">
                <MapPin className="w-3.5 h-3.5" />
                <span>{company.location}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <a href={company.website} target="_blank" rel="noreferrer" className="w-full md:w-auto">
              <Button variant="outline" fullWidth leftIcon={<Globe className="w-4 h-4" />}>
                Resmi Web Sitesi
              </Button>
            </a>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* About & Partnership */}
        <div className="lg:col-span-2 space-y-6">
          <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white border-b pb-3">Hakkında</h2>
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              {company.about}
            </p>
          </div>

          <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white border-b pb-3">KTÜN İş Birliği Detayları</h2>
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              {company.partnershipDetails}
            </p>
          </div>

          {/* Active Job Openings */}
          <div className="space-y-4 pt-4">
            <SectionTitle title={`Açık İlanlar (${activeJobs.length})`} />
            {activeJobs.length > 0 ? (
              <div className="space-y-4">
                {activeJobs.map((j) => (
                  <JobCard
                    key={j.id}
                    id={j.id}
                    companyName={j.companyName}
                    companyLogo={j.companyLogo}
                    title={j.title}
                    location={j.location}
                    workType={j.workType}
                    deadline={j.deadline}
                    onClick={() => navigate('job-detail', { id: j.id })}
                  />
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-500">Şu anda bu firmaya ait aktif ilan bulunmamaktadır.</p>
            )}
          </div>
        </div>

        {/* Sidebar Info & Map */}
        <div className="space-y-6">
          <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 border-b pb-2">İletişim Bilgileri</h3>
            <div className="space-y-3 text-xs">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-burgundy-700 shrink-0" />
                <span>{company.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-burgundy-700 shrink-0" />
                <span>{company.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-burgundy-700 shrink-0" />
                <span>{company.website}</span>
              </div>
            </div>
          </div>

          {/* Interactive Map Box */}
          <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Konum & Harita</h3>
            <div className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-800 h-40 flex items-center justify-center text-center p-4">
              <div>
                <MapPin className="w-8 h-8 text-burgundy-700 mx-auto mb-1 animate-bounce" />
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200">{company.name} Haritası</span>
                <p className="text-[10px] text-slate-500">{company.location}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
