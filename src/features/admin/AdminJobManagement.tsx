import React, { useState, useMemo } from 'react';
import { useWorkflow, type WorkflowJob } from '../../context/WorkflowContext';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { Badge } from '../../components/ui/Badge';
import { Input } from '../../components/ui/Input';
import { Briefcase, Search, Edit, Trash2, CheckCircle2, Building2, Calendar, MapPin, ShieldCheck } from 'lucide-react';

export const AdminJobManagement: React.FC = () => {
  const { jobs, updateJobPosting, deleteJobPosting, approveJobPosting } = useWorkflow();
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('ALL');

  // Edit Modal State
  const [selectedJob, setSelectedJob] = useState<WorkflowJob | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editCompanyName, setEditCompanyName] = useState('');
  const [editLocation, setEditLocation] = useState('');
  const [editWorkType, setEditWorkType] = useState('');
  const [editDeadline, setEditDeadline] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [actionMsg, setActionMsg] = useState<string | null>(null);

  // Sorted from Newest to Oldest
  const sortedAndFilteredJobs = useMemo(() => {
    let result = [...jobs];

    // Sort by id / createdDate (Newest first)
    result.sort((a, b) => {
      const idA = parseInt(a.id.replace(/\D/g, '')) || 0;
      const idB = parseInt(b.id.replace(/\D/g, '')) || 0;
      return idB - idA;
    });

    if (filterStatus !== 'ALL') {
      result = result.filter((j) => j.moderationStatus === filterStatus);
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (j) =>
          j.title.toLowerCase().includes(q) ||
          j.companyName.toLowerCase().includes(q) ||
          j.location.toLowerCase().includes(q)
      );
    }

    return result;
  }, [jobs, filterStatus, search]);

  const handleOpenEdit = (job: WorkflowJob) => {
    setSelectedJob(job);
    setEditTitle(job.title);
    setEditCompanyName(job.companyName);
    setEditLocation(job.location);
    setEditWorkType(job.workType);
    setEditDeadline(job.deadlineDate);
    setEditDescription(job.description);
  };

  const handleSaveEdit = () => {
    if (!selectedJob) return;
    updateJobPosting(selectedJob.id, {
      title: editTitle,
      companyName: editCompanyName,
      location: editLocation,
      workType: editWorkType,
      deadlineDate: editDeadline,
      description: editDescription,
    });
    setActionMsg(`"${editTitle}" ilanı yönetici yetkisiyle başarıyla güncellendi.`);
    setSelectedJob(null);
    setTimeout(() => setActionMsg(null), 4000);
  };

  const handleDelete = (jobId: string, title: string) => {
    if (window.confirm(`"${title}" ilanını sistemden ve yayından kaldırmak istediğinize emin misiniz?`)) {
      deleteJobPosting(jobId);
      setActionMsg(`"${title}" ilanı veritabanından ve yayından tamamen silindi.`);
      setTimeout(() => setActionMsg(null), 4000);
    }
  };

  const handleApprove = (jobId: string, title: string) => {
    approveJobPosting(jobId, 'kariyer@ktun.edu.tr');
    setActionMsg(`"${title}" ilanı incelendi ve yayına onaylandı.`);
    setTimeout(() => setActionMsg(null), 4000);
  };

  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
        <div>
          <h2 className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-tight flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-burgundy-700" />
            <span>Tüm Sistem İlanları & Moderasyon Yönetimi</span>
          </h2>
          <p className="text-xs text-slate-500 font-medium">
            Sistemdeki tüm iş ve staj ilanları (Yeniden Eskiye sıralı). İlanları inceleyin, düzenleyin veya yayından kaldırın.
          </p>
        </div>
      </div>

      {actionMsg && (
        <div className="p-3 bg-emerald-50 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200 rounded-xl text-xs font-bold border border-emerald-200 dark:border-emerald-800 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{actionMsg}</span>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="w-full sm:w-80">
          <Input
            type="text"
            placeholder="İlan başlığı, firma veya şehir ara..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            leftIcon={<Search className="w-4 h-4 text-slate-400" />}
          />
        </div>

        <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl font-bold w-full sm:w-auto overflow-x-auto">
          <button
            onClick={() => setFilterStatus('ALL')}
            className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
              filterStatus === 'ALL' ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs' : 'text-slate-500'
            }`}
          >
            Tüm İlanlar ({jobs.length})
          </button>
          <button
            onClick={() => setFilterStatus('Published')}
            className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
              filterStatus === 'Published' ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs' : 'text-slate-500'
            }`}
          >
            Yayındakiler ({jobs.filter((j) => j.moderationStatus === 'Published').length})
          </button>
          <button
            onClick={() => setFilterStatus('PendingModeration')}
            className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
              filterStatus === 'PendingModeration' ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs' : 'text-slate-500'
            }`}
          >
            Onay Bekleyenler ({jobs.filter((j) => j.moderationStatus === 'PendingModeration').length})
          </button>
        </div>
      </div>

      {/* Job Items List (Newest First) */}
      <div className="space-y-4">
        {sortedAndFilteredJobs.map((job) => (
          <div
            key={job.id}
            className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-slate-300 dark:hover:border-slate-700 transition-colors"
          >
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Badge variant={job.moderationStatus === 'Published' ? 'success' : job.moderationStatus === 'PendingModeration' ? 'warning' : 'secondary'}>
                  {job.moderationStatus === 'Published' ? 'Yayında' : job.moderationStatus === 'PendingModeration' ? 'Onay Bekliyor' : 'Taslak'}
                </Badge>
                <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" /> İlan Tarihi: {job.createdDate} (Son: {job.deadlineDate})
                </span>
              </div>

              <h3 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                <span>{job.title}</span>
              </h3>

              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 font-medium">
                <span className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1">
                  <Building2 className="w-3.5 h-3.5 text-burgundy-700" /> {job.companyName}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" /> {job.location}
                </span>
                <span>•</span>
                <span>{job.workType}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-2">
              {job.moderationStatus === 'PendingModeration' && (
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => handleApprove(job.id, job.title)}
                  leftIcon={<ShieldCheck className="w-3.5 h-3.5" />}
                >
                  Onayla
                </Button>
              )}

              <Button
                variant="outline"
                size="sm"
                onClick={() => handleOpenEdit(job)}
                leftIcon={<Edit className="w-3.5 h-3.5 text-amber-600" />}
              >
                Düzenle
              </Button>

              <Button
                variant="danger"
                size="sm"
                onClick={() => handleDelete(job.id, job.title)}
                leftIcon={<Trash2 className="w-3.5 h-3.5" />}
              >
                Sil
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Job Modal for Admin */}
      {selectedJob && (
        <Modal
          isOpen={true}
          onClose={() => setSelectedJob(null)}
          title={`Yönetici İlan Düzenleme: ${selectedJob.title}`}
        >
          <div className="space-y-4 text-xs">
            <div>
              <label className="font-bold block mb-1">İlan Başlığı</label>
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold"
              />
            </div>

            <div>
              <label className="font-bold block mb-1">Firma Adı</label>
              <input
                type="text"
                value={editCompanyName}
                onChange={(e) => setEditCompanyName(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="font-bold block mb-1">Konum / Şehir</label>
                <input
                  type="text"
                  value={editLocation}
                  onChange={(e) => setEditLocation(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 font-medium"
                />
              </div>

              <div>
                <label className="font-bold block mb-1">Son Başvuru Tarihi</label>
                <input
                  type="date"
                  value={editDeadline}
                  onChange={(e) => setEditDeadline(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 font-medium"
                />
              </div>
            </div>

            <div>
              <label className="font-bold block mb-1">Çalışma Şekli & Türü</label>
              <input
                type="text"
                value={editWorkType}
                onChange={(e) => setEditWorkType(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 font-medium"
              />
            </div>

            <div>
              <label className="font-bold block mb-1">İlan Açıklaması</label>
              <textarea
                rows={4}
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 font-medium leading-relaxed"
              />
            </div>

            <div className="pt-4 flex justify-end gap-2 border-t">
              <Button variant="outline" size="sm" onClick={() => setSelectedJob(null)}>İptal</Button>
              <Button variant="primary" size="sm" onClick={handleSaveEdit}>Değişiklikleri Kaydet</Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
