import React, { useState } from 'react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Badge } from '../../components/ui/Badge';
import { Alert } from '../../components/ui/Alert';
import { Modal } from '../../components/ui/Modal';
import { MOCK_JOBS, type JobItem } from '../../mockData/publicData';
import { useWorkflow } from '../../context/WorkflowContext';
import { useAuth } from '../../context/AuthContext';
import {
  Bookmark,
  Trash2,
  Send,
  Building2,
  MapPin,
  Clock,
  Briefcase,
  Search,
  CheckCircle2,
  Filter,
} from 'lucide-react';

export const StudentBookmarks: React.FC = () => {
  const { submitStudentApplication, applications } = useWorkflow();
  const { user } = useAuth();

  const [savedJobs, setSavedJobs] = useState<JobItem[]>(MOCK_JOBS.slice(0, 3));
  const [searchQuery, setSearchQuery] = useState('');
  const [jobTypeFilter, setJobTypeFilter] = useState<'ALL' | 'İş İlanı' | 'Staj İlanı'>('ALL');
  const [actionAlert, setActionAlert] = useState<{ type: 'success' | 'info'; text: string } | null>(null);

  const [selectedJobToApply, setSelectedJobToApply] = useState<JobItem | null>(null);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [customNote, setCustomNote] = useState('');
  const [isAppliedSuccess, setIsAppliedSuccess] = useState(false);

  const handleRemoveBookmark = (jobId: string, jobTitle: string) => {
    setSavedJobs((prev) => prev.filter((j) => j.id !== jobId));
    setActionAlert({
      type: 'info',
      text: `"${jobTitle}" favorilerinizden çıkarıldı.`,
    });
    setTimeout(() => setActionAlert(null), 3000);
  };

  const handleClearAllBookmarks = () => {
    setSavedJobs([]);
    setActionAlert({
      type: 'info',
      text: 'Favori ilan halkanız temizlendi.',
    });
    setTimeout(() => setActionAlert(null), 3000);
  };

  const handleOpenApplyModal = (job: JobItem) => {
    setSelectedJobToApply(job);
    setIsApplyModalOpen(true);
    setIsAppliedSuccess(false);
  };

  const handleConfirmApplication = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedJobToApply) return;

    submitStudentApplication(
      selectedJobToApply.id,
      user?.id || 'usr-student-1',
      user?.fullName || 'Emre Tunç',
      user?.email || 'emre.tunc@ogr.ktun.edu.tr',
      user?.department || 'Bilgisayar Mühendisliği',
      '3.42',
      'Emre_Tunc_ATS_CV_2026.pdf',
      user?.role || 'Student'
    );

    setIsAppliedSuccess(true);
    setTimeout(() => {
      setIsAppliedSuccess(false);
      setIsApplyModalOpen(false);
      setActionAlert({
        type: 'success',
        text: `"${selectedJobToApply.title}" pozisyonuna başvurunuz başarıyla iletildi.`,
      });
      setTimeout(() => setActionAlert(null), 4000);
    }, 1200);
  };

  const filteredJobs = savedJobs.filter((job) => {
    const matchesQuery =
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.sector.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = jobTypeFilter === 'ALL' || job.jobType === jobTypeFilter;
    return matchesQuery && matchesType;
  });

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-burgundy-700 text-white flex items-center justify-center font-extrabold shadow-md">
            <Bookmark className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-tight flex items-center gap-2">
              <span>Favori İlanlarım & Takip Listesi</span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-burgundy-100 text-burgundy-800 dark:bg-burgundy-950 dark:text-burgundy-300">
                {savedJobs.length} İlan Kayıtlı
              </span>
            </h2>
            <p className="text-xs text-slate-500 font-medium">
              Başvurmak üzere takip ettiğiniz onaylı KTÜN kurumsal iş ve staj ilanları.
            </p>
          </div>
        </div>

        {savedJobs.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClearAllBookmarks}
            leftIcon={<Trash2 className="w-4 h-4 text-red-600" />}
            className="text-xs text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 font-bold"
          >
            Tümünü Temizle
          </Button>
        )}
      </div>

      {actionAlert && (
        <Alert variant={actionAlert.type === 'success' ? 'success' : 'info'} title="Bilgilendirme">
          {actionAlert.text}
        </Alert>
      )}

      {/* Filter & Search Controls */}
      {savedJobs.length > 0 && (
        <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col sm:flex-row items-center gap-3">
          <div className="flex-1 w-full">
            <Input
              leftIcon={<Search className="w-4 h-4 text-slate-400" />}
              placeholder="Favori ilanlarda pozisyon veya firma ara..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Filter className="w-4 h-4 text-slate-400 shrink-0" />
            <select
              value={jobTypeFilter}
              onChange={(e) => setJobTypeFilter(e.target.value as any)}
              className="w-full sm:w-48 p-2.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl font-bold text-slate-900 dark:text-white"
            >
              <option value="ALL">Tüm İlan Türleri ({savedJobs.length})</option>
              <option value="İş İlanı">💼 İş İlanları ({savedJobs.filter((j) => j.jobType === 'İş İlanı').length})</option>
              <option value="Staj İlanı">🎓 Staj İlanları ({savedJobs.filter((j) => j.jobType === 'Staj İlanı').length})</option>
            </select>
          </div>
        </div>
      )}

      {/* Saved Jobs List Grid */}
      {filteredJobs.length > 0 ? (
        <div className="space-y-4">
          {filteredJobs.map((job) => (
            <div
              key={job.id}
              className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs hover:border-burgundy-300 transition-all flex flex-col md:flex-row md:items-center justify-between gap-6"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 p-1 border border-slate-200 dark:border-slate-700 shrink-0 overflow-hidden flex items-center justify-center">
                  <img src={job.companyLogo} alt={job.companyName} className="w-full h-full object-cover rounded-lg" />
                </div>

                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant={job.jobType === 'Staj İlanı' ? 'info' : 'primary'} size="sm">
                      {job.jobType}
                    </Badge>
                    <span className="text-xs font-bold text-slate-500 flex items-center gap-1">
                      <Building2 className="w-3.5 h-3.5 text-burgundy-700" /> {job.companyName}
                    </span>
                    <span className="text-xs text-slate-400">•</span>
                    <span className="text-xs font-semibold text-slate-500 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" /> {job.location}
                    </span>
                  </div>

                  <h3 className="text-base font-extrabold text-slate-900 dark:text-white hover:text-burgundy-700 transition-colors">
                    {job.title}
                  </h3>

                  <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed font-medium">
                    {job.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-3 text-[11px] font-semibold text-slate-500 pt-1">
                    <span className="flex items-center gap-1">
                      <Briefcase className="w-3.5 h-3.5 text-slate-400" /> {job.workType}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1 text-amber-600 dark:text-amber-400 font-bold">
                      <Clock className="w-3.5 h-3.5" /> Son Başvuru: {job.deadline}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-row md:flex-col sm:items-end justify-between md:justify-center gap-2 pt-3 md:pt-0 border-t md:border-t-0 border-slate-100 dark:border-slate-800 shrink-0">
                {(() => {
                  const currentUserEmail = user?.email || 'emre.tunc@ogr.ktun.edu.tr';
                  const currentStudentId = user?.studentNumber || '20120033001';
                  const hasApplied = (applications || []).some(
                    (app) =>
                      app.jobId === job.id &&
                      (app.studentEmail === currentUserEmail ||
                       app.studentId === currentStudentId ||
                       (user?.fullName && app.studentName === user.fullName))
                  );

                  if (hasApplied) {
                    return (
                      <Button
                        disabled
                        variant="secondary"
                        size="sm"
                        leftIcon={<CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />}
                        className="font-extrabold text-xs bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 cursor-not-allowed opacity-100 shadow-xs"
                      >
                        Başvurdun
                      </Button>
                    );
                  }

                  return (
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => handleOpenApplyModal(job)}
                      leftIcon={<Send className="w-3.5 h-3.5" />}
                      className="font-bold text-xs"
                    >
                      Hemen Başvur
                    </Button>
                  );
                })()}

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleRemoveBookmark(job.id, job.title)}
                  leftIcon={<Trash2 className="w-3.5 h-3.5 text-red-600" />}
                  className="text-xs text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 border-red-200"
                >
                  Favorilerden Çıkar
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="bg-white dark:bg-slate-900 p-12 rounded-2xl border border-slate-200 dark:border-slate-800 text-center space-y-4 max-w-xl mx-auto shadow-xs">
          <div className="w-16 h-16 rounded-full bg-burgundy-50 dark:bg-burgundy-950 text-burgundy-700 dark:text-burgundy-400 flex items-center justify-center mx-auto">
            <Bookmark className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
              Favori İlan Listeniz Boş
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed font-medium">
              Henüz takibe aldığınız bir iş veya staj ilanı bulunmuyor. İlanlar sayfasındaki favori butonunu kullanarak ilgilendiğiniz pozisyonları buraya kaydedebilirsiniz.
            </p>
          </div>
        </div>
      )}

      {/* Quick Application Modal */}
      {selectedJobToApply && (
        <Modal
          isOpen={isApplyModalOpen}
          onClose={() => setIsApplyModalOpen(false)}
          title={`İş Başvurusu: ${selectedJobToApply.title}`}
        >
          <form onSubmit={handleConfirmApplication} className="space-y-4 text-xs">
            {isAppliedSuccess ? (
              <div className="p-6 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto animate-bounce" />
                <h4 className="text-base font-extrabold text-slate-900 dark:text-white">
                  Başvurunuz İletildi!
                </h4>
                <p className="text-slate-500 font-medium">
                  {selectedJobToApply.companyName} İK departmanı başvurunuzu ATS panosuna aldı.
                </p>
              </div>
            ) : (
              <>
                <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1">
                  <span className="font-extrabold text-slate-900 dark:text-white block">
                    {selectedJobToApply.companyName} — {selectedJobToApply.title}
                  </span>
                  <span className="text-slate-500 block">
                    Gönderilecek CV: <strong>Emre_Tunc_ATS_CV_2026.pdf</strong> (GNO: 3.42)
                  </span>
                </div>

                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Ön Yazı / İK Notu (Opsiyonel):
                  </label>
                  <textarea
                    rows={3}
                    value={customNote}
                    onChange={(e) => setCustomNote(e.target.value)}
                    placeholder="İşverene iletmek istediğiniz kısa motivasyon notu..."
                    className="w-full p-2.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl text-xs font-medium"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                  <Button variant="outline" size="sm" onClick={() => setIsApplyModalOpen(false)}>
                    Vazgeç
                  </Button>
                  <Button variant="primary" size="sm" type="submit" leftIcon={<Send className="w-3.5 h-3.5" />}>
                    Başvuruyu Onayla ve Gönder
                  </Button>
                </div>
              </>
            )}
          </form>
        </Modal>
      )}
    </div>
  );
};
