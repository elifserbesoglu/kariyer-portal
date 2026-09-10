import React, { useState } from 'react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Modal } from '../../components/ui/Modal';
import { Alert } from '../../components/ui/Alert';
import {
  ExternalLink,
  Globe,
  Plus,
  Award,
  Layers,
  FileCheck,
  Send,
  Code2,
  GitBranch,
  Trash2,
  Eye,
  Upload,
  FileText,
  Download,
} from 'lucide-react';

export interface PortfolioProject {
  id: string;
  title: string;
  category: string;
  githubUrl: string;
  liveDemoUrl: string;
  technologies: string[];
  description: string;
}

export interface VerifiedCertificate {
  id: string;
  title: string;
  organization: string;
  issueDate: string;
  credentialId: string;
  pdfFileName?: string;
  pdfUrl?: string;
}

export const StudentPortfolioShowcase: React.FC = () => {
  const [projects, setProjects] = useState<PortfolioProject[]>([
    {
      id: 'p-1',
      title: 'TEKNOFEST Savaşan İHA Otonom Seyir & Hedef Kilitlenme',
      category: 'Otonom Sistemler & C++',
      githubUrl: 'https://github.com/ktun/uav-target-tracking',
      liveDemoUrl: 'https://uav-demo.ktun.edu.tr',
      technologies: ['C++20', 'ROS2', 'OpenCV', 'YOLOv8', 'Linux'],
      description: 'KTÜN İHA Takımı bünyesinde geliştirilen görüntü işleme tabanlı gerçek zamanlı otonom hedef kilitlenme algoritması.',
    },
    {
      id: 'p-2',
      title: 'Gömülü RTOS Tabanlı Telemetri & CAN Bus Veri Toplama',
      category: 'Gömülü Sistemler',
      githubUrl: 'https://github.com/ktun/embedded-telemetry',
      liveDemoUrl: 'https://telemetry.ktun.edu.tr',
      technologies: ['STM32', 'FreeRTOS', 'CAN Bus', 'Embedded C'],
      description: 'Elektrikli araç yarışları için STM32 mikrodenetleyici üzerinde çalışan çok kanallı CAN otobüsü okuma yazılımı.',
    },
  ]);

  const [certificates, setCertificates] = useState<VerifiedCertificate[]>([
    {
      id: 'cert-1',
      title: 'ASELSAN Aday Mühendislik Gömülü C++ Sertifikası',
      organization: 'ASELSAN Akademi',
      issueDate: 'Haziran 2026',
      credentialId: 'ASELSAN-2026-8894',
      pdfFileName: 'ASELSAN_Aday_Muhendis_Sertifikasi.pdf',
      pdfUrl: '#',
    },
    {
      id: 'cert-2',
      title: 'TÜBİTAK 2209-A Üniversite Öğrencileri Araştırma Projesi',
      organization: 'TÜBİTAK',
      issueDate: 'Mayıs 2026',
      credentialId: 'TUBITAK-2209A-1092',
      pdfFileName: 'TUBITAK_2209A_Proje_Belgesi.pdf',
      pdfUrl: '#',
    },
  ]);

  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [isCertModalOpen, setIsCertModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const [newProj, setNewProj] = useState({
    title: '',
    category: 'Yazılım & Mühendislik',
    githubUrl: '',
    liveDemoUrl: '',
    technologies: '',
    description: '',
  });

  const [newCert, setNewCert] = useState({
    title: '',
    organization: '',
    credentialId: '',
    pdfFile: null as File | null,
  });

  const handleDeleteProject = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setProjects((prev) => prev.filter((p) => p.id !== id));
    if (selectedProject?.id === id) {
      setSelectedProject(null);
    }
    setSuccessMsg('Proje portfolyonuzdan silindi.');
    setTimeout(() => setSuccessMsg(null), 3000);
  };

  const handleDeleteCert = (id: string) => {
    setCertificates((prev) => prev.filter((c) => c.id !== id));
    setSuccessMsg('Sertifika vitrininizden kaldırıldı.');
    setTimeout(() => setSuccessMsg(null), 3000);
  };

  const handleAddProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProj.title) return;

    const created: PortfolioProject = {
      id: `p-${Date.now()}`,
      title: newProj.title,
      category: newProj.category,
      githubUrl: newProj.githubUrl || 'https://github.com/ktun/project',
      liveDemoUrl: newProj.liveDemoUrl || 'https://demo.ktun.edu.tr',
      technologies: newProj.technologies.split(',').map((t) => t.trim()).filter(Boolean),
      description: newProj.description || 'KTÜN Mühendislik Fakültesi bitirme / ders projesi.',
    };

    setProjects([created, ...projects]);
    setIsProjectModalOpen(false);
    setNewProj({ title: '', category: 'Yazılım & Mühendislik', githubUrl: '', liveDemoUrl: '', technologies: '', description: '' });
    setSuccessMsg('Projeniz başarıyla portfolyonuza eklendi.');
    setTimeout(() => setSuccessMsg(null), 3000);
  };

  const handleAddCert = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCert.title) return;

    const created: VerifiedCertificate = {
      id: `cert-${Date.now()}`,
      title: newCert.title,
      organization: newCert.organization || 'KTÜN Kariyer Merkezi',
      issueDate: 'Ağustos 2026',
      credentialId: newCert.credentialId || `KTUN-${Date.now()}`,
      pdfFileName: newCert.pdfFile ? newCert.pdfFile.name : `${newCert.title.replace(/\s+/g, '_')}.pdf`,
      pdfUrl: '#',
    };

    setCertificates([created, ...certificates]);
    setIsCertModalOpen(false);
    setNewCert({ title: '', organization: '', credentialId: '', pdfFile: null });
    setSuccessMsg('Sertifikanız belgesiyle birlikte başarıyla eklendi.');
    setTimeout(() => setSuccessMsg(null), 3000);
  };

  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-8">
      {/* Top Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
        <div>
          <h2 className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-tight flex items-center gap-2">
            <Code2 className="w-5 h-5 text-burgundy-700" />
            <span>Öğrenci Proje Portfolyosu & Sertifika Vitrini</span>
          </h2>
          <p className="text-xs text-slate-500 font-medium">
            Mühendislik projelerinizi, GitHub repolarınızı ve sertifikalarınızı sanayi temsilcilerine sunun.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            leftIcon={<Award className="w-4 h-4" />}
            onClick={() => setIsCertModalOpen(true)}
          >
            Sertifika Ekle
          </Button>
          <Button
            variant="primary"
            size="sm"
            leftIcon={<Plus className="w-4 h-4" />}
            onClick={() => setIsProjectModalOpen(true)}
            className="bg-burgundy-700 hover:bg-burgundy-800 font-bold"
          >
            Yeni Proje Ekle
          </Button>
        </div>
      </div>

      {successMsg && (
        <Alert variant="success" title="İşlem Başarılı">
          {successMsg}
        </Alert>
      )}

      {/* Feature 5.1: Project Showcase Grid */}
      <div className="space-y-4">
        <h3 className="text-sm font-extrabold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
          <Layers className="w-4 h-4 text-burgundy-700" />
          <span>Sergilenen Teknik Projeler ({projects.length})</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((p) => (
            <div
              key={p.id}
              onClick={() => setSelectedProject(p)}
              className="bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xs hover:shadow-md transition-all cursor-pointer p-6 flex flex-col justify-between group space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-extrabold uppercase text-burgundy-700 dark:text-burgundy-400 bg-burgundy-50 dark:bg-burgundy-950 px-2.5 py-1 rounded-md">
                    {p.category}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-bold text-burgundy-700 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Eye className="w-3.5 h-3.5" /> Detayları Gör
                    </span>
                    <button
                      type="button"
                      onClick={(e) => handleDeleteProject(p.id, e)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/50 transition-colors"
                      title="Projeyi Sil"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <h4 className="text-base font-extrabold text-slate-900 dark:text-white leading-snug group-hover:text-burgundy-700 transition-colors">
                  {p.title}
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 font-medium leading-relaxed line-clamp-3">
                  {p.description}
                </p>

                <div className="flex flex-wrap gap-1.5 pt-2">
                  {p.technologies.map((tech, idx) => (
                    <span key={idx} className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-900 text-[11px] font-bold text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Links Bar */}
              <div className="pt-4 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between text-xs">
                <a
                  href={p.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="font-bold text-slate-700 dark:text-slate-300 hover:text-burgundy-700 flex items-center gap-1.5"
                >
                  <GitBranch className="w-4 h-4 text-burgundy-700" /> GitHub Repo
                </a>
                {p.liveDemoUrl && (
                  <a
                    href={p.liveDemoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="font-bold text-burgundy-700 dark:text-burgundy-400 hover:underline flex items-center gap-1"
                  >
                    <Globe className="w-4 h-4" /> Live Demo <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Verified Certificates Showcase */}
      <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
        <h3 className="text-sm font-extrabold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
          <Award className="w-4 h-4 text-burgundy-700" />
          <span>Sertifikalar & Belgeler ({certificates.length})</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {certificates.map((cert) => (
            <div
              key={cert.id}
              className="p-5 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-200 dark:border-slate-700 flex flex-col justify-between gap-4 text-xs group"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <h4 className="font-extrabold text-slate-900 dark:text-white text-sm">{cert.title}</h4>
                  <p className="text-slate-500 font-semibold">{cert.organization} • {cert.issueDate}</p>
                  {cert.credentialId && <p className="text-[10px] font-mono text-slate-400">Kimlik: {cert.credentialId}</p>}
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  <FileCheck className="w-6 h-6 text-burgundy-700" />
                  <button
                    type="button"
                    onClick={() => handleDeleteCert(cert.id)}
                    className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/50 transition-colors"
                    title="Sertifikayı Sil"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {cert.pdfFileName && (
                <div className="pt-3 border-t border-slate-200 dark:border-slate-700/60 flex items-center justify-between">
                  <span className="text-[11px] font-medium text-slate-600 dark:text-slate-400 flex items-center gap-1.5 truncate max-w-[200px]" title={cert.pdfFileName}>
                    <FileText className="w-3.5 h-3.5 text-burgundy-700 shrink-0" />
                    <span className="truncate">{cert.pdfFileName}</span>
                  </span>
                  <a
                    href={cert.pdfUrl || '#'}
                    download={cert.pdfFileName}
                    className="px-3 py-1.5 bg-burgundy-700 hover:bg-burgundy-800 text-white font-bold rounded-xl text-xs inline-flex items-center gap-1.5 transition-colors shadow-2xs shrink-0"
                  >
                    <Download className="w-3.5 h-3.5" /> PDF İndir / Önizle
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Project Detail Popup Modal */}
      <Modal
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
        title={selectedProject?.title || 'Proje Detayı'}
        size="lg"
      >
        {selectedProject && (
          <div className="space-y-6 py-2">
            <div className="space-y-3">
              <span className="text-xs font-extrabold uppercase tracking-wider text-burgundy-700 dark:text-burgundy-400 bg-burgundy-50 dark:bg-burgundy-950 px-2.5 py-1 rounded-md">
                {selectedProject.category}
              </span>

              <h3 className="text-xl font-black text-slate-900 dark:text-white leading-tight">
                {selectedProject.title}
              </h3>

              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-medium leading-relaxed pt-1">
                {selectedProject.description}
              </p>
            </div>

            <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">Kullanılan Teknolojiler & Kütüphaneler</h4>
              <div className="flex flex-wrap gap-2">
                {selectedProject.technologies.map((tech, idx) => (
                  <span key={idx} className="px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <a
                  href={selectedProject.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-slate-900 text-white rounded-xl font-bold text-xs flex items-center gap-2 hover:bg-slate-800 transition-colors"
                >
                  <GitBranch className="w-4 h-4" /> GitHub Repository
                </a>
                {selectedProject.liveDemoUrl && (
                  <a
                    href={selectedProject.liveDemoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-burgundy-700 text-white rounded-xl font-bold text-xs flex items-center gap-2 hover:bg-burgundy-800 transition-colors"
                  >
                    <Globe className="w-4 h-4" /> Canlı Demo <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => handleDeleteProject(selectedProject.id)}
                className="text-rose-600 border-rose-200 hover:bg-rose-50"
                leftIcon={<Trash2 className="w-4 h-4" />}
              >
                Projeyi Sil
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* Add Project Modal */}
      <Modal
        isOpen={isProjectModalOpen}
        onClose={() => setIsProjectModalOpen(false)}
        title="Yeni Portfolyo Projesi Ekle"
        size="md"
      >
        <form onSubmit={handleAddProject} className="space-y-4 py-2">
          <Input
            label="Proje Adı *"
            value={newProj.title}
            onChange={(e) => setNewProj({ ...newProj, title: e.target.value })}
            placeholder="Örn: TEKNOFEST İHA Otonom Seyir Yazılımı"
            required
          />
          <Input
            label="Kategori / Alan"
            value={newProj.category}
            onChange={(e) => setNewProj({ ...newProj, category: e.target.value })}
            placeholder="Örn: Otonom Sistemler & C++"
          />
          <Input
            label="GitHub Repository Linki"
            value={newProj.githubUrl}
            onChange={(e) => setNewProj({ ...newProj, githubUrl: e.target.value })}
            placeholder="https://github.com/kullanici/repo"
          />
          <Input
            label="Canlı Demo / Web Linki"
            value={newProj.liveDemoUrl}
            onChange={(e) => setNewProj({ ...newProj, liveDemoUrl: e.target.value })}
            placeholder="https://demo.ktun.edu.tr"
          />
          <Input
            label="Kullanılan Teknolojiler (Virgülle Ayırın) *"
            value={newProj.technologies}
            onChange={(e) => setNewProj({ ...newProj, technologies: e.target.value })}
            placeholder="C++20, ROS2, OpenCV, Docker"
            required
          />
          <div className="space-y-1">
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Proje Açıklaması *
            </label>
            <textarea
              rows={3}
              value={newProj.description}
              onChange={(e) => setNewProj({ ...newProj, description: e.target.value })}
              placeholder="Projenin teknik detayları, mimarisi ve sağladığı çözümleri açıklayın..."
              className="w-full p-3 text-xs bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-burgundy-700/20"
              required
            />
          </div>

          <div className="flex justify-end gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
            <Button variant="secondary" onClick={() => setIsProjectModalOpen(false)}>
              İptal
            </Button>
            <Button variant="primary" type="submit" leftIcon={<Send className="w-4 h-4" />} className="bg-burgundy-700 hover:bg-burgundy-800 font-bold">
              Projeyi Kaydet
            </Button>
          </div>
        </form>
      </Modal>

      {/* Add Certificate Modal */}
      <Modal
        isOpen={isCertModalOpen}
        onClose={() => setIsCertModalOpen(false)}
        title="Yeni Sertifika & Belge Ekle"
        size="md"
      >
        <form onSubmit={handleAddCert} className="space-y-4 py-2">
          <Input
            label="Sertifika Başlığı *"
            value={newCert.title}
            onChange={(e) => setNewCert({ ...newCert, title: e.target.value })}
            placeholder="Örn: ASELSAN Aday Mühendislik Sertifikası"
            required
          />
          <Input
            label="Düzenleyen Kurum *"
            value={newCert.organization}
            onChange={(e) => setNewCert({ ...newCert, organization: e.target.value })}
            placeholder="ASELSAN / TÜBİTAK / KTÜN"
            required
          />
          <Input
            label="Sertifika Kimlik Numarası (Credential ID)"
            value={newCert.credentialId}
            onChange={(e) => setNewCert({ ...newCert, credentialId: e.target.value })}
            placeholder="ASELSAN-2026-XXXX"
          />

          <div className="space-y-1">
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Sertifika PDF Belgesi Yükle
            </label>
            <div className="p-4 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-2xl text-center space-y-2 bg-slate-50 dark:bg-slate-800/40">
              <Upload className="w-6 h-6 text-burgundy-700 mx-auto" />
              <input
                type="file"
                accept=".pdf,.png,.jpg,.jpeg"
                onChange={(e) => setNewCert({ ...newCert, pdfFile: e.target.files ? e.target.files[0] : null })}
                className="text-xs text-slate-500 font-semibold w-full"
              />
              <p className="text-[10px] text-slate-400">PDF, PNG veya JPG belgesi seçiniz (Maks. 20MB).</p>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
            <Button variant="secondary" onClick={() => setIsCertModalOpen(false)}>
              İptal
            </Button>
            <Button variant="primary" type="submit" leftIcon={<Send className="w-4 h-4" />} className="bg-burgundy-700 hover:bg-burgundy-800 font-bold">
              Sertifikayı Yükle & Kaydet
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
