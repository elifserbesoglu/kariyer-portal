import React, { useState } from 'react';
import { useWorkflow, type WorkflowJob } from '../../context/WorkflowContext';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { Badge } from '../../components/ui/Badge';
import { Edit, Trash2, Users, Plus, Eye, CheckCircle2, Calendar, MapPin, Briefcase } from 'lucide-react';

export const EmployerJobList: React.FC<{ onNavigateToAts?: (jobId?: string) => void; onCreateNewJob?: () => void }> = ({
  onNavigateToAts,
  onCreateNewJob,
}) => {
  const { jobs, updateJobPosting, deleteJobPosting, applications } = useWorkflow();
  const [filterStatus, setFilterStatus] = useState<string>('ALL');

  // Edit Modal State
  const [selectedJob, setSelectedJob] = useState<WorkflowJob | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editLocation, setEditLocation] = useState('');
  const [editWorkType, setEditWorkType] = useState('');
  const [editDeadline, setEditDeadline] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [actionSuccessMsg, setActionSuccessMsg] = useState<string | null>(null);

  const handleOpenEdit = (job: WorkflowJob) => {
    setSelectedJob(job);
    setEditTitle(job.title);
    setEditLocation(job.location);
    setEditWorkType(job.workType);
    setEditDeadline(job.deadlineDate);
    setEditDescription(job.description);
  };

  const handleSaveEdit = () => {
    if (!selectedJob) return;
    updateJobPosting(selectedJob.id, {
      title: editTitle,
      location: editLocation,
      workType: editWorkType,
      deadlineDate: editDeadline,
      description: editDescription,
    });
    setActionSuccessMsg(`"${editTitle}" ilanı başarıyla güncellendi.`);
    setSelectedJob(null);
    setTimeout(() => setActionSuccessMsg(null), 4000);
  };

  const handleDelete = (jobId: string, title: string) => {
    if (window.confirm(`"${title}" ilanını silmek ve yayından kaldırmak istediğinize emin misiniz?`)) {
      deleteJobPosting(jobId);
      setActionSuccessMsg(`"${title}" ilanı yayından kaldırıldı ve silindi.`);
      setTimeout(() => setActionSuccessMsg(null), 4000);
    }
  };

  const filteredJobs = jobs.filter((j) => {
    if (filterStatus === 'ALL') return true;
    return j.moderationStatus === filterStatus;
  });

  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
        <div>
          <h2 className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-tight flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-burgundy-700" />
            <span>Yayınlanan İlanlar & İlan Yönetimi</span>
          </h2>
          <p className="text-xs text-slate-500 font-medium">
            Yayındaki iş ve staj ilanlarınızı görüntüleyin, içeriğini düzenleyin veya yayından kaldırın.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {onCreateNewJob && (
            <Button
              variant="primary"
              size="sm"
              onClick={onCreateNewJob}
              leftIcon={<Plus className="w-4 h-4" />}
            >
              Yeni İlan Yayınla
            </Button>
          )}
        </div>
      </div>

      {actionSuccessMsg && (
        <div className="p-3 bg-emerald-50 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200 rounded-xl text-xs font-bold border border-emerald-200 dark:border-emerald-800 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{actionSuccessMsg}</span>
        </div>
      )}

      {/* Filter Selector */}
      <div className="flex items-center gap-2 text-xs">
        <span className="font-bold text-slate-500">İlan Filtresi:</span>
        <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl font-bold">
          <button
            onClick={() => setFilterStatus('ALL')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              filterStatus === 'ALL' ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs' : 'text-slate-500'
            }`}
          >
            Tüm İlanlar ({jobs.length})
          </button>
          <button
            onClick={() => setFilterStatus('Published')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              filterStatus === 'Published' ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs' : 'text-slate-500'
            }`}
          >
            Yayındakiler ({jobs.filter((j) => j.moderationStatus === 'Published').length})
          </button>
          <button
            onClick={() => setFilterStatus('Draft')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              filterStatus === 'Draft' ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs' : 'text-slate-500'
            }`}
          >
            Taslaklar ({jobs.filter((j) => j.moderationStatus === 'Draft').length})
          </button>
        </div>
      </div>

      {/* Job Cards / Table */}
      <div className="space-y-4">
        {filteredJobs.map((job) => {
          const applicantCount = applications.filter((a) => a.jobId === job.id).length;

          return (
            <div
              key={job.id}
              className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-slate-300 dark:hover:border-slate-700 transition-colors"
            >
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Badge variant={job.moderationStatus === 'Published' ? 'success' : job.moderationStatus === 'Draft' ? 'secondary' : 'warning'}>
                    {job.moderationStatus === 'Published' ? 'Yayında' : job.moderationStatus === 'Draft' ? 'Taslak' : 'İnceleniyor'}
                  </Badge>
                  <span className="text-xs font-mono text-slate-400 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" /> Son Başvuru: {job.deadlineDate}
                  </span>
                </div>

                <h3 className="text-base font-extrabold text-slate-900 dark:text-white">{job.title}</h3>
                
                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 font-medium">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" /> {job.location}
                  </span>
                  <span>•</span>
                  <span>{job.workType}</span>
                  <span>•</span>
                  <span className="font-bold text-burgundy-700 dark:text-burgundy-400 flex items-center gap-1">
                    <Users className="w-3.5 h-3.5" /> {applicantCount} Başvuru
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-2">
                {onNavigateToAts && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onNavigateToAts(job.id)}
                    leftIcon={<Eye className="w-3.5 h-3.5 text-blue-600" />}
                  >
                    Adayları Gör ({applicantCount})
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
          );
        })}
      </div>

      {/* Edit Job Modal */}
      {selectedJob && (
        <Modal
          isOpen={true}
          onClose={() => setSelectedJob(null)}
          title={`İlan Düzenleme: ${selectedJob.title}`}
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
