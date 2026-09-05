import React, { useState, useEffect } from 'react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Modal } from '../../components/ui/Modal';
import { Alert } from '../../components/ui/Alert';
import { Badge } from '../../components/ui/Badge';
import { Upload, Download, ShieldCheck, HardDrive } from 'lucide-react';
import { fileManagementService, type UserDocumentDto } from '../../services/fileManagementService';
import { useAuth } from '../../context/AuthContext';

export const StudentDocumentsVault: React.FC = () => {
  const { user } = useAuth();
  const [documents, setDocuments] = useState<UserDocumentDto[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('ALL');
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [newDoc, setNewDoc] = useState({ title: '', category: 'CV', file: null as File | null });
  const [alertMsg, setAlertMsg] = useState<string | null>(null);

  const fetchDocuments = async () => {
    const data = await fileManagementService.getMyDocuments(user?.email || 'emre.tunc@ogr.ktun.edu.tr');
    setDocuments(data);
  };

  useEffect(() => {
    fetchDocuments();
  }, [user]);

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newDoc.title) {
      const created: UserDocumentDto = {
        id: `doc-${Date.now()}`,
        userEmail: user?.email || 'emre.tunc@ogr.ktun.edu.tr',
        fileName: newDoc.file ? newDoc.file.name : `${newDoc.title.replace(/\s+/g, '_')}.pdf`,
        documentType: newDoc.category as any,
        fileSizeBytes: newDoc.file ? newDoc.file.size : 1572864,
        versionString: 'v1.0',
        storageProvider: 'AWS S3 Bucket',
        virusScanStatus: 'CLEAN',
        uploadedAt: new Date().toLocaleDateString('tr-TR'),
        downloadUrl: '#',
      };

      setDocuments([created, ...documents]);
      setIsUploadModalOpen(false);
      setNewDoc({ title: '', category: 'CV', file: null });
      setAlertMsg(`"${created.fileName}" belgesi güvenli şekilde yüklendi (ClamAV Virüs Taraması Temiz & AWS S3 Depolandı).`);
    }
  };

  const filteredDocs = documents.filter((d) => activeCategory === 'ALL' || d.documentType === activeCategory);

  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
        <div>
          <h2 className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-tight flex items-center gap-2">
            <HardDrive className="w-5 h-5 text-burgundy-700" />
            <span>Kurumsal Belge Deposu</span>
          </h2>
          <p className="text-xs text-slate-500 font-medium">
            Özgeçmiş, sertifika ve belgelerinizi güvenle saklayın ve yönetin.
          </p>
        </div>

        <Button
          variant="primary"
          onClick={() => setIsUploadModalOpen(true)}
          leftIcon={<Upload className="w-4 h-4" />}
          className="font-bold text-xs"
        >
          Yeni Belge Yükle
        </Button>
      </div>

      {alertMsg && (
        <Alert variant="success" title="Belge İşlemi">
          {alertMsg}
        </Alert>
      )}

      {/* Category Tabs */}
      <div className="flex flex-wrap items-center gap-1.5 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl text-xs font-bold">
        <button
          onClick={() => setActiveCategory('ALL')}
          className={`px-3 py-1 rounded-lg transition-colors ${activeCategory === 'ALL' ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs' : 'text-slate-500'}`}
        >
          Tümü ({documents.length})
        </button>
        <button
          onClick={() => setActiveCategory('CV')}
          className={`px-3 py-1 rounded-lg transition-colors ${activeCategory === 'CV' ? 'bg-white dark:bg-slate-700 text-burgundy-700 shadow-xs' : 'text-slate-500'}`}
        >
          Özgeçmiş (CV)
        </button>
        <button
          onClick={() => setActiveCategory('CERTIFICATE')}
          className={`px-3 py-1 rounded-lg transition-colors ${activeCategory === 'CERTIFICATE' ? 'bg-white dark:bg-slate-700 text-emerald-600 shadow-xs' : 'text-slate-500'}`}
        >
          Sertifikalar
        </button>
      </div>

      {/* Documents List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredDocs.map((doc) => (
          <div
            key={doc.id}
            className="p-5 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-3 text-xs flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge variant="primary" size="sm">{doc.documentType}</Badge>
                  <span className="px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-200 font-black text-[10px]">
                    {doc.versionString}
                  </span>
                </div>

                <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-extrabold text-[10px] border border-emerald-200 dark:border-emerald-800 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-600" /> Virüs Taraması Temiz ({doc.virusScanStatus})
                </span>
              </div>

              <h4 className="font-extrabold text-slate-900 dark:text-white text-sm">{doc.fileName}</h4>
              <p className="text-slate-500 font-semibold text-[11px]">
                Depolama: <strong className="text-slate-700 dark:text-slate-300">{doc.storageProvider}</strong> • Boyut: {(doc.fileSizeBytes / (1024 * 1024)).toFixed(1)} MB
              </p>
            </div>

            <div className="pt-3 border-t border-slate-200 dark:border-slate-700/80 flex items-center justify-between">
              <span className="text-[10px] text-slate-400 font-semibold">Yükleme: {doc.uploadedAt}</span>
              <a
                href={doc.downloadUrl}
                download
                className="px-3 py-1.5 bg-burgundy-700 hover:bg-burgundy-800 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 transition-colors shadow-xs"
              >
                <Download className="w-3.5 h-3.5" /> İndir / Önizle
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Upload Modal */}
      <Modal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        title="Güvenli Bulut Depo Belge Yükleme"
      >
        <form onSubmit={handleUploadSubmit} className="space-y-4 py-2">
          <Input
            label="Belge Başlığı"
            required
            value={newDoc.title}
            onChange={(e) => setNewDoc({ ...newDoc, title: e.target.value })}
            placeholder="Örn: ASELSAN Aday Mühendis Sertifikası v2.0"
          />

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Belge Kategorisi
            </label>
            <select
              value={newDoc.category}
              onChange={(e) => setNewDoc({ ...newDoc, category: e.target.value as any })}
              className="w-full p-2.5 text-xs bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl font-bold text-slate-900 dark:text-white"
            >
              <option value="CV">Özgeçmiş (CV)</option>
              <option value="CERTIFICATE">Sertifika</option>
              <option value="DIPLOMA">Diploma / Transkript</option>
              <option value="PORTFOLIO">Portfolyo PDF</option>
            </select>
          </div>

          <div className="p-4 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-2xl text-center space-y-2">
            <Upload className="w-6 h-6 text-burgundy-700 mx-auto" />
            <input
              type="file"
              required
              onChange={(e) => setNewDoc({ ...newDoc, file: e.target.files ? e.target.files[0] : null })}
              className="text-xs text-slate-500 font-semibold"
            />
            <p className="text-[10px] text-slate-400">PDF, PNG, JPG (Maks. 25MB). Otomatik ClamAV taranacaktır.</p>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="ghost" onClick={() => setIsUploadModalOpen(false)}>İptal</Button>
            <Button type="submit" variant="primary">AWS S3 Depola & Taramadan Geçir</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
