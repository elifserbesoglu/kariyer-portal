import React, { useState, useEffect } from 'react';
import { usePublicRouter } from '../../router/PublicRouter';
import { setPageTitle } from '../../utils/seo';
import { Breadcrumb } from '../../components/ui/Breadcrumb';
import { SearchBox } from '../../components/ui/SearchBox';
import { SectionTitle } from '../../components/ui/SectionTitle';
import { AnnouncementCard } from '../../components/cards/AnnouncementCard';
import { MOCK_ANNOUNCEMENTS } from '../../mockData/publicData';

export const AnnouncementsPage: React.FC = () => {
  const { navigate } = usePublicRouter();
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setPageTitle('Duyurular ve Haberler', 'KTÜN Kariyer Merkezi duyuru ve bilgilendirme arşivi.');
  }, []);

  const filtered = MOCK_ANNOUNCEMENTS.filter((ann) =>
    ann.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <Breadcrumb items={[{ label: 'Duyurular & Haberler' }]} />

      <SectionTitle
        title="Duyurular ve Haberler"
        subtitle="Staj takvimleri, başvuru kılavuzları ve merkez bilgilendirmeleri"
      />

      <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm max-w-md">
        <SearchBox
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onClear={() => setSearchQuery('')}
          placeholder="Duyurularda ara..."
        />
      </div>

      <div className="space-y-3">
        {filtered.map((ann) => (
          <AnnouncementCard
            key={ann.id}
            id={ann.id}
            title={ann.title}
            date={ann.date}
            category={ann.category}
            isImportant={ann.isImportant}
            onClick={() => navigate('announcement-detail', { id: ann.id })}
          />
        ))}
      </div>
    </div>
  );
};
