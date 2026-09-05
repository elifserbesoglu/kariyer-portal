import React, { useState, useEffect } from 'react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Alert } from '../../components/ui/Alert';
import { Modal } from '../../components/ui/Modal';
import { Download, Plus, GraduationCap, Briefcase, Code, Award, FileCheck, Upload, Heart } from 'lucide-react';

export const DRIVER_LICENSES = [
  'Yok',
  'M (Moped)',
  'A1 (Hafif Motosiklet)',
  'A2 (Motosiklet)',
  'A (Ağır Motosiklet)',
  'B1 (Dört Tekerlekli Motosiklet)',
  'B (Otomobil / Kamyonet)',
  'BE (Römorklu Otomobil)',
  'C1 (Hafif Kamyon)',
  'C1E (Römorklu Hafif Kamyon)',
  'C (Kamyon ve Çekici)',
  'CE (Römorklu Kamyon / Tır)',
  'D1 (Minibüs)',
  'D1E (Römorklu Minibüs)',
  'D (Otobüs)',
  'DE (Römorklu Otobüs)',
  'F (Traktör)',
  'G (İş Makinesi)'
];

export interface CvData {
  militaryStatus: string;
  driverLicense: string;
  ydsStatus?: 'girmedim' | 'girdim';
  ydsScore: string;
  yokdilStatus?: 'girmedim' | 'girdim';
  yokdilScore: string;
  hobbies: string;
  uploadedCvFile?: { name: string; size: string; date: string } | null;
  education: Array<{ id: string; school: string; department: string; years: string; gpa: string }>;
  experience: Array<{ id: string; company: string; position: string; duration: string; description: string }>;
  projects: Array<{ id: string; title: string; tech: string; link: string; description: string }>;
  skills: string[];
  languages: Array<{ name: string; level: string }>;
  certificates: Array<{ title: string; issuer: string; date: string }>;
}

const DEFAULT_CV: CvData = {
  militaryStatus: 'Tecilli (2027)',
  driverLicense: 'B (Otomobil / Kamyonet)',
  ydsStatus: 'girdim',
  ydsScore: '85',
  yokdilStatus: 'girdim',
  yokdilScore: '90',
  hobbies: 'Otonom Sistemler, Model Uçak, Satranç, Doğa Yürüyüşü',
  uploadedCvFile: { name: 'Emre_Tunc_CV_2026.pdf', size: '1.5 MB', date: '03.08.2026 11:20' },
  education: [
    { id: '1', school: 'Konya Teknik Üniversitesi', department: 'Bilgisayar Mühendisliği (Lisans)', years: '2021 - Devam Ediyor', gpa: '3.42' }
  ],
  experience: [
    { id: '1', company: 'ASELSAN Konya', position: 'Aday Mühendis / Stajyer', duration: 'Haziran 2024 - Eylül 2024', description: 'Gömülü C++ ve Gerçek Zamanlı İşletim Sistemleri (RTOS) üzerinde staj projesi geliştirilmesi.' }
  ],
  projects: [
    { id: '1', title: 'Otonom İHA Seyir Kontrol Yazılımı', tech: 'C++, ROS2, OpenCV', link: 'https://github.com/ktun/uav-control', description: 'TEKNOFEST Savaşan İHA yarışması kapsamında görüntü işleme tabanlı hedef takip sistemi.' }
  ],
  skills: ['C++', 'Python', 'React', 'TypeScript', 'ROS2', 'Docker', 'Git', 'Linux'],
  languages: [
    { name: 'Türkçe', level: 'Ana Dil' },
    { name: 'İngilizce', level: 'İleri Seviye (C1)' },
  ],
  certificates: [
    { title: 'TÜBİTAK 2209-A Üniversite Öğrencileri Araştırma Projesi', issuer: 'TÜBİTAK', date: '2024' },
    { title: 'Advanced C++ & Embedded Systems Certification', issuer: 'Udemy / ASELSAN Akademi', date: '2023' },
  ]
};

export const CvBuilder: React.FC = () => {
  const [cv, setCv] = useState<CvData>(() => {
    const saved = localStorage.getItem('ktun_student_cv_data');
    return saved ? JSON.parse(saved) : DEFAULT_CV;
  });

  const [newSkill, setNewSkill] = useState('');
  const [downloadMsg, setDownloadMsg] = useState(false);
  const [isExpModalOpen, setIsExpModalOpen] = useState(false);
  const [isProjModalOpen, setIsProjModalOpen] = useState(false);

  const [newExp, setNewExp] = useState({ company: '', position: '', duration: '', description: '' });
  const [newProj, setNewProj] = useState({ title: '', tech: '', link: '', description: '' });

  useEffect(() => {
    localStorage.setItem('ktun_student_cv_data', JSON.stringify(cv));
  }, [cv]);

  const handleAddSkill = () => {
    if (newSkill.trim() && !cv.skills.includes(newSkill.trim())) {
      setCv({ ...cv, skills: [...cv.skills, newSkill.trim()] });
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setCv({ ...cv, skills: cv.skills.filter((s) => s !== skillToRemove) });
  };

  const handleAddExperience = (e: React.FormEvent) => {
    e.preventDefault();
    if (newExp.company && newExp.position) {
      const created = { id: `exp-${Date.now()}`, ...newExp };
      setCv({ ...cv, experience: [...cv.experience, created] });
      setNewExp({ company: '', position: '', duration: '', description: '' });
      setIsExpModalOpen(false);
    }
  };

  const handleAddProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (newProj.title) {
      const created = { id: `proj-${Date.now()}`, ...newProj };
      setCv({ ...cv, projects: [...cv.projects, created] });
      setNewProj({ title: '', tech: '', link: '', description: '' });
      setIsProjModalOpen(false);
    }
  };

  const handlePrintablePdfExport = () => {
    setDownloadMsg(true);
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>KTÜN_CV_Emre_Tunc.pdf</title>
            <style>
              body { font-family: 'Segoe UI', Arial, sans-serif; margin: 40px; color: #1e293b; line-height: 1.5; }
              .header { border-bottom: 3px solid #8B0000; padding-bottom: 15px; margin-bottom: 20px; }
              .header h1 { color: #8B0000; margin: 0; font-size: 24px; text-transform: uppercase; }
              .header p { margin: 4px 0 0 0; font-size: 14px; font-weight: bold; color: #475569; }
              .section { margin-bottom: 20px; }
              .section-title { font-size: 14px; font-weight: bold; text-transform: uppercase; color: #8B0000; border-bottom: 1px solid #cbd5e1; padding-bottom: 4px; margin-bottom: 10px; }
              .item { margin-bottom: 10px; font-size: 12px; }
              .item-head { font-weight: bold; display: flex; justify-content: space-between; }
              .badge { background: #f1f5f9; padding: 2px 8px; border-radius: 4px; font-size: 11px; font-weight: bold; }
            </style>
          </head>
          <body>
            <div class="header">
              <h1>Emre Tunç — Özgeçmiş (ATS Formatı)</h1>
              <p>Konya Teknik Üniversitesi | Bilgisayar Mühendisliği (GANO: 3.42)</p>
              <small>E-Posta: emre.tunc@ogr.ktun.edu.tr | Tel: +90 555 123 45 67 | Konya</small>
            </div>

            <div class="section">
              <div class="section-title">Eğitim Bilgileri</div>
              ${cv.education.map(e => `<div class="item"><strong>${e.school}</strong> - ${e.department} (${e.years}) | GANO: ${e.gpa}</div>`).join('')}
            </div>

            <div class="section">
              <div class="section-title">İş ve Staj Deneyimleri</div>
              ${cv.experience.map(e => `<div class="item"><div class="item-head"><span>${e.position} @ ${e.company}</span><span>${e.duration}</span></div><p>${e.description}</p></div>`).join('')}
            </div>

            <div class="section">
              <div class="section-title">Projeler</div>
              ${cv.projects.map(p => `<div class="item"><strong>${p.title}</strong> (${p.tech})<br/>${p.description}</div>`).join('')}
            </div>

            <div class="section">
              <div class="section-title">Uzmanlık & Yetenekler</div>
              <p>${cv.skills.join(' • ')}</p>
            </div>

            <div class="section">
              <div class="section-title">Ek Bilgiler</div>
              <p>
                <strong>YDS:</strong> ${cv.ydsStatus === 'girmedim' ? 'Girmedim' : (cv.ydsScore || '-')} | 
                <strong>YÖKDİL:</strong> ${cv.yokdilStatus === 'girmedim' ? 'Girmedim' : (cv.yokdilScore || '-')} | 
                <strong>Askerlik:</strong> ${cv.militaryStatus} | 
                <strong>Ehliyet:</strong> ${cv.driverLicense || 'Yok'}
              </p>
            </div>
            <script>window.print();</script>
          </body>
        </html>
      `);
      printWindow.document.close();
    }
  };

  const [isCvPreviewOpen, setIsCvPreviewOpen] = useState(false);
  const [saveSuccessMsg, setSaveSuccessMsg] = useState<string | null>(null);

  const handleManualSaveCv = () => {
    localStorage.setItem('ktun_student_cv_data', JSON.stringify(cv));
    setSaveSuccessMsg('Profil verileriniz başarıyla veritabanına kaydedildi.');
    setTimeout(() => setSaveSuccessMsg(null), 4000);
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
        <div>
          <h2 className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-tight flex items-center gap-2">
            <span>PROFİLİM</span>
          </h2>
          <p className="text-xs text-slate-500">
            Kişisel bilgilerinizi, CV belgenizi, eğitim ve iş deneyimlerinizi yönetin.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Button
            variant="outline"
            size="md"
            onClick={() => setIsCvPreviewOpen(true)}
          >
            CV Önizle
          </Button>
          <Button
            variant="secondary"
            size="md"
            onClick={handleManualSaveCv}
            leftIcon={<FileCheck className="w-4 h-4" />}
          >
            Profil Kaydet
          </Button>
          <Button
            variant="primary"
            size="md"
            onClick={handlePrintablePdfExport}
            leftIcon={<Download className="w-4 h-4" />}
          >
            Yazdırılabilir ATS PDF Oluştur
          </Button>
        </div>
      </div>

      {saveSuccessMsg && (
        <Alert variant="success" title="İşlem Başarılı">
          {saveSuccessMsg}
        </Alert>
      )}

      {downloadMsg && (
        <Alert variant="success" title="Pencere Açıldı">
          Yazdırılabilir biçimlendirilmiş ATS PDF önizleme penceresi açılmıştır. Otomatik yazdırma diyaloğu başlatıldı.
        </Alert>
      )}

      {/* CV'ni Yükle Section */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase flex items-center gap-2">
            <Upload className="w-4 h-4 text-burgundy-700" />
            <span>CV'ni Yükle</span>
          </h3>
          <span className="text-xs text-slate-500 font-medium">PDF, DOC, DOCX (Maks. 10MB)</span>
        </div>

        {cv.uploadedCvFile ? (
          <div className="p-4 bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center text-emerald-700 dark:text-emerald-300 shrink-0">
                <FileCheck className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900 dark:text-white">{cv.uploadedCvFile.name}</p>
                <p className="text-[11px] text-slate-500">Yüklendi: {cv.uploadedCvFile.date} • Boyut: {cv.uploadedCvFile.size}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => document.getElementById('cv-file-input')?.click()}
                className="px-3 py-1.5 text-xs font-bold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
              >
                Yeniden Yükle
              </button>
              <button
                type="button"
                onClick={() => setCv({ ...cv, uploadedCvFile: null })}
                className="px-3 py-1.5 text-xs font-bold text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-900 rounded-lg hover:bg-rose-100 transition-colors"
              >
                Kaldır
              </button>
            </div>
          </div>
        ) : (
          <div
            onClick={() => document.getElementById('cv-file-input')?.click()}
            className="border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-burgundy-600 p-6 rounded-2xl text-center cursor-pointer transition-colors bg-slate-50/50 dark:bg-slate-800/20"
          >
            <Upload className="w-8 h-8 text-burgundy-700 mx-auto mb-2" />
            <p className="text-xs font-bold text-slate-900 dark:text-white">Bilgisayarınızdan CV dosyasını seçin veya buraya sürükleyin</p>
            <p className="text-[11px] text-slate-500 mt-1">Yüklediğiniz CV dosyası iş başvurularında firmalara iletilecektir.</p>
          </div>
        )}
        <input
          id="cv-file-input"
          type="file"
          accept=".pdf,.doc,.docx"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              const sizeMb = (file.size / (1024 * 1024)).toFixed(1);
              setCv({
                ...cv,
                uploadedCvFile: {
                  name: file.name,
                  size: `${sizeMb} MB`,
                  date: new Date().toLocaleDateString('tr-TR') + ' ' + new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' }),
                },
              });
            }
          }}
        />
      </div>

      {/* Ek Nitelikler & Dil Puanları */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
          <FileCheck className="w-4 h-4 text-burgundy-700" />
          <span>Ek Nitelikler & Dil Puanları</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs">
          <div>
            <label className="text-slate-500 block mb-1 font-medium">Askerlik Durumu</label>
            <Input
              value={cv.militaryStatus}
              onChange={(e) => setCv({ ...cv, militaryStatus: e.target.value })}
            />
          </div>

          <div>
            <label className="text-slate-500 block mb-1 font-medium">Sürücü Belgesi</label>
            <select
              value={cv.driverLicense || 'Yok'}
              onChange={(e) => setCv({ ...cv, driverLicense: e.target.value })}
              className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-xs font-medium focus:ring-2 focus:ring-burgundy-500 outline-none text-slate-900 dark:text-white h-[38px]"
            >
              {DRIVER_LICENSES.map((lic) => (
                <option key={lic} value={lic}>{lic}</option>
              ))}
            </select>
          </div>

          {/* YDS Puanı */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-slate-500 font-medium">YDS Puanı</label>
              <label className="flex items-center gap-1 cursor-pointer text-[11px] font-semibold text-slate-600 dark:text-slate-400">
                <input
                  type="checkbox"
                  checked={cv.ydsStatus === 'girmedim'}
                  onChange={(e) => {
                    const isGirmedim = e.target.checked;
                    setCv({
                      ...cv,
                      ydsStatus: isGirmedim ? 'girmedim' : 'girdim',
                      ydsScore: isGirmedim ? '' : cv.ydsScore || '0',
                    });
                  }}
                  className="rounded text-burgundy-700 focus:ring-burgundy-500"
                />
                <span>Girmedim</span>
              </label>
            </div>
            <Input
              type="number"
              min={0}
              max={100}
              placeholder={cv.ydsStatus === 'girmedim' ? 'Girmedim' : '0 - 100'}
              disabled={cv.ydsStatus === 'girmedim'}
              value={cv.ydsStatus === 'girmedim' ? '' : cv.ydsScore}
              onChange={(e) => {
                const val = e.target.value;
                if (val === '') {
                  setCv({ ...cv, ydsScore: '' });
                } else {
                  const num = Math.min(100, Math.max(0, Number(val)));
                  setCv({ ...cv, ydsScore: String(num) });
                }
              }}
            />
          </div>

          {/* YÖKDİL Puanı */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-slate-500 font-medium">YÖKDİL Puanı</label>
              <label className="flex items-center gap-1 cursor-pointer text-[11px] font-semibold text-slate-600 dark:text-slate-400">
                <input
                  type="checkbox"
                  checked={cv.yokdilStatus === 'girmedim'}
                  onChange={(e) => {
                    const isGirmedim = e.target.checked;
                    setCv({
                      ...cv,
                      yokdilStatus: isGirmedim ? 'girmedim' : 'girdim',
                      yokdilScore: isGirmedim ? '' : cv.yokdilScore || '0',
                    });
                  }}
                  className="rounded text-burgundy-700 focus:ring-burgundy-500"
                />
                <span>Girmedim</span>
              </label>
            </div>
            <Input
              type="number"
              min={0}
              max={100}
              placeholder={cv.yokdilStatus === 'girmedim' ? 'Girmedim' : '0 - 100'}
              disabled={cv.yokdilStatus === 'girmedim'}
              value={cv.yokdilStatus === 'girmedim' ? '' : cv.yokdilScore}
              onChange={(e) => {
                const val = e.target.value;
                if (val === '') {
                  setCv({ ...cv, yokdilScore: '' });
                } else {
                  const num = Math.min(100, Math.max(0, Number(val)));
                  setCv({ ...cv, yokdilScore: String(num) });
                }
              }}
            />
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-burgundy-700" />
            <span>Eğitim Bilgileri</span>
          </h3>
          <span className="text-[11px] font-bold text-slate-400">OBS Doğrulanmış</span>
        </div>

        {cv.education.map((edu) => (
          <div key={edu.id} className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl space-y-1 text-xs">
            <div className="flex items-center justify-between font-bold text-slate-900 dark:text-white">
              <span>{edu.school}</span>
              <span className="text-burgundy-700 font-extrabold">{edu.years}</span>
            </div>
            <p className="text-slate-600 dark:text-slate-300">{edu.department}</p>
            <p className="text-[11px] text-slate-500">GANO: <strong className="text-slate-800 dark:text-slate-200">{edu.gpa} / 4.00</strong></p>
          </div>
        ))}
      </div>

      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-burgundy-700" />
            <span>İş & Staj Deneyimleri</span>
          </h3>
          <Button variant="outline" size="sm" onClick={() => setIsExpModalOpen(true)} leftIcon={<Plus className="w-3.5 h-3.5" />}>
            Yeni Deneyim Ekle
          </Button>
        </div>

        {cv.experience.map((exp) => (
          <div key={exp.id} className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl space-y-1.5 text-xs border border-slate-100 dark:border-slate-800">
            <div className="flex items-center justify-between font-bold text-slate-900 dark:text-white">
              <span className="text-sm">{exp.position}</span>
              <span className="text-slate-500 font-medium text-[11px]">{exp.duration}</span>
            </div>
            <p className="font-semibold text-burgundy-700">{exp.company}</p>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed pt-1">{exp.description}</p>
          </div>
        ))}
      </div>

      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase flex items-center gap-2">
            <Code className="w-4 h-4 text-burgundy-700" />
            <span>Projeler & Çalışmalar</span>
          </h3>
          <Button variant="outline" size="sm" onClick={() => setIsProjModalOpen(true)} leftIcon={<Plus className="w-3.5 h-3.5" />}>
            Yeni Proje Ekle
          </Button>
        </div>

        {cv.projects.map((proj) => (
          <div key={proj.id} className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl space-y-1.5 text-xs">
            <div className="flex items-center justify-between font-bold text-slate-900 dark:text-white">
              <span>{proj.title}</span>
              <a href={proj.link} target="_blank" rel="noreferrer" className="text-burgundy-700 hover:underline text-[11px]">
                {proj.link}
              </a>
            </div>
            <span className="inline-block bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 text-[10px] px-2 py-0.5 rounded font-mono">
              {proj.tech}
            </span>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed pt-1">{proj.description}</p>
          </div>
        ))}
      </div>

      {/* Dedicated Hobiler & Faaliyetler Section (Max 1000 Karakter) */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase flex items-center gap-2">
            <Heart className="w-4 h-4 text-burgundy-700" />
            <span>Hobiler & Sosyal Faaliyetler</span>
          </h3>
          <span className="text-xs text-slate-400 font-semibold">
            {cv.hobbies?.length || 0} / 1000 Karakter
          </span>
        </div>

        <div>
          <textarea
            rows={4}
            maxLength={1000}
            placeholder="Hobilerinizi, ilgi alanlarınızı, katıldığınız kulüpleri veya sosyal faaliyetleri detaylıca yazabilirsiniz (maks. 1000 karakter)..."
            value={cv.hobbies || ''}
            onChange={(e) => setCv({ ...cv, hobbies: e.target.value })}
            className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl p-3 text-xs font-medium focus:ring-2 focus:ring-burgundy-500 outline-none text-slate-900 dark:text-white resize-y leading-relaxed"
          />
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-burgundy-700" />
            <span>Eğitim Bilgileri</span>
          </h3>
          <span className="text-[11px] font-bold text-slate-400">OBS Doğrulanmış</span>
        </div>

        {cv.education.map((edu) => (
          <div key={edu.id} className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl space-y-1 text-xs">
            <div className="flex items-center justify-between font-bold text-slate-900 dark:text-white">
              <span>{edu.school}</span>
              <span className="text-burgundy-700 font-extrabold">{edu.years}</span>
            </div>
            <p className="text-slate-600 dark:text-slate-300">{edu.department}</p>
            <p className="text-[11px] text-slate-500">GANO: <strong className="text-slate-800 dark:text-slate-200">{edu.gpa} / 4.00</strong></p>
          </div>
        ))}
      </div>

      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-burgundy-700" />
            <span>İş & Staj Deneyimleri</span>
          </h3>
          <Button variant="outline" size="sm" onClick={() => setIsExpModalOpen(true)} leftIcon={<Plus className="w-3.5 h-3.5" />}>
            Yeni Deneyim Ekle
          </Button>
        </div>

        {cv.experience.map((exp) => (
          <div key={exp.id} className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl space-y-1.5 text-xs border border-slate-100 dark:border-slate-800">
            <div className="flex items-center justify-between font-bold text-slate-900 dark:text-white">
              <span className="text-sm">{exp.position}</span>
              <span className="text-slate-500 font-medium text-[11px]">{exp.duration}</span>
            </div>
            <p className="font-semibold text-burgundy-700">{exp.company}</p>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed pt-1">{exp.description}</p>
          </div>
        ))}
      </div>

      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase flex items-center gap-2">
            <Code className="w-4 h-4 text-burgundy-700" />
            <span>Projeler & Çalışmalar</span>
          </h3>
          <Button variant="outline" size="sm" onClick={() => setIsProjModalOpen(true)} leftIcon={<Plus className="w-3.5 h-3.5" />}>
            Yeni Proje Ekle
          </Button>
        </div>

        {cv.projects.map((proj) => (
          <div key={proj.id} className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl space-y-1.5 text-xs">
            <div className="flex items-center justify-between font-bold text-slate-900 dark:text-white">
              <span>{proj.title}</span>
              <a href={proj.link} target="_blank" rel="noreferrer" className="text-burgundy-700 hover:underline text-[11px]">
                {proj.link}
              </a>
            </div>
            <span className="inline-block bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 text-[10px] px-2 py-0.5 rounded font-mono">
              {proj.tech}
            </span>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed pt-1">{proj.description}</p>
          </div>
        ))}
      </div>

      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
          <Award className="w-4 h-4 text-burgundy-700" />
          <span>Yetenekler & Uzmanlık Alanları</span>
        </h3>

        <div className="flex flex-wrap items-center gap-2">
          {cv.skills.map((skill, idx) => (
            <span
              key={idx}
              className="inline-flex items-center gap-1.5 bg-burgundy-50 dark:bg-burgundy-950 text-burgundy-700 dark:text-burgundy-300 text-xs font-bold px-3 py-1 rounded-full border border-burgundy-200 dark:border-burgundy-900"
            >
              {skill}
              <button
                type="button"
                onClick={() => handleRemoveSkill(skill)}
                className="hover:text-red-600 transition-colors"
              >
                ×
              </button>
            </span>
          ))}
        </div>

        <div className="flex items-center gap-2 max-w-sm pt-2">
          <Input
            placeholder="Yeni yetenek ekle (ör. Docker)"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
          />
          <Button size="sm" onClick={handleAddSkill}>
            Ekle
          </Button>
        </div>
      </div>

      <Modal isOpen={isExpModalOpen} onClose={() => setIsExpModalOpen(false)} title="Yeni İş / Staj Deneyimi Ekle">
        <form onSubmit={handleAddExperience} className="space-y-4">
          <Input label="Firma / Kurum Adı" required value={newExp.company} onChange={(e) => setNewExp({ ...newExp, company: e.target.value })} />
          <Input label="Pozisyon / Unvan" required value={newExp.position} onChange={(e) => setNewExp({ ...newExp, position: e.target.value })} />
          <Input label="Çalışma Süresi (Tarih)" required placeholder="ör. Haziran 2024 - Eylül 2024" value={newExp.duration} onChange={(e) => setNewExp({ ...newExp, duration: e.target.value })} />
          <div>
            <label className="text-xs font-medium block mb-1">Açıklama & Sorumluluklar</label>
            <textarea className="w-full p-2.5 rounded-lg border text-xs" rows={3} value={newExp.description} onChange={(e) => setNewExp({ ...newExp, description: e.target.value })} />
          </div>
          <Button type="submit" variant="primary" fullWidth>Kaydet & Ekle</Button>
        </form>
      </Modal>

      <Modal isOpen={isProjModalOpen} onClose={() => setIsProjModalOpen(false)} title="Yeni Proje Ekle">
        <form onSubmit={handleAddProject} className="space-y-4">
          <Input label="Proje Adı" required value={newProj.title} onChange={(e) => setNewProj({ ...newProj, title: e.target.value })} />
          <Input label="Kullanılan Teknolojiler" required placeholder="ör. React, TypeScript, C++" value={newProj.tech} onChange={(e) => setNewProj({ ...newProj, tech: e.target.value })} />
          <Input label="Proje Bağlantısı / Repository" placeholder="https://github.com/..." value={newProj.link} onChange={(e) => setNewProj({ ...newProj, link: e.target.value })} />
          <div>
            <label className="text-xs font-medium block mb-1">Proje Detayları</label>
            <textarea className="w-full p-2.5 rounded-lg border text-xs" rows={3} value={newProj.description} onChange={(e) => setNewProj({ ...newProj, description: e.target.value })} />
          </div>
          <Button type="submit" variant="primary" fullWidth>Kaydet & Ekle</Button>
        </form>
      </Modal>

      <Modal isOpen={isCvPreviewOpen} onClose={() => setIsCvPreviewOpen(false)} title="Özgeçmiş Canlı Önizleme (ATS Format)">
        <div className="space-y-4 text-xs max-h-[70vh] overflow-y-auto p-2">
          <div className="border-b-2 border-burgundy-700 pb-3">
            <h3 className="text-base font-extrabold text-burgundy-700 uppercase">Emre Tunç</h3>
            <p className="text-slate-500 font-semibold">Bilgisayar Mühendisliği Öğrencisi | KTÜN</p>
            <p className="text-[11px] text-slate-400">emre.tunc@ogr.ktun.edu.tr • +90 555 123 45 67 • Konya</p>
          </div>

          <div className="space-y-1">
            <h4 className="font-bold text-burgundy-700 uppercase border-b pb-0.5">Eğitim Bilgileri</h4>
            {cv.education.map((e) => (
              <div key={e.id} className="p-2 bg-slate-50 dark:bg-slate-800 rounded">
                <strong>{e.school}</strong> — {e.department} ({e.years}) | GANO: {e.gpa}
              </div>
            ))}
          </div>

          <div className="space-y-1">
            <h4 className="font-bold text-burgundy-700 uppercase border-b pb-0.5">İş & Staj Deneyimleri</h4>
            {cv.experience.map((e) => (
              <div key={e.id} className="p-2 bg-slate-50 dark:bg-slate-800 rounded space-y-0.5">
                <div className="font-bold">{e.position} @ {e.company} ({e.duration})</div>
                <p className="text-slate-600 dark:text-slate-300">{e.description}</p>
              </div>
            ))}
          </div>

          <div className="space-y-1">
            <h4 className="font-bold text-burgundy-700 uppercase border-b pb-0.5">Yetenekler</h4>
            <div className="flex flex-wrap gap-1">
              {cv.skills.map((s, idx) => (
                <span key={idx} className="px-2 py-0.5 bg-burgundy-100 text-burgundy-800 font-bold text-[10px] rounded-full">{s}</span>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsCvPreviewOpen(false)}>Kapat</Button>
            <Button variant="primary" onClick={handlePrintablePdfExport}>PDF Olarak Yazdır</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
