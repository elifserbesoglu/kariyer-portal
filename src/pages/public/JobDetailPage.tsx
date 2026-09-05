import React, { useEffect, useState } from 'react';
import { usePublicRouter } from '../../router/PublicRouter';
import { setPageTitle } from '../../utils/seo';
import { Breadcrumb } from '../../components/ui/Breadcrumb';
import { Button } from '../../components/ui/Button';
import { Tag } from '../../components/ui/Tag';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';
import { Input } from '../../components/ui/Input';
import { Alert } from '../../components/ui/Alert';
import { Error404 } from '../../features/errors/ErrorPages';
import { MOCK_COMPANIES } from '../../mockData/publicData';
import { useAuth } from '../../context/AuthContext';
import { useWorkflow } from '../../context/WorkflowContext';
import {
  MapPin,
  Briefcase,
  GraduationCap,
  Clock,
  Bookmark,
  Send,
  CheckCircle2,
  Building2,
  Sparkles,
  AlertCircle,
  FileCheck,
  Edit,
  Users,
  Eye,
  ShieldCheck,
  Info,
} from 'lucide-react';

import { getCombinedJobListings } from '../../utils/jobMapper';

export const JobDetailPage: React.FC = () => {
  const { routeParams, navigate, showLoginRequiredModal } = usePublicRouter();
  const { user, isAuthenticated } = useAuth();
  const { submitStudentApplication, jobs: workflowJobs } = useWorkflow();

  const jobId = routeParams.id || 'job-1';
  const allListings = getCombinedJobListings(workflowJobs);
  const job = allListings.find((j) => j.id === jobId) || allListings[0];
  const company = MOCK_COMPANIES.find((c) => c.id === job.companyId);

  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [customAnswer, setCustomAnswer] = useState('');
  const [applySuccess, setApplySuccess] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [actionNotice, setActionNotice] = useState<string | null>(null);

  useEffect(() => {
    if (job) {
      setPageTitle(`${job.title} - ${job.companyName}`, job.description);
    }
  }, [job]);

  if (!job) return <Error404 onGoHome={() => navigate('home')} />;

  const role = user?.role;
  const isStudentOrAlumni = isAuthenticated && (role === 'Student' || role === 'Alumni');
  const isEmployer = isAuthenticated && role === 'Employer';
  const isCareerCenter = isAuthenticated && role === 'CareerCenter';
  const isPublic = !isAuthenticated;

  // Feature 1.1: AI Talent Match Score Calculation
  const matchedSkills = ['C++', 'Git', 'ROS2'];
  const missingSkills = ['RTOS', 'Docker', 'Embedded Linux'];
  const matchPercentage = 85;

  const handleApplyButtonClick = () => {
    if (isPublic) {
      if (showLoginRequiredModal) {
        showLoginRequiredModal('İş başvurusu yapmak');
      } else {
        navigate('home');
      }
      return;
    }
    if (isStudentOrAlumni) {
      setIsApplyModalOpen(true);
    }
  };

  const handleExecuteApplication = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isStudentOrAlumni) {
      return;
    }

    try {
      submitStudentApplication(
        job.id,
        user?.id || 'usr-student-1',
        user?.fullName || 'Emre Tunç',
        user?.email || 'emre.tunc@ogr.ktun.edu.tr',
        user?.department || 'Bilgisayar Mühendisliği',
        '3.42',
        'Emre_Tunc_ATS_CV_2026.pdf',
        role
      );

      setApplySuccess(true);
      setTimeout(() => {
        setApplySuccess(false);
        setIsApplyModalOpen(false);
      }, 2000);
    } catch (err: any) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-8">
      <Breadcrumb
        items={[
          { label: 'İş ve Staj İlanları', onClick: () => navigate('jobs') },
          { label: job.title },
        ]}
      />

      {/* Role Authorization Warning Info Alerts */}
      {isEmployer && (
        <Alert variant="info" title="İşveren Hesabı Bilgilendirmesi">
          Bu hesap türü kurumsal işveren hesabıdır. İş başvuruları yalnızca Öğrenci ve Mezun hesapları tarafından yapılabilir.
        </Alert>
      )}

      {isCareerCenter && (
        <Alert variant="info" title="Kariyer Merkezi Bilgilendirmesi">
          Kariyer Merkezi hesapları aday başvurusu oluşturamaz.
        </Alert>
      )}

      {actionNotice && (
        <Alert variant="success" title="İşlem Bildirimi">
          {actionNotice}
        </Alert>
      )}

      {/* Top Header Card */}
      <div className="p-6 md:p-8 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-20 h-20 rounded-2xl border border-slate-200 dark:border-slate-800 p-3 bg-white flex items-center justify-center shrink-0 shadow-sm">
              <img src={job.companyLogo} alt={job.companyName} className="max-h-full max-w-full object-contain" />
            </div>
            <div className="space-y-1.5">
              {job.isFeatured && (
                <span className="inline-block text-[10px] font-extrabold uppercase tracking-wider text-burgundy-700 bg-burgundy-100 dark:bg-burgundy-950 px-2 py-0.5 rounded">
                  ÖNE ÇIKAN İLAN
                </span>
              )}
              <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                {job.title}
              </h1>
              <button
                type="button"
                onClick={() => company && navigate('company-detail', { id: company.id })}
                className="text-sm font-bold text-burgundy-700 dark:text-burgundy-400 hover:underline flex items-center gap-1"
              >
                <Building2 className="w-4 h-4" />
                {job.companyName}
              </button>

              <div className="flex flex-wrap items-center gap-2 pt-2">
                <Tag variant="slate"><Briefcase className="w-3.5 h-3.5 mr-1" />{job.workType}</Tag>
                <Tag variant="slate"><MapPin className="w-3.5 h-3.5 mr-1" />{job.location}</Tag>
                <Tag variant="slate"><Clock className="w-3.5 h-3.5 mr-1" />{job.experience}</Tag>
                <Tag variant="slate"><GraduationCap className="w-3.5 h-3.5 mr-1" />{job.department}</Tag>
              </div>
            </div>
          </div>

          {/* Action CTA Box — Dynamically Filtered by Role (Feature 4.13 & 4.14) */}
          <div className="flex flex-col items-stretch md:items-end gap-3 shrink-0 pt-4 md:pt-0 border-t md:border-t-0 border-slate-100 dark:border-slate-800">
            <div className="text-right hidden md:block">
              <span className="block text-[11px] text-slate-400 font-semibold uppercase">Son Başvuru Tarihi</span>
              <span className="text-sm font-extrabold text-red-600 dark:text-red-400">{job.deadline}</span>
            </div>

            {/* Candidate (Student / Alumni) & Public Actions */}
            {(isStudentOrAlumni || isPublic) && (
              <div className="flex items-center gap-2">
                <Button
                  variant={isSaved ? 'primary' : 'outline'}
                  leftIcon={<Bookmark className="w-4 h-4" />}
                  onClick={() => setIsSaved(!isSaved)}
                >
                  {isSaved ? 'Kaydedildi' : 'Kaydet'}
                </Button>
                <Button
                  variant="primary"
                  size="lg"
                  leftIcon={<Send className="w-4 h-4" />}
                  onClick={handleApplyButtonClick}
                  className="bg-burgundy-700 hover:bg-burgundy-800 font-extrabold shadow-md"
                >
                  Hemen Başvur
                </Button>
              </div>
            )}

            {/* Employer Actions (Apply Button HIDDEN, Performance & Edit Visible) */}
            {isEmployer && (
              <div className="flex flex-col sm:flex-row items-center gap-2">
                <div className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2 border border-slate-200 dark:border-slate-700">
                  <Users className="w-4 h-4 text-burgundy-700" />
                  <span>14 Aday Başvurdu</span>
                </div>
                <Button
                  variant="outline"
                  leftIcon={<Edit className="w-4 h-4" />}
                  onClick={() => setActionNotice('İlan düzenleme moduna geçildi.')}
                  className="font-bold"
                >
                  İlanı Düzenle
                </Button>
              </div>
            )}

            {/* Career Center Governance Badges (Apply Button HIDDEN) */}
            {isCareerCenter && (
              <div className="flex items-center gap-2">
                <span className="px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-xs font-extrabold border border-emerald-200 dark:border-emerald-800 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4" />
                  Kurumsal Onaylı & Doğrudan Yayında
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Feature 4.14: AI Match Score & Skill Gap Analysis Box (Visible for Student & Alumni) */}
      {isStudentOrAlumni && (
        <div className="p-6 bg-gradient-to-r from-burgundy-900/10 via-slate-900/5 to-slate-900/10 dark:from-burgundy-950/40 dark:to-slate-900/80 rounded-3xl border border-burgundy-700/30 p-6 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-burgundy-700 text-white shrink-0 shadow-md">
                <Sparkles className="w-6 h-6 animate-pulse" />
              </div>
              <div>
                <h3 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                  <span>AI Yetenek Eşleşme Analizi (Talent Match)</span>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-burgundy-700 text-white">
                    %{matchPercentage} UYUMLU
                  </span>
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">
                  Özgeçmişinizdeki beceriler ile ilan niteliklerinin yapay zekâ analiz sonucudur.
                </p>
              </div>
            </div>

            <div className="w-full sm:w-48 bg-slate-200 dark:bg-slate-800 h-3 rounded-full overflow-hidden p-0.5 border border-slate-300 dark:border-slate-700">
              <div className="bg-burgundy-700 h-full rounded-full transition-all duration-500" style={{ width: `${matchPercentage}%` }} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-slate-200 dark:border-slate-800/60 text-xs">
            {/* Matched Skills */}
            <div className="space-y-2">
              <span className="font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" /> Birebir Eşleşen Becerileriniz
              </span>
              <div className="flex flex-wrap gap-1.5">
                {matchedSkills.map((sk, idx) => (
                  <span key={idx} className="px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-bold border border-emerald-200 dark:border-emerald-800">
                    ✓ {sk}
                  </span>
                ))}
              </div>
            </div>

            {/* Skill Gap */}
            <div className="space-y-2">
              <span className="font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4" /> Geliştirmeniz Önerilen Beceriler
              </span>
              <div className="flex flex-wrap gap-1.5">
                {missingSkills.map((sk, idx) => (
                  <span key={idx} className="px-2.5 py-1 rounded-lg bg-amber-50 dark:bg-amber-950 text-amber-800 dark:text-amber-300 font-bold border border-amber-200 dark:border-amber-800 flex items-center gap-1">
                    <span>+ {sk}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Feature 4.14: Employer Performance Card (Visible for Employer) */}
      {isEmployer && (
        <div className="p-6 bg-slate-900 text-white rounded-3xl border border-slate-800 shadow-md space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-extrabold flex items-center gap-2">
              <Eye className="w-4 h-4 text-burgundy-400" />
              <span>İlan Performansı & Aday Analitiği</span>
            </h3>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-emerald-950 text-emerald-300 border border-emerald-800">
              ⚡ Canlı Analitik
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <div className="p-3 bg-slate-800/60 rounded-2xl border border-slate-700/60">
              <span className="block text-xl font-black text-white">128</span>
              <span className="text-[11px] text-slate-400 font-semibold">Toplam Görüntülenme</span>
            </div>
            <div className="p-3 bg-slate-800/60 rounded-2xl border border-slate-700/60">
              <span className="block text-xl font-black text-burgundy-400">14</span>
              <span className="text-[11px] text-slate-400 font-semibold">Başvuran Aday</span>
            </div>
            <div className="p-3 bg-slate-800/60 rounded-2xl border border-slate-700/60">
              <span className="block text-xl font-black text-emerald-400">%85</span>
              <span className="text-[11px] text-slate-400 font-semibold">Ortalama Aday Uyum Skoru</span>
            </div>
          </div>
        </div>
      )}

      {/* Feature 4.14: Career Center Governance Info (Visible for Career Center) */}
      {isCareerCenter && (
        <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
          <h3 className="text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <Info className="w-4 h-4 text-burgundy-700" />
            <span>Kariyer Merkezi Denetim & Kurumsal Bilgi</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <span className="text-slate-400 block font-semibold">Kurumsal Firma Bilgisi:</span>
              <span className="font-bold text-slate-800 dark:text-slate-200">{job.companyName} (Vergi No: 1234567890)</span>
            </div>
            <div>
              <span className="text-slate-400 block font-semibold">Yayın & Yönetim Statüsü:</span>
              <span className="font-bold text-emerald-600 dark:text-emerald-400">Doğrudan Yayında • Denetlendi</span>
            </div>
          </div>
        </div>
      )}

      {/* Detail Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Job Description & Spec */}
        <div className="lg:col-span-2 space-y-8">
          {/* Overview Section */}
          <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white border-b pb-3">İş Tanımı</h2>
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              {job.description}
            </p>
          </div>

          {/* Responsibilities */}
          <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white border-b pb-3">Görev ve Sorumluluklar</h2>
            <ul className="space-y-2.5 text-sm text-slate-700 dark:text-slate-300">
              {job.responsibilities.map((res, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-burgundy-700 dark:text-burgundy-400 shrink-0 mt-0.5" />
                  <span>{res}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Qualifications */}
          <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white border-b pb-3">Aranan Nitelikler</h2>
            <ul className="space-y-2.5 text-sm text-slate-700 dark:text-slate-300">
              {job.qualifications.map((qual, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{qual}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Perks */}
          <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white border-b pb-3">Yan Haklar & Sunduklarımız</h2>
            <div className="flex flex-wrap gap-2">
              {job.perks.map((perk, idx) => (
                <Badge key={idx} variant="primary" size="md">{perk}</Badge>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar Summary */}
        <div className="space-y-6">
          <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white border-b pb-3">İlan Özeti</h3>
            <div className="space-y-3 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400 font-semibold">Yayın Tarihi:</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">01.07.2024</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400 font-semibold">Son Başvuru:</span>
                <span className="font-bold text-red-600 dark:text-red-400">{job.deadline}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400 font-semibold">Çalışma Şekli:</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">{job.workType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400 font-semibold">Konum:</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">{job.location}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Feature 1.2: One-Click Application & Custom Question Modal (ONLY for Student & Alumni) */}
      {isStudentOrAlumni && (
        <Modal
          isOpen={isApplyModalOpen}
          onClose={() => setIsApplyModalOpen(false)}
          title="İş Başvurusu Gönder"
          size="lg"
        >
          <form onSubmit={handleExecuteApplication} className="space-y-6 py-2">
            {applySuccess && (
              <Alert variant="success" title="Başvuru Tamamlandı!">
                Başvurunuz ve özgeçmişiniz {job.companyName} İK onay havuzuna başarıyla iletildi.
              </Alert>
            )}

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800 space-y-2 border border-slate-200 dark:border-slate-700">
              <h4 className="text-sm font-extrabold text-slate-900 dark:text-white">{job.title}</h4>
              <p className="text-xs text-slate-500 font-semibold">{job.companyName} • {job.location}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input label="Ad Soyad" value={user?.fullName || 'Emre Tunç'} disabled />
              <Input label="E-Posta" value={user?.email || 'emre.tunc@ogr.ktun.edu.tr'} disabled />
              <Input label="Fakülte / Bölüm" value={user?.department || 'Bilgisayar Mühendisliği'} disabled />
              <Input label="Akademik GANO" value="3.42 / 4.00" disabled />
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                İşveren Özel Sorusu: TEKNOFEST / TÜBİTAK Dereceli Projeniz Var mı?
              </label>
              <textarea
                rows={3}
                value={customAnswer}
                onChange={(e) => setCustomAnswer(e.target.value)}
                placeholder="Varsa proje adı, yılı ve teknolojik detaylarını kısaca belirtin..."
                className="w-full p-3 text-sm bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-burgundy-700/20 focus:border-burgundy-700"
              />
            </div>

            <div className="p-3 rounded-xl border border-dashed border-slate-300 dark:border-slate-700 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileCheck className="w-5 h-5 text-burgundy-700" />
                <span className="text-xs font-bold text-slate-900 dark:text-white">Emre_Tunc_ATS_CV_2026.pdf</span>
              </div>
              <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded">Varsayılan CV</span>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
              <Button variant="secondary" onClick={() => setIsApplyModalOpen(false)}>
                İptal
              </Button>
              <Button variant="primary" type="submit" leftIcon={<Send className="w-4 h-4" />} className="bg-burgundy-700 hover:bg-burgundy-800 font-bold">
                Başvuruyu Tamamla
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
