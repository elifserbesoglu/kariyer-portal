import React, { useEffect } from 'react';
import { usePublicRouter } from '../../router/PublicRouter';
import { setPageTitle } from '../../utils/seo';
import { Breadcrumb } from '../../components/ui/Breadcrumb';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Error404 } from '../../features/errors/ErrorPages';
import { MOCK_ANNOUNCEMENTS } from '../../mockData/publicData';
import { Calendar, FileText, Download } from 'lucide-react';

export const AnnouncementDetailPage: React.FC = () => {
  const { routeParams, navigate } = usePublicRouter();
  const annId = routeParams.id || 'ann-1';
  const ann = MOCK_ANNOUNCEMENTS.find((a) => a.id === annId) || MOCK_ANNOUNCEMENTS[0];

  useEffect(() => {
    if (ann) {
      setPageTitle(`${ann.title} - Duyuru Detayı`, ann.summary);
    }
  }, [ann]);

  if (!ann) return <Error404 onGoHome={() => navigate('home')} />;

  const related = MOCK_ANNOUNCEMENTS.filter((a) => a.id !== ann.id);

  return (
    <div className="space-y-8">
      <Breadcrumb
        items={[
          { label: 'Duyurular', onClick: () => navigate('announcements') },
          { label: ann.title },
        ]}
      />

      <div className="p-6 md:p-8 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <div className="space-y-3 border-b border-slate-100 dark:border-slate-800 pb-6">
          <div className="flex items-center gap-3">
            <Badge variant={ann.isImportant ? 'primary' : 'secondary'} size="md">
              {ann.category}
            </Badge>
            <span className="text-xs font-semibold text-slate-400 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {ann.date}
            </span>
          </div>

          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {ann.title}
          </h1>
        </div>

        <div className="prose dark:prose-invert max-w-none text-sm text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line">
          {ann.content}
        </div>

        {/* Attachments Section */}
        {ann.attachments && ann.attachments.length > 0 && (
          <div className="pt-6 border-t border-slate-100 dark:border-slate-800 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-burgundy-700" />
              Ek Dosyalar ve İndirilebilir Belgeler
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {ann.attachments.map((file, idx) => (
                <div key={idx} className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center justify-between gap-3">
                  <div className="truncate">
                    <span className="block text-xs font-bold text-slate-800 dark:text-slate-200 truncate">{file.name}</span>
                    <span className="text-[10px] text-slate-400">{file.size}</span>
                  </div>
                  <Button variant="secondary" size="sm" leftIcon={<Download className="w-3.5 h-3.5" />}>
                    İndir
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Related Announcements */}
      {related.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-base font-bold text-slate-900 dark:text-white">İlgili Diğer Duyurular</h3>
          <div className="space-y-3">
            {related.map((r) => (
              <div key={r.id} onClick={() => navigate('announcement-detail', { id: r.id })} className="cursor-pointer">
                <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-sm font-bold hover:text-burgundy-700 transition-colors">
                  {r.title}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
