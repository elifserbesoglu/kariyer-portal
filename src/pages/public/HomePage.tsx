import React, { useEffect, useState, useMemo } from 'react';
import { usePublicRouter } from '../../router/PublicRouter';
import { setPageTitle } from '../../utils/seo';
import { Button } from '../../components/ui/Button';
import { StatCard } from '../../components/cards/StatCard';
import { SectionTitle } from '../../components/ui/SectionTitle';
import ktunOfficialCampusImage from '../../assets/images/ktun-official.jpg';
import {
  MOCK_JOBS,
} from '../../mockData/publicData';
import {
  Users,
  Briefcase,
  GraduationCap,
  ArrowRight,
  CheckCircle2,
  FileText,
  Building2,
  Award,
} from 'lucide-react';

const KTUN_OFFICIAL_PRESS_IMAGE_URL = 'https://www.ktun.edu.tr/Dosyalar/0/images/KT%C3%9CN%20Tan%C4%B1t%C4%B1m%20ve%20Rehberlik%20G%C3%BCnleri%20Basin%20Bulteni%20(3).jpg';

import { useWorkflow } from '../../context/WorkflowContext';
import { getCombinedJobListings } from '../../utils/jobMapper';

export const HomePage: React.FC = () => {
  const { navigate } = usePublicRouter();
  const { jobs: workflowJobs } = useWorkflow();
  const [activeFilter, setActiveFilter] = useState<'all' | 'job' | 'intern'>('all');

  useEffect(() => {
    setPageTitle(
      'Ana Sayfa',
      'Konya Teknik Üniversitesi Kariyer Gelişim ve Mezun İzleme Uygulama ve Araştırma Merkezi Resmi Portalı'
    );
  }, []);

  const allJobsings = useMemo(() => {
    return getCombinedJobListings(workflowJobs);
  }, [workflowJobs]);

  const filteredJobs = useMemo(() => {
    if (activeFilter === 'job') {
      return allJobsings.filter((j) => j.jobType === 'İş İlanı');
    }
    if (activeFilter === 'intern') {
      return allJobsings.filter((j) => j.jobType === 'Staj İlanı');
    }
    return allJobsings;
  }, [activeFilter, allJobsings]);

  const quickAccessCards = [
    {
      title: 'İş İlanları',
      desc: 'Onaylı tam ve yarı zamanlı pozisyonlar',
      icon: <Briefcase className="w-5 h-5 text-burgundy-700" />,
      onClick: () => navigate('jobs'),
    },
    {
      title: 'Staj İlanları',
      desc: 'Zorunlu ve gönüllü staj fırsatları',
      icon: <GraduationCap className="w-5 h-5 text-burgundy-700" />,
      onClick: () => navigate('jobs'),
    },
    {
      title: 'Mezun Takip',
      desc: 'KTÜN mezun ağı ve kariyer haritası',
      icon: <Users className="w-5 h-5 text-burgundy-700" />,
      onClick: () => navigate('career-center'),
    },
    {
      title: 'Duyurular & Haberler',
      desc: 'Güncel takvim ve duyurular',
      icon: <Award className="w-5 h-5 text-burgundy-700" />,
      onClick: () => navigate('announcements'),
    },
    {
      title: 'CV Oluştur',
      desc: 'ATS uyumlu profesyonel CV',
      icon: <FileText className="w-5 h-5 text-burgundy-700" />,
      onClick: () => navigate('jobs'),
    },
    {
      title: 'Anlaşmalı Firmalar',
      desc: 'Partner şirket rehberi',
      icon: <Building2 className="w-5 h-5 text-burgundy-700" />,
      onClick: () => navigate('companies'),
    },
  ];

  const featuredEmployers = [
    { name: 'ASELSAN Konya', category: 'Savunma Sanayii' },
    { name: 'HAVELSAN', category: 'Yazılım & Savunma' },
    { name: 'TUSAŞ', category: 'Havacılık & Uzay' },
    { name: 'Türk Telekom', category: 'Telekomünikasyon' },
    { name: 'ROKETSAN', category: 'Savunma & Füze' },
    { name: 'Konya Sanayi Odası', category: 'Sanayi & İmalat' },
  ];

  return (
    <div className="space-y-16">
      {/* 1. Integrated Hero Section (Crisp Official KTÜN Campus Visual Canvas) */}
      <section className="relative overflow-hidden py-2 sm:py-4 min-h-[320px] sm:min-h-[360px] flex items-center">
        {/* Sağ Taraf Arka Plan: Net Görünür Gerçek KTÜN Kampüs Fotoğrafı (%55 Genişlik) */}
        <div className="absolute inset-y-0 right-0 w-full lg:w-[55%] z-0 pointer-events-none overflow-hidden">
          <img
            src={ktunOfficialCampusImage || KTUN_OFFICIAL_PRESS_IMAGE_URL}
            alt="Konya Teknik Üniversitesi (KTÜN) Rektörlük Binası ve Kampüsü"
            className="w-full h-full object-cover object-[center_15%] opacity-95 dark:opacity-90"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = KTUN_OFFICIAL_PRESS_IMAGE_URL;
            }}
          />
          {/* Kısa ve Yumuşak Sol Kenar Beyaz Fade Overlay (Fotoğrafın Sağ Tarafı %100 Net) */}
          <div className="absolute inset-y-0 left-0 w-24 sm:w-36 lg:w-48 bg-gradient-to-r from-white via-white/80 to-transparent dark:from-slate-950 dark:via-slate-950/80 pointer-events-none" />
        </div>

        {/* Hero Content Container */}
        <div className="relative z-10 w-full grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Sol Taraf Content: Dikey Dengeli Metin ve CTA */}
          <div className="lg:col-span-7 space-y-4">
            <div className="space-y-2">
              <span className="text-xs font-black uppercase tracking-widest text-burgundy-700 dark:text-burgundy-400 block">
                KTÜN KARİYER PORTALI
              </span>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.15]">
                Yeni fırsatlar,<br />
                <span className="relative inline-block text-burgundy-700 dark:text-burgundy-400">
                  kariyerine
                  <svg className="absolute -bottom-1 left-0 w-full h-2.5 text-burgundy-700/80 dark:text-burgundy-400/80" viewBox="0 0 100 12" preserveAspectRatio="none">
                    <path d="M0 9 Q 50 1, 100 9" stroke="currentColor" strokeWidth="4" fill="none" strokeLinecap="round" />
                  </svg>
                </span> yön ver.
              </h1>
            </div>

            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 font-medium leading-relaxed max-w-[500px]">
              Konya Teknik Üniversitesi onaylı kurumsal partnerler tarafından yayınlanan güncel mühendislik, yazılım ve aday mühendislik staj pozisyonlarını keşfet.
            </p>

            <div className="flex flex-col sm:flex-row sm:items-center gap-4 pt-1">
              <Button
                variant="primary"
                size="lg"
                onClick={() => navigate('jobs')}
                className="bg-burgundy-700 hover:bg-burgundy-800 text-white font-extrabold shadow-md hover:shadow-lg transition-all rounded-xl px-6 py-3 flex items-center justify-center gap-2"
              >
                <span>Tüm İş & Staj İlanlarını Gör</span>
                <ArrowRight className="w-4 h-4" />
              </Button>

              {/* Social Proof Info */}
              <div className="flex items-center gap-3 px-1 py-1">
                <div className="flex -space-x-2 shrink-0">
                  <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" alt="Student" className="w-8 h-8 rounded-full border-2 border-white dark:border-slate-900 object-cover" />
                  <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80" alt="Student" className="w-8 h-8 rounded-full border-2 border-white dark:border-slate-900 object-cover" />
                  <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=100&q=80" alt="Student" className="w-8 h-8 rounded-full border-2 border-white dark:border-slate-900 object-cover" />
                </div>
                <div className="text-xs">
                  <span className="font-extrabold text-slate-900 dark:text-white block">1.250+ aktif ilan</span>
                  <span className="text-slate-500 text-[11px]">Her gün güncelleniyor</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SON İLANLAR Section (Title, Subtitle, Filters, 3-Col Grid & Featured Card) */}
      <section className="space-y-6">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200/60 dark:border-slate-800 pb-4">
          <div className="space-y-1">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              SON İLANLAR
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
              Yeni yayınlanan iş ve staj fırsatlarını keşfet.
            </p>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('jobs')}
            className="w-fit text-burgundy-700 dark:text-burgundy-400 border-burgundy-700/30 hover:bg-burgundy-50 dark:hover:bg-burgundy-950/40 font-extrabold"
          >
            <span>İlanların Tümünü Gör →</span>
          </Button>
        </div>

        {/* Filters Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          <button
            type="button"
            onClick={() => setActiveFilter('all')}
            className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all whitespace-nowrap cursor-pointer ${
              activeFilter === 'all'
                ? 'bg-burgundy-700 text-white shadow-xs'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            Tümü
          </button>
          <button
            type="button"
            onClick={() => setActiveFilter('job')}
            className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all whitespace-nowrap cursor-pointer ${
              activeFilter === 'job'
                ? 'bg-burgundy-700 text-white shadow-xs'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            İş İlanları
          </button>
          <button
            type="button"
            onClick={() => setActiveFilter('intern')}
            className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all whitespace-nowrap cursor-pointer ${
              activeFilter === 'intern'
                ? 'bg-burgundy-700 text-white shadow-xs'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            Staj İlanları
          </button>
        </div>

        {/* 3-Column Job Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredJobs.slice(0, 3).map((job) => (
            <div
              key={`latest-${job.id}`}
              onClick={() => navigate('job-detail', { id: job.id })}
              className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-2xs hover:shadow-md hover:-translate-y-1 hover:border-burgundy-700/40 transition-all duration-200 cursor-pointer flex flex-col justify-between group space-y-4"
            >
              <div className="space-y-3">
                {/* Header Row: Company Logo + Active Badge + Job Type */}
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={job.companyLogo}
                      alt={job.companyName}
                      className="w-11 h-11 rounded-xl object-contain bg-slate-50 dark:bg-slate-800 p-1 border border-slate-200/60 dark:border-slate-700 shrink-0"
                    />
                    <div>
                      <h4 className="text-xs font-extrabold text-slate-900 dark:text-white group-hover:text-burgundy-700 transition-colors">
                        {job.companyName}
                      </h4>
                      <span className="text-[10px] text-slate-400 font-medium flex items-center gap-1">
                        {job.location}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-900 px-2 py-0.5 rounded-full">
                      Aktif
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                      job.jobType === 'Staj İlanı'
                        ? 'bg-amber-50 dark:bg-amber-950/50 text-amber-800 dark:text-amber-300 border-amber-200 dark:border-amber-900'
                        : 'bg-blue-50 dark:bg-blue-950/50 text-blue-800 dark:text-blue-300 border-blue-200 dark:border-blue-900'
                    }`}>
                      {job.jobType}
                    </span>
                  </div>
                </div>

                {/* Title & Description */}
                <div className="space-y-1">
                  <h3 className="text-base font-extrabold text-slate-900 dark:text-white group-hover:text-burgundy-700 leading-snug transition-colors line-clamp-1">
                    {job.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 font-medium leading-relaxed">
                    {job.description}
                  </p>
                </div>
              </div>

              {/* Footer Metadata & Action */}
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                <div className="text-[11px] text-slate-500 dark:text-slate-400 font-semibold space-x-1">
                  <span>{job.workType}</span>
                  {job.department && <span>• {job.department}</span>}
                </div>

                <span className="font-extrabold text-burgundy-700 dark:text-burgundy-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform text-xs shrink-0">
                  Detayları Gör →
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* ÖNE ÇIKAN FIRSAT Feature Card */}
        <div
          onClick={() => navigate('job-detail', { id: MOCK_JOBS[0].id })}
          className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer flex flex-col md:flex-row items-start md:items-center justify-between gap-6 group relative overflow-hidden mt-4"
        >
          <div className="space-y-3 max-w-2xl relative z-10">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black uppercase tracking-widest bg-burgundy-700 text-white px-3 py-1 rounded-full">
                ÖNE ÇIKAN FIRSAT
              </span>
              <span className="text-xs text-slate-300 font-semibold">• {MOCK_JOBS[0].companyName}</span>
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-white group-hover:text-burgundy-400 transition-colors">
              {MOCK_JOBS[0].title}
            </h3>

            <p className="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed line-clamp-2">
              {MOCK_JOBS[0].description}
            </p>

            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 font-medium pt-1">
              <span>📍 {MOCK_JOBS[0].location}</span>
              <span>• {MOCK_JOBS[0].workType}</span>
              <span>• {MOCK_JOBS[0].department}</span>
            </div>
          </div>

          <div className="shrink-0 relative z-10 w-full md:w-auto">
            <Button
              variant="primary"
              size="md"
              onClick={(e) => {
                e.stopPropagation();
                navigate('job-detail', { id: MOCK_JOBS[0].id });
              }}
              className="bg-burgundy-700 hover:bg-burgundy-800 text-white font-extrabold shadow-md w-full md:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl"
            >
              <span>İlanı İncele →</span>
            </Button>
          </div>
        </div>
      </section>

      {/* 3. HIZLI ERİŞİM Section (Compact Navigation Services) */}
      <section className="space-y-4">
        <SectionTitle
          title="Hızlı Erişim"
          subtitle="Öğrenci, mezun ve işverenlerimiz için kariyer servisleri"
        />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
          {quickAccessCards.map((card, idx) => (
            <button
              key={idx}
              onClick={card.onClick}
              className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-2xs hover:shadow-sm hover:border-burgundy-700/40 transition-all text-left group flex flex-col justify-between space-y-3 cursor-pointer"
            >
              <div className="p-2 rounded-xl bg-burgundy-50 dark:bg-slate-800 w-fit group-hover:bg-burgundy-700 group-hover:text-white transition-colors [&_svg]:group-hover:text-white [&_svg]:transition-colors">
                {card.icon}
              </div>
              <div>
                <h4 className="text-xs font-black text-slate-900 dark:text-white group-hover:text-burgundy-700 transition-colors leading-tight">
                  {card.title}
                </h4>
                <p className="text-[10px] text-slate-400 font-medium line-clamp-1 mt-0.5">
                  {card.desc}
                </p>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* 4. KURUMSAL RAKAMLAR Section */}
      <section className="space-y-6">
        <SectionTitle
          title="Kurumsal Rakamlarla KTÜN Kariyer"
          subtitle="Sanayi iş birliklerimiz ve mezun istihdam oranlarımız"
        />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          <StatCard
            title="Kayıtlı Öğrenci & Mezun"
            value="14.800+"
            icon={<GraduationCap className="w-5 h-5 text-burgundy-700" />}
          />
          <StatCard
            title="Anlaşmalı Sanayi Kuruluşu"
            value="450+"
            icon={<Briefcase className="w-5 h-5 text-burgundy-700" />}
          />
          <StatCard
            title="Mezun İstihdam Oranı"
            value="%94.2"
            change="+3.2%"
            icon={<Users className="w-5 h-5 text-burgundy-700" />}
          />
          <StatCard
            title="Yıllık Yayınlanan İlan"
            value="1.250+"
            icon={<CheckCircle2 className="w-5 h-5 text-burgundy-700" />}
          />
        </div>
      </section>

      {/* 5. ANLAŞMALI FİRMALAR Section */}
      <section className="space-y-6">
        <SectionTitle
          title="Anlaşmalı Firmalar"
          subtitle="KTÜN öğrencilerine istihdam olanağı sağlayan kurumsal sanayi partnerleri"
        />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {featuredEmployers.map((emp, i) => (
            <div
              key={i}
              className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-2xs flex flex-col items-center justify-center text-center space-y-2 hover:border-burgundy-700/40 transition-colors"
            >
              <div className="w-11 h-11 rounded-xl bg-burgundy-700/10 text-burgundy-700 flex items-center justify-center font-extrabold text-sm shrink-0">
                {emp.name.substring(0, 2).toUpperCase()}
              </div>
              <span className="text-xs font-black text-slate-900 dark:text-white leading-tight">
                {emp.name}
              </span>
              <span className="text-[10px] text-slate-400 font-medium truncate max-w-full">
                {emp.category}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* 6. SON CTA Section */}
      <section className="bg-slate-900 text-white rounded-3xl p-8 sm:p-10 border border-slate-800 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Kariyer fırsatlarını keşfetmeye hazır mısın?
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed">
            1.250+ iş ve staj ilanı arasından sana uygun fırsatı bul.
          </p>
        </div>

        <Button
          variant="primary"
          size="lg"
          onClick={() => navigate('jobs')}
          className="bg-burgundy-700 hover:bg-burgundy-800 text-white font-extrabold shadow-md px-8 py-3.5 rounded-xl whitespace-nowrap cursor-pointer"
        >
          <span>Tüm İlanları Gör →</span>
        </Button>
      </section>
    </div>
  );
};
