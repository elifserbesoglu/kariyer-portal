import React, { useState, useEffect, useMemo } from 'react';
import { usePublicRouter } from '../../router/PublicRouter';
import { setPageTitle } from '../../utils/seo';
import { Breadcrumb } from '../../components/ui/Breadcrumb';
import { SearchBox } from '../../components/ui/SearchBox';
import { Select } from '../../components/ui/Select';
import { SectionTitle } from '../../components/ui/SectionTitle';
import { CompanyCard } from '../../components/cards/CompanyCard';
import { EmptyState } from '../../components/ui/EmptyState';
import { MOCK_COMPANIES } from '../../mockData/publicData';

export const CompaniesPage: React.FC = () => {
  const { navigate } = usePublicRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [sectorFilter, setSectorFilter] = useState('all');

  useEffect(() => {
    setPageTitle('İş Birliği Yaptığımız Firmalar', 'Konya Teknik Üniversitesi ile protokolü bulunan onaylı kurumsal firmalar.');
  }, []);

  const filteredCompanies = useMemo(() => {
    return MOCK_COMPANIES.filter((comp) => {
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = comp.name.toLowerCase().includes(q);
        const matchesSector = comp.sector.toLowerCase().includes(q);
        if (!matchesName && !matchesSector) return false;
      }
      if (sectorFilter !== 'all') {
        if (!comp.sector.toLowerCase().includes(sectorFilter.toLowerCase())) return false;
      }
      return true;
    });
  }, [searchQuery, sectorFilter]);

  return (
    <div className="space-y-6">
      <Breadcrumb items={[{ label: 'Anlaşmalı Firmalar' }]} />

      <SectionTitle
        title="Kurumsal İş Birliği Yaptığımız Firmalar"
        subtitle="Üniversitemiz protokol ortağı teknoloji ve sanayi devleri"
      />

      {/* Filter Bar */}
      <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="w-full md:w-96">
          <SearchBox
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onClear={() => setSearchQuery('')}
            placeholder="Firma adı veya sektör ara..."
          />
        </div>

        <Select
          value={sectorFilter}
          onChange={(e) => setSectorFilter(e.target.value)}
          options={[
            { value: 'all', label: 'Tüm Sektörler' },
            { value: 'savunma', label: 'Savunma Sanayii' },
            { value: 'yazılım', label: 'Yazılım & Bilişim' },
            { value: 'araştırma', label: 'Ar-Ge & Araştırma' },
            { value: 'gıda', label: 'Gıda & Tarım' },
          ]}
          className="w-full md:w-64"
        />
      </div>

      {/* Grid List */}
      {filteredCompanies.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCompanies.map((comp) => (
            <CompanyCard
              key={comp.id}
              id={comp.id}
              name={comp.name}
              logo={comp.logo}
              sector={comp.sector}
              location={comp.location}
              activeJobCount={comp.activeJobCount}
              description={comp.about}
              onClick={() => navigate('company-detail', { id: comp.id })}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          title="Firma Bulunamadı"
          description="Arama kriterlerinizi değiştirerek tekrar deneyiniz."
          actionLabel="Aramayı Sıfırla"
          onAction={() => { setSearchQuery(''); setSectorFilter('all'); }}
        />
      )}
    </div>
  );
};
