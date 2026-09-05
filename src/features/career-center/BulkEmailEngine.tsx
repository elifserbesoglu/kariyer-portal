import React, { useState } from 'react';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Alert } from '../../components/ui/Alert';
import { Mail, Send, Filter, Users } from 'lucide-react';

export const BulkEmailEngine: React.FC = () => {
  const [targetDepartment, setTargetDepartment] = useState('Bilgisayar Mühendisliği');
  const [targetGrade, setTargetGrade] = useState('3. Sınıf');
  const [targetMinGpa, setTargetMinGpa] = useState('2.50');
  const [emailSubject, setEmailSubject] = useState('ASELSAN Konya Aday Mühendislik & Staj Başvurusu Duyurusu');
  const [emailBody, setEmailBody] = useState(
    'Değerli Öğrencimiz,\n\nBilgisayar Mühendisliği 3. sınıf öğrencilerimiz için ASELSAN Konya Aday Mühendislik programı başvuruları açılmıştır. GANO şartını sağlayan adayların Kariyer Portalı üzerinden başvurularını tamamlamaları rica olunur.'
  );

  const matchedRecipientCount = 142;
  const [sentAlert, setSentAlert] = useState(false);

  const handleSendBulkEmail = (e: React.FormEvent) => {
    e.preventDefault();
    setSentAlert(true);
    setTimeout(() => setSentAlert(false), 5000);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
        <div>
          <h2 className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-tight flex items-center gap-2">
            <span>Hedefli Toplu E-Posta Gönderim Motoru</span>
            <span className="text-[10px] font-extrabold bg-navy-900 text-white px-2.5 py-0.5 rounded-full">
              Kariyer Merkezi
            </span>
          </h2>
          <p className="text-xs text-slate-500">
            Bölüm, sınıf seviyesi ve GANO baraj kriterine göre filtrelenmiş KTÜN öğrencilerine toplu mail duyurusu iletin.
          </p>
        </div>
      </div>

      {sentAlert && (
        <Alert variant="success" title="E-Posta Gönderimi Başlatıldı">
          Filtrelenen <strong>{matchedRecipientCount} öğrenciye</strong> toplu e-posta gönderim işlemi Hangfire arka plan kuyruğuna eklendi.
        </Alert>
      )}

      <form onSubmit={handleSendBulkEmail} className="space-y-6">
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
            <Filter className="w-4 h-4 text-burgundy-700" />
            <span>Hedef Öğrenci Kriterleri</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-bold block mb-1">Hedef Bölüm</label>
              <select
                value={targetDepartment}
                onChange={(e) => setTargetDepartment(e.target.value)}
                className="w-full p-2.5 rounded-lg border text-xs bg-white dark:bg-slate-900 font-medium"
              >
                <option value="Bilgisayar Mühendisliği">Bilgisayar Mühendisliği</option>
                <option value="Elektrik-Elektronik Mühendisliği">Elektrik-Elektronik Mühendisliği</option>
                <option value="Makine Mühendisliği">Makine Mühendisliği</option>
                <option value="Endüstri Mühendisliği">Endüstri Mühendisliği</option>
                <option value="ALL">Tüm Bölümler</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold block mb-1">Sınıf Seviyesi</label>
              <select
                value={targetGrade}
                onChange={(e) => setTargetGrade(e.target.value)}
                className="w-full p-2.5 rounded-lg border text-xs bg-white dark:bg-slate-900 font-medium"
              >
                <option value="1. Sınıf">1. Sınıf</option>
                <option value="2. Sınıf">2. Sınıf</option>
                <option value="3. Sınıf">3. Sınıf</option>
                <option value="4. Sınıf">4. Sınıf</option>
                <option value="Mezun">Mezun</option>
                <option value="ALL">Tüm Sınıflar</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold block mb-1">Minimum GANO Barajı</label>
              <select
                value={targetMinGpa}
                onChange={(e) => setTargetMinGpa(e.target.value)}
                className="w-full p-2.5 rounded-lg border text-xs bg-white dark:bg-slate-900 font-medium"
              >
                <option value="2.00">GANO ≥ 2.00</option>
                <option value="2.50">GANO ≥ 2.50</option>
                <option value="3.00">GANO ≥ 3.00</option>
                <option value="3.50">GANO ≥ 3.50</option>
              </select>
            </div>
          </div>

          <div className="p-3 bg-burgundy-50 dark:bg-burgundy-950/40 rounded-xl border border-burgundy-200 text-xs flex items-center justify-between">
            <span className="font-bold text-burgundy-900 dark:text-burgundy-200 flex items-center gap-1.5">
              <Users className="w-4 h-4 text-burgundy-700" />
              <span>Eşleşen Hedef Öğrenci Sayısı:</span>
            </span>
            <span className="text-sm font-black text-burgundy-700 dark:text-burgundy-300">
              {matchedRecipientCount} Öğrenci
            </span>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
            <Mail className="w-4 h-4 text-burgundy-700" />
            <span>E-Posta Şablonu & İçerik</span>
          </h3>

          <Input
            label="E-Posta Konu Başlığı"
            required
            value={emailSubject}
            onChange={(e) => setEmailSubject(e.target.value)}
          />

          <div>
            <label className="text-xs font-bold block mb-1">E-Posta Metni</label>
            <textarea
              className="w-full p-3 rounded-lg border text-xs bg-white dark:bg-slate-900 leading-relaxed font-sans"
              rows={6}
              value={emailBody}
              onChange={(e) => setEmailBody(e.target.value)}
            />
          </div>
        </div>

        <Button
          type="submit"
          variant="primary"
          size="lg"
          leftIcon={<Send className="w-4 h-4" />}
        >
          {matchedRecipientCount} Öğrenciye Toplu Mail Gönder
        </Button>
      </form>
    </div>
  );
};
