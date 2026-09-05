import React, { useState } from 'react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Alert } from '../../components/ui/Alert';
import { Mail, Save } from 'lucide-react';

export interface EmailTemplate {
  id: string;
  code: string;
  name: string;
  subject: string;
  body: string;
  placeholders: string[];
}

export const EmailTemplateCenter: React.FC = () => {
  const [templates, setTemplates] = useState<EmailTemplate[]>([
    {
      id: 'tmpl-1',
      code: 'EMPLOYER_APPROVED',
      name: 'İşveren Firma Onayı E-postası',
      subject: 'Tebrikler! KTÜN Kariyer Portalı İşveren Hesabınız Onaylandı',
      body: 'Sayın {{AuthorizedPerson}},\n\n{{CompanyName}} kurumsal kaydınız ve vergi levhanız Kariyer Merkezi tarafından incelenmiş ve onaylanmıştır. Artık ilan oluşturabilirsiniz.',
      placeholders: ['{{AuthorizedPerson}}', '{{CompanyName}}', '{{ApprovalDate}}'],
    },
    {
      id: 'tmpl-2',
      code: 'INTERVIEW_INVITATION',
      name: 'Mülakat Davet E-postası',
      subject: 'Mülakat Çağrısı: {{JobTitle}} — {{CompanyName}}',
      body: 'Sayın {{StudentName}},\n\n{{CompanyName}} bünyesindeki {{JobTitle}} ilanınız için {{InterviewDate}} tarihinde online mülakata davet edildiniz.\n\nTeams Linki: {{TeamsUrl}}',
      placeholders: ['{{StudentName}}', '{{CompanyName}}', '{{JobTitle}}', '{{InterviewDate}}', '{{TeamsUrl}}'],
    },
    {
      id: 'tmpl-3',
      code: 'APPLICATION_SUBMITTED',
      name: 'İlan Başvurusu Alındı Bildirimi',
      subject: 'Başvurunuz Alındı: {{JobTitle}}',
      body: 'Sayın {{StudentName}},\n\n{{JobTitle}} pozisyonuna yaptığınız başvuru işverene ulaştırılmıştır. ATS sürecinizi portal üzerinden takip edebilirsiniz.',
      placeholders: ['{{StudentName}}', '{{JobTitle}}', '{{CompanyName}}'],
    },
  ]);

  const [selectedTmpl, setSelectedTmpl] = useState<EmailTemplate>(templates[0]);
  const [savedMsg, setSavedMsg] = useState(false);

  const handleSaveTemplate = (e: React.FormEvent) => {
    e.preventDefault();
    setTemplates((prev) => prev.map((t) => (t.id === selectedTmpl.id ? selectedTmpl : t)));
    setSavedMsg(true);
    setTimeout(() => setSavedMsg(false), 3000);
  };

  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
        <div>
          <h2 className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-tight flex items-center gap-2">
            <Mail className="w-5 h-5 text-burgundy-700" />
            <span>Kurumsal E-Posta Şablon Yönetim Merkezi</span>
          </h2>
          <p className="text-xs text-slate-500">
            Sistem tarafından gönderilen tüm onay, davet, parola sıfırlama ve duyuru e-posta şablonlarını düzenleyin.
          </p>
        </div>
      </div>

      {savedMsg && (
        <Alert variant="success" title="Şablon Kaydedildi">
          E-posta şablonu güncellendi ve canlı bildirim servisine aktarıldı.
        </Alert>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-2">
          <label className="font-bold text-xs text-slate-400 uppercase tracking-wider block">Sistem E-Posta Şablonları:</label>
          {templates.map((tmpl) => (
            <div
              key={tmpl.id}
              onClick={() => setSelectedTmpl(tmpl)}
              className={`p-3 rounded-xl cursor-pointer border text-xs space-y-1 transition-colors ${
                selectedTmpl.id === tmpl.id
                  ? 'bg-burgundy-50 dark:bg-burgundy-950/40 border-burgundy-700 dark:border-burgundy-900 font-bold'
                  : 'bg-slate-50 dark:bg-slate-800/40 border-transparent hover:bg-slate-100'
              }`}
            >
              <div className="text-slate-900 dark:text-white line-clamp-1">{tmpl.name}</div>
              <span className="text-[10px] font-mono text-slate-400 block">{tmpl.code}</span>
            </div>
          ))}
        </div>

        <form onSubmit={handleSaveTemplate} className="md:col-span-2 space-y-4 text-xs">
          <Input
            label="Şablon Adı"
            value={selectedTmpl.name}
            onChange={(e) => setSelectedTmpl({ ...selectedTmpl, name: e.target.value })}
          />

          <Input
            label="E-Posta Konu Satırı (Subject Line)"
            value={selectedTmpl.subject}
            onChange={(e) => setSelectedTmpl({ ...selectedTmpl, subject: e.target.value })}
          />

          <div>
            <label className="font-bold block mb-1">E-Posta Gövde Metni (HTML / Markdown)</label>
            <textarea
              className="w-full p-3 rounded-xl border text-xs bg-white dark:bg-slate-900 font-mono leading-relaxed"
              rows={8}
              value={selectedTmpl.body}
              onChange={(e) => setSelectedTmpl({ ...selectedTmpl, body: e.target.value })}
            />
          </div>

          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border space-y-1">
            <span className="text-[10px] font-bold uppercase text-slate-400 block">Kullanılabilir Değişkenler (Placeholders):</span>
            <div className="flex flex-wrap gap-1.5">
              {selectedTmpl.placeholders.map((ph, idx) => (
                <span key={idx} className="bg-white dark:bg-slate-900 text-burgundy-700 text-[10px] font-mono font-bold px-2 py-0.5 rounded border">
                  {ph}
                </span>
              ))}
            </div>
          </div>

          <Button type="submit" variant="primary" size="md" leftIcon={<Save className="w-4 h-4" />}>
            Şablon Değişikliklerini Kaydet
          </Button>
        </form>
      </div>
    </div>
  );
};
