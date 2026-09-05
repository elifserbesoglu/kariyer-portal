import React, { useState } from 'react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Folder, Download, Search } from 'lucide-react';
import { Badge } from '../../components/ui/Badge';

export interface VaultFile {
  id: string;
  name: string;
  category: 'CV' | 'Transkript' | 'Sertifikalar' | 'Firma Logoları' | 'Etkinlik Görselleri';
  version: string;
  size: string;
  uploadedBy: string;
  uploadDate: string;
  mimeType: string;
}

export const FileManagementCenter: React.FC = () => {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('ALL');

  const [files] = useState<VaultFile[]>([
    {
      id: 'f-1',
      name: 'ATS_Format_Emre_Tunc_CV.pdf',
      category: 'CV',
      version: 'v2.1',
      size: '1.2 MB',
      uploadedBy: 'Emre Tunç (Öğrenci)',
      uploadDate: '15.05.2024',
      mimeType: 'application/pdf',
    },
    {
      id: 'f-2',
      name: 'ASELSAN_Konya_Logo_HD.png',
      category: 'Firma Logoları',
      version: 'v1.0',
      size: '450 KB',
      uploadedBy: 'Mehmet Yılmaz (İşveren)',
      uploadDate: '10.05.2024',
      mimeType: 'image/png',
    },
    {
      id: 'f-3',
      name: 'KTUN_OBS_Transkript_2024.pdf',
      category: 'Transkript',
      version: 'v1.0',
      size: '2.4 MB',
      uploadedBy: 'OBS Otomatik Entegrasyon Servisi',
      uploadDate: '12.05.2024',
      mimeType: 'application/pdf',
    },
    {
      id: 'f-4',
      name: 'Savunma_Sanayii_Kariyer_Gunu_Banner.jpg',
      category: 'Etkinlik Görselleri',
      version: 'v1.2',
      size: '3.8 MB',
      uploadedBy: 'Kariyer Merkezi Yönetimi',
      uploadDate: '14.05.2024',
      mimeType: 'image/jpeg',
    },
  ]);

  const filteredFiles = files.filter((f) => {
    const matchesQuery = f.name.toLowerCase().includes(query.toLowerCase()) || f.uploadedBy.toLowerCase().includes(query.toLowerCase());
    const matchesCat = activeCategory === 'ALL' || f.category === activeCategory;
    return matchesQuery && matchesCat;
  });

  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
        <div>
          <h2 className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-tight flex items-center gap-2">
            <Folder className="w-5 h-5 text-burgundy-700" />
            <span>Kurumsal Dosya Yönetimi & Güvenlik Kalkanı</span>
          </h2>
          <p className="text-xs text-slate-500">
            Sistemdeki özgeçmiş, transkript, logo ve görselleri versiyonları ve yükleyen bilgisiyle yönetin.
          </p>
        </div>

        <div className="w-full sm:w-64">
          <Input
            placeholder="Dosya adı veya yükleyen ara..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            leftIcon={<Search className="w-4 h-4 text-slate-400" />}
          />
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2 text-xs font-bold">
        <button
          onClick={() => setActiveCategory('ALL')}
          className={`px-3 py-1.5 rounded-xl transition-colors ${
            activeCategory === 'ALL' ? 'bg-burgundy-700 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
          }`}
        >
          Tüm Dosyalar ({files.length})
        </button>
        {['CV', 'Transkript', 'Sertifikalar', 'Firma Logoları', 'Etkinlik Görselleri'].map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3 py-1.5 rounded-xl transition-colors ${
              activeCategory === cat ? 'bg-burgundy-700 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
            }`}
          >
            {cat} ({files.filter((f) => f.category === cat).length})
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredFiles.map((file) => (
          <div
            key={file.id}
            className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2 text-xs"
          >
            <div className="flex items-center justify-between font-bold text-slate-900 dark:text-white">
              <span className="truncate">{file.name}</span>
              <Badge variant="outline" size="sm">{file.version}</Badge>
            </div>

            <div className="text-slate-500 space-y-0.5">
              <div>Kategori: <strong>{file.category}</strong></div>
              <div>Yükleyen: {file.uploadedBy}</div>
              <div>Boyut: {file.size} • Tarih: {file.uploadDate}</div>
            </div>

            <div className="pt-2 border-t border-slate-200 dark:border-slate-700 flex items-center justify-end gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => alert(`"${file.name}" indiriliyor.`)}
                leftIcon={<Download className="w-3.5 h-3.5" />}
              >
                İndir
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
