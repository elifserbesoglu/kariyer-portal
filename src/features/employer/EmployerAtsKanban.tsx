import React, { useState, useEffect, useMemo } from 'react';
import {
  Search,
  Filter,
  Building2,
  AlertCircle,
  Users,
  Sparkles,
  User,
  History,
  Calendar,
  Star,
  CheckSquare,
  Square,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  CheckCircle2,
  XCircle,
} from 'lucide-react';
import { Drawer } from '../../components/ui/Drawer';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { Alert } from '../../components/ui/Alert';
import { useWorkflow } from '../../context/WorkflowContext';
import type { WorkflowApplication } from '../../context/WorkflowContext';
import { useAuth } from '../../context/AuthContext';

export interface AuditHistoryEntry {
  id: string;
  date: string;
  user: string;
  fromStage: string;
  toStage: string;
  reason: string;
}

// Generator for 100 realistic KTÜN candidates for scale testing
const generate100MockCandidates = (): WorkflowApplication[] => {
  const firstNames = [
    'Kerem', 'Gamze', 'Umut', 'Tuğba', 'Emre', 'Ayşe', 'Mehmet', 'Zeynep', 'Caner', 'Fatma',
    'Burak', 'Elif', 'Mustafa', 'Merve', 'Ahmet', 'Selin', 'Oğuz', 'Büşra', 'Ali', 'Gözde',
    'Hakan', 'Ebru', 'Kaan', 'Derya', 'Cem', 'Sibel', 'Taha', 'Aslı', 'Barış', 'Melisa'
  ];
  const lastNames = [
    'Doğan', 'Kılıç', 'Aslan', 'Çetin', 'Tunç', 'Yılmaz', 'Kaya', 'Demir', 'Şahin', 'Çelik',
    'Öztürk', 'Arslan', 'Aslan', 'Kara', 'Koç', 'Kurt', 'Özcan', 'Şimşek', 'Yıldırım', 'Aydın',
    'Özdemir', 'Erdoğan', 'Yıldız', 'Acar', 'Yalçın'
  ];

  const positions = [
    { title: 'Mekatronik Sistemler Tasarım Mühendisi', dept: 'Makine Mühendisliği' },
    { title: 'Veri Analitiği ve Yapay Zeka Stajyeri', dept: 'Bilgisayar Mühendisliği' },
    { title: 'Kalite ve Üretim Planlama Mühendisi', dept: 'Endüstri Mühendisliği' },
    { title: 'Güç Elektroniği & Tasarım Mühendisi', dept: 'Elektrik-Elektronik Mühendisliği' },
    { title: 'Yazılım Geliştirme Mühendisi (Gömülü C++)', dept: 'Bilgisayar Mühendisliği' },
    { title: 'Otonom Sistemler Araştırma Stajyeri', dept: 'Bilgisayar Mühendisliği' },
    { title: 'Gömülü Sistemler Donanım Mühendisi', dept: 'Elektrik-Elektronik Mühendisliği' },
  ];

  const stages: WorkflowApplication['stage'][] = ['interview', 'interview', 'interview', 'hired', 'interview_rejected', 'interview'];
  const dates = ['15.05.2024', '16.05.2024', '17.05.2024', '18.05.2024', '20.05.2024', '22.05.2024', '25.05.2024', '28.05.2024', '01.06.2024', '05.06.2024'];
  const gpas = ['3.88', '3.75', '3.67', '3.52', '3.42', '3.31', '3.24', '3.15', '3.08', '2.95', '2.84'];
  const matches = ['%96', '%94', '%91', '%88', '%85', '%82', '%79', '%76', '%74', '%71'];

  const candidates: WorkflowApplication[] = [
    {
      id: 'app-1',
      jobId: 'job-1',
      jobTitle: 'Mekatronik Sistemler Tasarım Mühendisi',
      companyName: 'ASELSAN Konya Silah Sistemleri A.Ş.',
      studentId: '20120033001',
      studentName: 'Kerem Doğan',
      studentEmail: 'kerem.dogan@ogr.ktun.edu.tr',
      studentPhone: '+90 555 123 45 67',
      department: 'Makine Mühendisliği',
      gpa: '3.42',
      appliedDate: '15.05.2024',
      stage: 'interview',
      cvTitle: 'Kerem_Dogan_CV.pdf',
      matchScore: '%85',
    },
    {
      id: 'app-2',
      jobId: 'job-1',
      jobTitle: 'Veri Analitiği ve Yapay Zeka Stajyeri',
      companyName: 'ASELSAN Konya Silah Sistemleri A.Ş.',
      studentId: '20120033002',
      studentName: 'Gamze Kılıç',
      studentEmail: 'gamze.kilic@ogr.ktun.edu.tr',
      studentPhone: '+90 555 234 56 78',
      department: 'Bilgisayar Mühendisliği',
      gpa: '3.67',
      appliedDate: '16.05.2024',
      stage: 'interview',
      cvTitle: 'Gamze_Kilic_CV.pdf',
      matchScore: '%91',
    },
    {
      id: 'app-3',
      jobId: 'job-1',
      jobTitle: 'Kalite ve Üretim Planlama Mühendisi',
      companyName: 'ASELSAN Konya Silah Sistemleri A.Ş.',
      studentId: '20120033003',
      studentName: 'Umut Aslan',
      studentEmail: 'umut.aslan@ogr.ktun.edu.tr',
      studentPhone: '+90 555 345 67 89',
      department: 'Endüstri Mühendisliği',
      gpa: '3.28',
      appliedDate: '17.05.2024',
      stage: 'hired',
      cvTitle: 'Umut_Aslan_CV.pdf',
      matchScore: '%78',
    },
    {
      id: 'app-4',
      jobId: 'job-1',
      jobTitle: 'Güç Elektroniği & Tasarım Mühendisi',
      companyName: 'ASELSAN Konya Silah Sistemleri A.Ş.',
      studentId: '20120033004',
      studentName: 'Tuğba Çetin',
      studentEmail: 'tugba.cetin@ogr.ktun.edu.tr',
      studentPhone: '+90 555 456 78 90',
      department: 'Elektrik-Elektronik Mühendisliği',
      gpa: '3.81',
      appliedDate: '18.05.2024',
      stage: 'interview_rejected',
      cvTitle: 'Tugba_Cetin_CV.pdf',
      matchScore: '%94',
    },
    {
      id: 'app-5',
      jobId: 'job-1',
      jobTitle: 'Yazılım Geliştirme Mühendisi',
      companyName: 'ASELSAN Konya Silah Sistemleri A.Ş.',
      studentId: '20120033005',
      studentName: 'Emre Tunç',
      studentEmail: 'emre.tunc@ogr.ktun.edu.tr',
      studentPhone: '+90 555 567 89 01',
      department: 'Bilgisayar Mühendisliği',
      gpa: '3.42',
      appliedDate: '15.05.2024',
      stage: 'interview',
      cvTitle: 'Emre_Tunc_CV.pdf',
      matchScore: '%88',
    },
  ];

  for (let i = 6; i <= 100; i++) {
    const fname = firstNames[(i - 1) % firstNames.length];
    const lname = lastNames[(i - 1) % lastNames.length];
    const pos = positions[(i - 1) % positions.length];
    const stg = stages[(i - 1) % stages.length];
    const dt = dates[(i - 1) % dates.length];
    const gpaVal = gpas[(i - 1) % gpas.length];
    const matchVal = matches[(i - 1) % matches.length];

    candidates.push({
      id: `app-${i}`,
      jobId: `job-${(i % 3) + 1}`,
      jobTitle: pos.title,
      companyName: 'ASELSAN Konya Silah Sistemleri A.Ş.',
      studentId: `20120033${100 + i}`,
      studentName: `${fname} ${lname}`,
      studentEmail: `${fname.toLowerCase()}.${lname.toLowerCase()}@ogr.ktun.edu.tr`,
      studentPhone: `+90 555 ${100 + i} 00 00`,
      department: pos.dept,
      gpa: gpaVal,
      appliedDate: dt,
      stage: stg,
      cvTitle: `${fname}_${lname}_CV.pdf`,
      matchScore: matchVal,
    });
  }

  return candidates;
};

export const EmployerAtsKanban: React.FC = () => {
  const { applications, moveAtsCandidateStage } = useWorkflow();
  const { user } = useAuth();

  // Merge context applications with 100 mock candidate dataset if context applications count is small
  const [candidatesList, setCandidatesList] = useState<WorkflowApplication[]>(() => {
    const base100 = generate100MockCandidates();
    if (applications.length > 4) {
      const existingIds = new Set(applications.map((a) => a.id));
      const filteredBase = base100.filter((b) => !existingIds.has(b.id));
      return [...applications, ...filteredBase];
    }
    return base100;
  });

  // Synchronize state when workflow applications update
  useEffect(() => {
    if (applications.length > 0) {
      setCandidatesList((prev) => {
        const prevMap = new Map(prev.map((c) => [c.id, c]));
        applications.forEach((app) => {
          prevMap.set(app.id, app);
        });
        return Array.from(prevMap.values());
      });
    }
  }, [applications]);

  // Filtering & Search State
  const [searchQuery, setSearchQuery] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [stageFilter, setStageFilter] = useState('all');

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);

  // Multi-select & Drawer State
  const [selectedCandidate, setSelectedCandidate] = useState<WorkflowApplication | null>(null);
  const [activeDrawerTab, setActiveDrawerTab] = useState<'profile' | 'timeline'>('profile');
  const [selectedAppIds, setSelectedAppIds] = useState<string[]>([]);

  // Feedback Notifications
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const [bulkActionMsg, setBulkActionMsg] = useState<string | null>(null);

  // Ratings & HR Notes for Drawer
  const [candidateRating, setCandidateRating] = useState(5);
  const [hrNote, setHrNote] = useState('C++20 ve ROS2 konularında teknik bilgisi yüksek. Mülakat aşamasına geçilmesi önerilir.');

  // Confirmation Modal State (Mülakatı Reddet / İşe Alındı)
  const [confirmModal, setConfirmModal] = useState<{
    isOpen: boolean;
    type: 'reject' | 'hire' | null;
    candidate: WorkflowApplication | null;
  }>({ isOpen: false, type: null, candidate: null });

  // Candidate Audit Timeline Logs
  const [auditLogs, setAuditLogs] = useState<Record<string, AuditHistoryEntry[]>>({
    'app-1': [
      { id: '1', date: '05.08.2026 10:15', user: 'kerem.dogan@ogr.ktun.edu.tr', fromStage: 'Yok', toStage: 'Başvuruldu', reason: 'Öğrenci ilan başvurusunu tamamladı.' },
      { id: '2', date: '05.08.2026 11:30', user: 'ik@aselsankonya.com.tr', fromStage: 'Başvuruldu', toStage: 'Mülakat', reason: 'Teknik mülakat tarihi planlandı.' },
    ],
  });

  const stageTitles: Record<string, string> = {
    applied: 'Başvuruldu',
    screening: 'CV İnceleme',
    test: 'Online Test',
    interview: 'Mülakat',
    offer: 'Teklif',
    hired: 'İşe Alındı',
    interview_rejected: 'Aday Reddedildi',
  };

  // Filtered candidates computed
  const filteredCandidates = useMemo(() => {
    return candidatesList.filter((a) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        a.studentName.toLowerCase().includes(q) ||
        a.department.toLowerCase().includes(q) ||
        a.jobTitle.toLowerCase().includes(q) ||
        a.studentEmail.toLowerCase().includes(q);

      const matchesDept = departmentFilter === 'all' || a.department.includes(departmentFilter);
      const matchesStage = stageFilter === 'all' || a.stage === stageFilter;

      return matchesSearch && matchesDept && matchesStage;
    });
  }, [candidatesList, searchQuery, departmentFilter, stageFilter]);

  // Reset to page 1 when filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, departmentFilter, stageFilter]);

  // Pagination calculations
  const totalCount = filteredCandidates.length;
  const totalPages = Math.ceil(totalCount / pageSize) || 1;
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedCandidates = useMemo(() => {
    return filteredCandidates.slice(startIndex, endIndex);
  }, [filteredCandidates, startIndex, endIndex]);

  // Metrics: Strictly candidates currently in 'interview' (Mülakat) stage
  const interviewCount = useMemo(() => {
    return candidatesList.filter((c) => c.stage === 'interview').length;
  }, [candidatesList]);

  // Execute stage change action with modal confirmation
  const handleConfirmAction = () => {
    if (!confirmModal.candidate || !confirmModal.type) return;

    const candidate = confirmModal.candidate;
    const newStage: WorkflowApplication['stage'] = confirmModal.type === 'reject' ? 'interview_rejected' : 'hired';

    // 1. Context Update
    moveAtsCandidateStage(
      candidate.id,
      newStage,
      user?.email || 'ik@aselsankonya.com.tr',
      confirmModal.type === 'reject' ? 'Aday reddedildi.' : 'Aday işe alındı.'
    );

    // 2. Local State Update
    setCandidatesList((prev) =>
      prev.map((c) => (c.id === candidate.id ? { ...c, stage: newStage } : c))
    );

    // 3. Add Audit Entry
    const newAuditLog: AuditHistoryEntry = {
      id: `log-${Date.now()}`,
      date: new Date().toLocaleString('tr-TR'),
      user: user?.email || 'ik@aselsankonya.com.tr',
      fromStage: stageTitles[candidate.stage] || candidate.stage,
      toStage: stageTitles[newStage] || newStage,
      reason: confirmModal.type === 'reject' ? 'Aday değerlendirme sonucu reddedildi.' : 'Mülakat başarılı. Aday işe alındı.',
    };

    setAuditLogs((prev) => ({
      ...prev,
      [candidate.id]: [newAuditLog, ...(prev[candidate.id] || [])],
    }));

    // Toast notification
    const actionLabel = confirmModal.type === 'reject' ? 'reddedildi' : 'işe alındı olarak işaretlendi';
    setToastMsg(`${candidate.studentName} adlı adayın durumu "${actionLabel}".`);
    setConfirmModal({ isOpen: false, type: null, candidate: null });

    setTimeout(() => setToastMsg(null), 3500);
  };

  const toggleSelectCandidate = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedAppIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const toggleSelectAllPage = () => {
    const pageIds = paginatedCandidates.map((c) => c.id);
    const allSelected = pageIds.every((id) => selectedAppIds.includes(id));
    if (allSelected) {
      setSelectedAppIds((prev) => prev.filter((id) => !pageIds.includes(id)));
    } else {
      setSelectedAppIds((prev) => Array.from(new Set([...prev, ...pageIds])));
    }
  };

  const handleBulkAction = (actionName: string) => {
    if (selectedAppIds.length === 0) return;
    setBulkActionMsg(`${selectedAppIds.length} aday için "${actionName}" eylemi başarıyla uygulandı.`);
    setTimeout(() => {
      setBulkActionMsg(null);
      setSelectedAppIds([]);
    }, 2500);
  };

  // Render inline row action controls inside İŞLEM column
  const renderRowActions = (app: WorkflowApplication) => {
    if (app.stage === 'interview') {
      return (
        <div className="flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setConfirmModal({ isOpen: true, type: 'reject', candidate: app });
            }}
            className="px-2.5 py-1 text-xs font-bold rounded-lg border border-rose-200 dark:border-rose-800 bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 hover:bg-rose-100 dark:hover:bg-rose-900 transition-colors shadow-2xs"
          >
            Adayı Reddet
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setConfirmModal({ isOpen: true, type: 'hire', candidate: app });
            }}
            className="px-2.5 py-1 text-xs font-bold rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white shadow-2xs transition-colors"
          >
            İşe Alındı
          </button>
        </div>
      );
    }

    if (app.stage === 'hired') {
      return (
        <span className="text-xs font-extrabold text-emerald-600 dark:text-emerald-400 flex items-center justify-end gap-1">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          İşe Alındı
        </span>
      );
    }

    if (app.stage === 'interview_rejected') {
      return (
        <span className="text-xs font-extrabold text-rose-600 dark:text-rose-400 flex items-center justify-end gap-1">
          <XCircle className="w-4 h-4 text-rose-600" />
          Aday Reddedildi
        </span>
      );
    }

    return (
      <div className="flex items-center justify-end gap-2">
        <span className="text-[11px] font-bold text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">
          {stageTitles[app.stage] || 'Başvuruldu'}
        </span>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setSelectedCandidate(app);
          }}
          className="text-xs font-bold text-slate-400 hover:text-burgundy-700 dark:hover:text-white flex items-center gap-0.5 transition-colors"
        >
          <span>Detay</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Top Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs">
        <div>
          <h2 className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-tight flex items-center gap-2">
            <Building2 className="w-5 h-5 text-burgundy-700" />
            <span>KURUMSAL ADAY TAKİP SİSTEMİ YÖNETİM PLATFORMU</span>
          </h2>
          <p className="text-xs text-slate-500 font-medium">
            Kurumsal standartlarda aday aşama yönetimi ve denetim zaman çizelgesi.
          </p>
        </div>

        {/* Dynamic Header Metrics Summary */}
        <div className="flex items-center gap-3 text-xs font-bold text-slate-700 dark:text-slate-300">
          <span className="px-3.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 text-slate-500" />
            Toplam Aday: <strong className="text-slate-900 dark:text-white">{candidatesList.length}</strong>
          </span>
          <span className="px-3.5 py-1.5 rounded-xl bg-amber-50 dark:bg-amber-950 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800 flex items-center gap-1.5">
            Mülakatta: <strong>{interviewCount}</strong>
          </span>
        </div>
      </div>

      {toastMsg && (
        <Alert variant="success" title="İşlem Başarılı">
          {toastMsg}
        </Alert>
      )}

      {bulkActionMsg && (
        <Alert variant="success" title="Toplu İşlem Başarılı">
          {bulkActionMsg}
        </Alert>
      )}

      {/* Bulk Actions Floating Bar */}
      {selectedAppIds.length > 0 && (
        <div className="p-4 rounded-2xl bg-burgundy-700 text-white shadow-lg flex flex-wrap items-center justify-between gap-4 animate-in fade-in duration-200">
          <div className="flex items-center gap-2 text-xs font-bold">
            <CheckSquare className="w-4 h-4" />
            <span>{selectedAppIds.length} Aday Seçildi</span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Button size="sm" variant="secondary" onClick={() => handleBulkAction('Mülakata Davet Et')} className="bg-white text-slate-900 hover:bg-slate-100 font-bold">
              Mülakata Davet Et
            </Button>
            <Button size="sm" variant="secondary" onClick={() => handleBulkAction('Reddet')} className="bg-white text-slate-900 hover:bg-slate-100 font-bold">
              Reddet
            </Button>
            <Button size="sm" variant="secondary" onClick={() => handleBulkAction('Mail Gönder')} className="bg-white text-slate-900 hover:bg-slate-100 font-bold">
              Toplu Mail Gönder
            </Button>
            <Button size="sm" variant="ghost" onClick={() => setSelectedAppIds([])} className="text-white hover:bg-white/10 font-bold">
              Seçimi Temizle
            </Button>
          </div>
        </div>
      )}

      {/* Search & Cumulative Filters Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
        {/* Search input */}
        <div className="sm:col-span-5">
          <Input
            leftIcon={<Search className="w-4 h-4 text-slate-400" />}
            placeholder="Aday adı, bölüm veya ilan ara..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Department Filter Select */}
        <div className="sm:col-span-3">
          <select
            value={departmentFilter}
            onChange={(e) => setDepartmentFilter(e.target.value)}
            className="w-full p-2.5 text-xs bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl font-bold text-slate-900 dark:text-white"
          >
            <option value="all">Tüm Mühendislik Bölümleri</option>
            <option value="Bilgisayar">Bilgisayar Mühendisliği</option>
            <option value="Elektrik">Elektrik-Elektronik Mühendisliği</option>
            <option value="Makine">Makine Mühendisliği</option>
            <option value="Endüstri">Endüstri Mühendisliği</option>
          </select>
        </div>

        {/* Simplified Status Filter Select */}
        <div className="sm:col-span-3">
          <select
            value={stageFilter}
            onChange={(e) => setStageFilter(e.target.value)}
            className="w-full p-2.5 text-xs bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl font-bold text-slate-900 dark:text-white"
          >
            <option value="all">Tüm Durumlar</option>
            <option value="interview">Mülakat</option>
            <option value="interview_rejected">Aday Reddedildi</option>
            <option value="hired">İşe Alındı</option>
          </select>
        </div>

        {/* Active Filter Indicator */}
        <div className="sm:col-span-1 flex items-center justify-end text-xs font-bold text-slate-500" title="Akıllı Aday Filtresi">
          <Filter className="w-4 h-4 text-burgundy-700" />
        </div>
      </div>

      {/* Simplified Candidates Table View (4 Main Columns) */}
      {filteredCandidates.length === 0 ? (
        <div className="p-12 text-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4 max-w-md mx-auto">
          <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 flex items-center justify-center mx-auto">
            <AlertCircle className="w-8 h-8" />
          </div>
          <h3 className="text-base font-extrabold text-slate-900 dark:text-white">Aday Bulunamadı</h3>
          <p className="text-xs text-slate-500 font-medium leading-relaxed">
            Arama kriterlerinize uygun aday kaydı eşleşmedi. Filtreleri temizleyerek tekrar deneyin.
          </p>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => {
              setSearchQuery('');
              setDepartmentFilter('all');
              setStageFilter('all');
            }}
          >
            Filtreleri Temizle
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xs bg-white dark:bg-slate-900">
            <table className="w-full text-left border-collapse min-w-[750px]">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-800 text-[11px] font-black uppercase text-slate-500 dark:text-slate-400 tracking-wider">
                  <th className="py-3 px-4 w-10 text-center">
                    <button
                      type="button"
                      onClick={toggleSelectAllPage}
                      className="text-slate-400 hover:text-burgundy-700 transition-colors"
                      title="Tüm Sayfayı Seç"
                    >
                      {paginatedCandidates.length > 0 && paginatedCandidates.every((c) => selectedAppIds.includes(c.id)) ? (
                        <CheckSquare className="w-4 h-4 text-burgundy-700" />
                      ) : (
                        <Square className="w-4 h-4 text-slate-300" />
                      )}
                    </button>
                  </th>
                  <th className="py-3 px-4">ADAY</th>
                  <th className="py-3 px-4">POZİSYON / BÖLÜM</th>
                  <th className="py-3 px-4">BAŞVURU TARİHİ</th>
                  <th className="py-3 px-4 text-right">İŞLEM</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-xs">
                {paginatedCandidates.map((app) => {
                  const isSelected = selectedAppIds.includes(app.id);

                  return (
                    <tr
                      key={app.id}
                      onClick={() => setSelectedCandidate(app)}
                      className={`hover:bg-slate-50/80 dark:hover:bg-slate-800/40 cursor-pointer transition-colors ${
                        isSelected ? 'bg-burgundy-50/30 dark:bg-burgundy-950/20' : ''
                      }`}
                    >
                      {/* Checkbox Cell */}
                      <td className="py-3 px-4 text-center" onClick={(e) => toggleSelectCandidate(app.id, e)}>
                        <button type="button" className="text-slate-400 hover:text-burgundy-700 transition-colors">
                          {isSelected ? (
                            <CheckSquare className="w-4 h-4 text-burgundy-700" />
                          ) : (
                            <Square className="w-4 h-4 text-slate-300" />
                          )}
                        </button>
                      </td>

                      {/* 1. ADAY */}
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-burgundy-700/10 text-burgundy-700 font-extrabold flex items-center justify-center text-xs border border-burgundy-200 dark:border-burgundy-900 shrink-0">
                            {app.studentName.substring(0, 2).toUpperCase()}
                          </div>
                          <div>
                            <span className="font-extrabold text-slate-900 dark:text-white block text-xs">
                              {app.studentName}
                            </span>
                            <span className="text-[11px] text-slate-400 block font-normal">
                              {app.studentEmail}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* 2. POZİSYON / BÖLÜM */}
                      <td className="py-3 px-4">
                        <span className="font-bold text-burgundy-700 dark:text-burgundy-400 block truncate max-w-[280px]">
                          {app.jobTitle}
                        </span>
                        <span className="text-[11px] text-slate-500 font-medium block truncate max-w-[280px]">
                          {app.department}
                        </span>
                      </td>

                      {/* 3. BAŞVURU TARİHİ */}
                      <td className="py-3 px-4 text-slate-500 font-medium text-xs">
                        {app.appliedDate}
                      </td>

                      {/* 4. İŞLEM (Direct status actions) */}
                      <td className="py-3 px-4 text-right">
                        {renderRowActions(app)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xs">
            <div className="text-xs text-slate-500 font-medium">
              <strong>{totalCount > 0 ? startIndex + 1 : 0} - {Math.min(endIndex, totalCount)}</strong> / <strong>{totalCount}</strong> aday gösteriliyor
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
                <span>Sayfa Başına:</span>
                <select
                  value={pageSize}
                  onChange={(e) => {
                    setPageSize(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                  className="p-1 text-xs bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg font-bold text-slate-900 dark:text-white"
                >
                  <option value={20}>20</option>
                  <option value={50}>50</option>
                  <option value={100}>100</option>
                </select>
              </div>

              <div className="flex items-center gap-1">
                <Button
                  variant="secondary"
                  size="sm"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  leftIcon={<ChevronLeft className="w-3.5 h-3.5" />}
                >
                  Önceki
                </Button>

                {Array.from({ length: totalPages }, (_, i) => i + 1)
                  .filter((p) => p === 1 || p === totalPages || Math.abs(p - currentPage) <= 1)
                  .map((p, idx, arr) => (
                    <React.Fragment key={p}>
                      {idx > 0 && arr[idx - 1] !== p - 1 && <span className="px-1 text-slate-400 text-xs">...</span>}
                      <button
                        onClick={() => setCurrentPage(p)}
                        className={`w-7 h-7 rounded-lg text-xs font-bold transition-colors ${
                          currentPage === p
                            ? 'bg-burgundy-700 text-white shadow-2xs'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                        }`}
                      >
                        {p}
                      </button>
                    </React.Fragment>
                  ))}

                <Button
                  variant="secondary"
                  size="sm"
                  disabled={currentPage >= totalPages}
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  rightIcon={<ChevronRight className="w-3.5 h-3.5" />}
                >
                  Sonraki
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal for Mülakatı Reddet & İşe Alındı */}
      <Modal
        isOpen={confirmModal.isOpen}
        onClose={() => setConfirmModal({ isOpen: false, type: null, candidate: null })}
        title={confirmModal.type === 'reject' ? 'Adayı Reddet' : 'Adayı İşe Al'}
        size="md"
      >
        {confirmModal.candidate && (
          <div className="space-y-4 py-2">
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-1.5">
              <span className="font-extrabold text-slate-900 dark:text-white text-base block">
                {confirmModal.candidate.studentName}
              </span>
              <span className="text-xs text-burgundy-700 dark:text-burgundy-400 font-bold block">
                {confirmModal.candidate.jobTitle} • {confirmModal.candidate.department}
              </span>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
              {confirmModal.type === 'reject' ? (
                <>
                  <strong>{confirmModal.candidate.studentName}</strong> adlı adayı reddetmek istediğinize emin misiniz?
                </>
              ) : (
                <>
                  <strong>{confirmModal.candidate.studentName}</strong> adlı adayı işe almak istediğinize emin misiniz?
                </>
              )}
            </p>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
              <Button
                variant="secondary"
                onClick={() => setConfirmModal({ isOpen: false, type: null, candidate: null })}
              >
                Vazgeç
              </Button>

              {confirmModal.type === 'reject' ? (
                <Button
                  variant="danger"
                  onClick={handleConfirmAction}
                  className="bg-rose-600 hover:bg-rose-700 text-white font-bold"
                >
                  Adayı Reddet
                </Button>
              ) : (
                <Button
                  variant="primary"
                  onClick={handleConfirmAction}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold"
                >
                  İşe Al
                </Button>
              )}
            </div>
          </div>
        )}
      </Modal>

      {/* Candidate Detail Drawer (Preserves GANO, Match %, and Full Profile) */}
      <Drawer
        isOpen={!!selectedCandidate}
        onClose={() => setSelectedCandidate(null)}
        title="Aday İnceleme & Mülakat Paneli"
        size="lg"
      >
        {selectedCandidate && (
          <div className="space-y-6 py-2">
            {/* Header Profile Box */}
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-3">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-burgundy-700 text-white font-black text-xl flex items-center justify-center shadow-md">
                  {selectedCandidate.studentName.substring(0, 2).toUpperCase()}
                </div>
                <div className="space-y-1">
                  <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                    {selectedCandidate.studentName}
                  </h3>
                  <span className="text-xs font-bold text-burgundy-700 dark:text-burgundy-400 block">
                    {selectedCandidate.department} (GANO: {selectedCandidate.gpa})
                  </span>
                  <span className="text-[11px] text-slate-400 block">
                    İlan: {selectedCandidate.jobTitle} • Başvuru: {selectedCandidate.appliedDate}
                  </span>
                </div>
              </div>

              {/* Drawer Tabs */}
              <div className="flex items-center gap-2 pt-2 border-t border-slate-200 dark:border-slate-700">
                <button
                  type="button"
                  onClick={() => setActiveDrawerTab('profile')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors ${
                    activeDrawerTab === 'profile'
                      ? 'bg-burgundy-700 text-white'
                      : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <User className="w-3.5 h-3.5" />
                  <span>Genel Profil & Notlar</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveDrawerTab('timeline')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors ${
                    activeDrawerTab === 'timeline'
                      ? 'bg-burgundy-700 text-white'
                      : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <History className="w-3.5 h-3.5" />
                  <span>Zaman Çizelgesi & Denetim Geçmişi</span>
                </button>
              </div>
            </div>

            {/* TAB 1: Profile View */}
            {activeDrawerTab === 'profile' && (
              <div className="space-y-6 animate-in fade-in duration-150">
                {/* AI Candidate Summary */}
                <div className="p-4 rounded-2xl bg-burgundy-50/60 dark:bg-slate-800/80 border border-burgundy-200 dark:border-slate-700 space-y-2">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-burgundy-700 dark:text-burgundy-400 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 animate-pulse" /> AI Candidate Summary
                  </span>
                  <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                    "Güçlü C++, ROS2 ve Git bilgisine sahip. Akademik GANO ({selectedCandidate.gpa}) yüksek seviyede. ASELSAN aday mühendislik stajı tamamlanmış. Docker ve gömülü Linux konularında gelişime ihtiyaç duyuyor."
                  </p>
                </div>

                {/* Scores & Skills Box (GANO & Match Preserved Here) */}
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 text-center">
                    <span className="text-[10px] font-bold uppercase text-emerald-600 block">Akademik GANO</span>
                    <span className="text-lg font-black text-emerald-800 dark:text-emerald-300">{selectedCandidate.gpa}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 text-center">
                    <span className="text-[10px] font-bold uppercase text-blue-600 block">AI Talent Match</span>
                    <span className="text-lg font-black text-blue-800 dark:text-blue-300">{selectedCandidate.matchScore || '%85'} Eşleşme</span>
                  </div>
                </div>

                {/* Rating & Notes */}
                <div className="space-y-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">İK Değerlendirmesi & Derecelendirme</span>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setCandidateRating(star)}
                        className="p-1 focus:outline-none"
                      >
                        <Star
                          className={`w-5 h-5 ${
                            star <= candidateRating ? 'text-amber-500 fill-current' : 'text-slate-300'
                          }`}
                        />
                      </button>
                    ))}
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300 ml-2">{candidateRating} / 5 Yıldız</span>
                  </div>

                  <textarea
                    rows={3}
                    value={hrNote}
                    onChange={(e) => setHrNote(e.target.value)}
                    placeholder="Aday hakkındaki İK görüşme notlarınızı girin..."
                    className="w-full p-3 text-xs bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-burgundy-700/20 font-medium"
                  />
                </div>
              </div>
            )}

            {/* TAB 2: Candidate Timeline & Audit History */}
            {activeDrawerTab === 'timeline' && (
              <div className="space-y-4 animate-in fade-in duration-150">
                <span className="text-xs font-extrabold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-1.5">
                  <History className="w-4 h-4 text-burgundy-700" />
                  <span>Dikey Aday Denetim Geçmişi (Audit History)</span>
                </span>

                <div className="relative pl-6 space-y-6 border-l-2 border-slate-200 dark:border-slate-700 ml-2">
                  {(auditLogs[selectedCandidate.id] || [
                    { id: '1', date: selectedCandidate.appliedDate, user: selectedCandidate.studentEmail, fromStage: 'Yok', toStage: 'Başvuruldu', reason: 'Öğrenci ilan başvurusunu tamamladı.' },
                    { id: '2', date: selectedCandidate.appliedDate, user: 'ik@aselsankonya.com.tr', fromStage: 'Başvuruldu', toStage: stageTitles[selectedCandidate.stage] || selectedCandidate.stage, reason: 'Aday durumu güncellendi.' },
                  ]).map((log) => (
                    <div key={log.id} className="relative group">
                      <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-burgundy-700 border-2 border-white dark:border-slate-900 shadow-xs" />

                      <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1.5 text-xs">
                        <div className="flex items-center justify-between text-slate-500 font-semibold text-[11px]">
                          <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{log.date}</span>
                          <span className="flex items-center gap-1"><User className="w-3 h-3" />{log.user}</span>
                        </div>

                        <div className="font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-700 text-[10px]">{log.fromStage}</span>
                          <ArrowRight className="w-3.5 h-3.5 text-burgundy-700" />
                          <span className="px-2 py-0.5 rounded bg-burgundy-700 text-white text-[10px]">{log.toStage}</span>
                        </div>

                        <p className="text-slate-600 dark:text-slate-300 font-medium pt-1 text-[11px] border-t border-slate-100 dark:border-slate-700/60">
                          <strong>Açıklama / Sebep:</strong> {log.reason}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </Drawer>
    </div>
  );
};
