import React, { useState } from 'react';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { Alert } from '../../components/ui/Alert';
import { Badge } from '../../components/ui/Badge';
import { Users, Calendar, CheckCircle2, XCircle, ExternalLink } from 'lucide-react';

export interface Counselor {
  id: string;
  fullName: string;
  title: string;
  specialty: string;
  workingHours: string;
  officeLocation: string;
  teamsUrl: string;
  activeAppointmentsCount: number;
}

export interface CounselingAppointment {
  id: string;
  counselorId: string;
  counselorName: string;
  studentName: string;
  studentNumber: string;
  department: string;
  date: string;
  time: string;
  topic: string;
  status: 'Pending' | 'Approved' | 'Completed' | 'Cancelled';
  notes?: string;
}

export const CareerCounselingPool: React.FC = () => {
  const [counselors] = useState<Counselor[]>([
    {
      id: 'c-1',
      fullName: 'Dr. Öğr. Üyesi Mehmet Şahin',
      title: 'Kariyer Merkezi Müdürü & Danışman',
      specialty: 'Savunma Sanayii & Mühendislik Kariyer Planlaması',
      workingHours: 'Pazartesi - Çarşamba (10:00 - 16:00)',
      officeLocation: 'KTÜN Rektörlük Binası Z-12',
      teamsUrl: 'https://teams.microsoft.com/l/meetup-join/counselor-mehmet-sahin',
      activeAppointmentsCount: 4,
    },
    {
      id: 'c-2',
      fullName: 'Öğr. Gör. Zeynep Arslan',
      title: 'Kariyer Danışmanı & Yurt Dışı Eğitimi Uzmanı',
      specialty: 'Yurt Dışı Lisansüstü, Erasmus & Staj Danışmanlığı',
      workingHours: 'Salı - Perşembe (09:00 - 15:00)',
      officeLocation: 'KTÜN Mühendislik Fakültesi B-Blok 204',
      teamsUrl: 'https://teams.microsoft.com/l/meetup-join/counselor-zeynep-arslan',
      activeAppointmentsCount: 3,
    },
  ]);

  const [appointments, setAppointments] = useState<CounselingAppointment[]>([
    {
      id: 'app-101',
      counselorId: 'c-1',
      counselorName: 'Dr. Öğr. Üyesi Mehmet Şahin',
      studentName: 'Emre Tunç',
      studentNumber: '20120033001',
      department: 'Bilgisayar Mühendisliği',
      date: '24 Mayıs 2024',
      time: '10:30 - 11:00',
      topic: 'ASELSAN Aday Mühendislik Mülakat Simülasyonu & CV İnceleme',
      status: 'Approved',
      notes: 'Mülakat öncesi teknik projeleri gözden geçirilecek.',
    },
    {
      id: 'app-102',
      counselorId: 'c-2',
      counselorName: 'Öğr. Gör. Zeynep Arslan',
      studentName: 'Ayşe Yılmaz',
      studentNumber: '20120044002',
      department: 'Elektrik-Elektronik Mühendisliği',
      date: '25 Mayıs 2024',
      time: '14:00 - 14:30',
      topic: 'Almanya Yüksek Lisans & DAAD Burs Başvurusu',
      status: 'Pending',
    },
  ]);

  const [selectedApp, setSelectedApp] = useState<CounselingAppointment | null>(null);
  const [counselorNote, setCounselorNote] = useState('');
  const [alertMsg, setAlertMsg] = useState<string | null>(null);

  const handleApproveAppointment = (appId: string) => {
    setAppointments((prev) =>
      prev.map((a) => (a.id === appId ? { ...a, status: 'Approved', notes: counselorNote || a.notes } : a))
    );
    setAlertMsg('Randevu onaylandı ve öğrenciye onay e-postası / bildirimi iletildi.');
    setSelectedApp(null);
    setCounselorNote('');
    setTimeout(() => setAlertMsg(null), 4000);
  };

  const handleCancelAppointment = (appId: string) => {
    setAppointments((prev) =>
      prev.map((a) => (a.id === appId ? { ...a, status: 'Cancelled', notes: counselorNote || a.notes } : a))
    );
    setAlertMsg('Randevu iptal edildi.');
    setSelectedApp(null);
    setCounselorNote('');
    setTimeout(() => setAlertMsg(null), 4000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
        <div>
          <h2 className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-tight flex items-center gap-2">
            <Users className="w-5 h-5 text-burgundy-700" />
            <span>Kariyer Danışmanlığı & Öğrenci Randevu Sistemi</span>
          </h2>
          <p className="text-xs text-slate-500">
            Kariyer danışman kadrosunu yönetin, öğrenci randevu taleplerini onaylayın ve görüşme notları ekleyin.
          </p>
        </div>
      </div>

      {alertMsg && (
        <Alert variant="success" title="Randevu İşlemi">
          {alertMsg}
        </Alert>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {counselors.map((c) => (
          <div
            key={c.id}
            className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-3"
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">{c.fullName}</h3>
                <span className="text-xs font-semibold text-burgundy-700 block">{c.title}</span>
              </div>
              <span className="text-[10px] font-extrabold bg-navy-900 text-white px-2 py-0.5 rounded-full">
                {c.activeAppointmentsCount} Aktif Randevu
              </span>
            </div>

            <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl text-xs space-y-1 text-slate-600 dark:text-slate-300 border border-slate-100 dark:border-slate-800">
              <div>Uzmanlık: <strong className="text-slate-900 dark:text-white">{c.specialty}</strong></div>
              <div>Çalışma Saatleri: {c.workingHours}</div>
              <div>Ofis: {c.officeLocation}</div>
            </div>

            <div className="pt-2 flex justify-end">
              <a
                href={c.teamsUrl}
                target="_blank"
                rel="noreferrer"
                className="text-xs font-bold text-emerald-600 hover:underline flex items-center gap-1"
              >
                <span>Teams Odasına Git</span> <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-tight flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
          <Calendar className="w-4 h-4 text-burgundy-700" />
          <span>Bekleyen & Onaylanan Öğrenci Randevuları</span>
        </h3>

        <div className="space-y-3">
          {appointments.map((app) => (
            <div
              key={app.id}
              className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white">
                  <span>{app.studentName} ({app.studentNumber})</span>
                  <Badge variant={app.status === 'Approved' ? 'success' : app.status === 'Pending' ? 'warning' : 'secondary'} size="sm">
                    {app.status === 'Approved' ? '✓ Onaylandı' : app.status === 'Pending' ? 'Onay Bekliyor' : 'İptal'}
                  </Badge>
                </div>
                <div className="text-slate-500 font-medium">{app.department} — Danışman: <strong>{app.counselorName}</strong></div>
                <div className="text-burgundy-700 font-semibold">Konu: {app.topic}</div>
                <div className="text-[11px] text-slate-400">Tarih: {app.date} ({app.time})</div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSelectedApp(app);
                    setCounselorNote(app.notes || '');
                  }}
                >
                  Detay & İşlem Yap
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedApp && (
        <Modal
          isOpen={!!selectedApp}
          onClose={() => setSelectedApp(null)}
          title={`Randevu Detayı: ${selectedApp.studentName}`}
        >
          <div className="space-y-4 text-xs">
            <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl space-y-1.5 border">
              <p><strong>Öğrenci:</strong> {selectedApp.studentName} ({selectedApp.department})</p>
              <p><strong>Danışman:</strong> {selectedApp.counselorName}</p>
              <p><strong>Tarih & Saat:</strong> {selectedApp.date} - {selectedApp.time}</p>
              <p><strong>Görüşme Konusu:</strong> {selectedApp.topic}</p>
            </div>

            <div>
              <label className="font-bold block mb-1">Danışman Görüşme Notları</label>
              <textarea
                className="w-full p-2.5 rounded-lg border text-xs bg-white dark:bg-slate-900"
                rows={3}
                placeholder="Öğrenciyle yapılan görüşme çıktılarını ve tavsiyeleri buraya kaydedin..."
                value={counselorNote}
                onChange={(e) => setCounselorNote(e.target.value)}
              />
            </div>

            <div className="pt-3 border-t flex justify-end gap-2">
              <Button
                variant="outline"
                size="sm"
                className="border-red-600 text-red-600 hover:bg-red-600 hover:text-white"
                onClick={() => handleCancelAppointment(selectedApp.id)}
                leftIcon={<XCircle className="w-4 h-4" />}
              >
                Randevuyu İptal Et
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => handleApproveAppointment(selectedApp.id)}
                leftIcon={<CheckCircle2 className="w-4 h-4" />}
              >
                Randevuyu Onayla & Notu Kaydet
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
