import React, { useState } from 'react';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';
import { Alert } from '../../components/ui/Alert';
import {
  Award,
  CheckCircle2,
  XCircle,
  Calendar,
  Video,
  Star,
  Users,
  Clock,
  Send,
  Info,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export interface AlumniMentor {
  id: string;
  name: string;
  graduationYear: string;
  company: string;
  position: string;
  department: string;
  rating: number;
  sessionCount: number;
  skills: string[];
  availableSlots: string[];
  avatar: string;
}

export interface MentorshipRequest {
  id: string;
  mentorName: string;
  mentorCompany: string;
  mentorPosition: string;
  studentName: string;
  studentDepartment: string;
  topic: string;
  requestDate: string;
  scheduledTime: string;
  meetingNote: string;
  status: 'Pending' | 'Approved' | 'Rejected';
}

export const MentorshipPlatform: React.FC = () => {
  const { user } = useAuth();

  const [mentors] = useState<AlumniMentor[]>([
    {
      id: 'm-1',
      name: 'Ahmet Yılmaz',
      graduationYear: '2022',
      company: 'ASELSAN Konya',
      position: 'Kıdemli Gömülü C++ Mühendisi',
      department: 'Bilgisayar Mühendisliği',
      rating: 4.9,
      sessionCount: 28,
      skills: ['C++20', 'RTOS', 'Gömülü Yazılım', 'Mülakat Prova'],
      availableSlots: ['Çarşamba 14:00 - 15:00', 'Cuma 16:30 - 17:30'],
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    },
    {
      id: 'm-2',
      name: 'Selin Arslan',
      graduationYear: '2021',
      company: 'SIEMENS AG Münih',
      position: 'Güç Sistemleri & Yazılım Uzmanı',
      department: 'Elektrik-Elektronik Mühendisliği',
      rating: 5.0,
      sessionCount: 34,
      skills: ['Almanya Yüksek Lisans', 'Yazılım', 'İngilizce Mülakat'],
      availableSlots: ['Perşembe 18:00 - 19:00', 'Cumartesi 11:00 - 12:00'],
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80',
    },
    {
      id: 'm-3',
      name: 'Burak Demir',
      graduationYear: '2020',
      company: 'HAVELSAN',
      position: 'Otonom Sistemler Lider Mühendisi',
      department: 'Bilgisayar Mühendisliği',
      rating: 4.8,
      sessionCount: 19,
      skills: ['ROS2', 'Python', 'Otonom İHA', 'TEKNOFEST Danışmanlığı'],
      availableSlots: ['Salı 17:00 - 18:00', 'Cuma 15:00 - 16:00'],
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    },
  ]);

  const [requests, setRequests] = useState<MentorshipRequest[]>([
    {
      id: 'ment-1',
      mentorName: 'Ahmet Yılmaz (2022 Mezunu)',
      mentorCompany: 'ASELSAN Konya A.Ş.',
      mentorPosition: 'Kıdemli Gömülü C++ Mühendisi',
      studentName: 'Emre Tunç',
      studentDepartment: 'Bilgisayar Mühendisliği (4. Sınıf)',
      topic: 'Savunma Sanayii Gömülü Yazılım Kariyer Rehberliği & C++ Kod İnceleme',
      requestDate: '05 Ağustos 2026',
      scheduledTime: 'Çarşamba 14:00 - 15:00',
      meetingNote: 'Toplantı bağlantısı onay sonrası oluşturulacaktır.',
      status: 'Approved',
    },
  ]);

  const [selectedMentor, setSelectedMentor] = useState<AlumniMentor | null>(null);
  const [selectedSlot, setSelectedSlot] = useState('');
  const [topic, setTopic] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const isMentorAlreadyBooked = (mentorName: string) => {
    return requests.some(
      (r) => r.mentorName.includes(mentorName) && (r.status === 'Approved' || r.status === 'Pending')
    );
  };

  const handleCreateBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMentor || !selectedSlot) return;

    if (isMentorAlreadyBooked(selectedMentor.name)) {
      return;
    }

    const newReq: MentorshipRequest = {
      id: `ment-${Date.now()}`,
      mentorName: `${selectedMentor.name} (${selectedMentor.graduationYear} Mezunu)`,
      mentorCompany: selectedMentor.company,
      mentorPosition: selectedMentor.position,
      studentName: user?.fullName || 'Emre Tunç',
      studentDepartment: user?.department || 'Bilgisayar Mühendisliği',
      topic: topic || 'Genel Kariyer Rehberliği ve Mülakat Danışmanlığı',
      requestDate: '05 Ağustos 2026',
      scheduledTime: selectedSlot,
      meetingNote: 'Toplantı bağlantısı onay sonrası oluşturulacaktır.',
      status: 'Approved',
    };

    setRequests([newReq, ...requests]);
    setBookingSuccess(true);
    setTimeout(() => {
      setBookingSuccess(false);
      setSelectedMentor(null);
    }, 1800);
  };

  const handleApprove = (id: string) => {
    setRequests((prev) => prev.map((r) => (r.id === id ? { ...r, status: 'Approved' } : r)));
  };

  const handleReject = (id: string) => {
    setRequests((prev) => prev.map((r) => (r.id === id ? { ...r, status: 'Rejected' } : r)));
  };

  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-8">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
        <div>
          <h2 className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-tight flex items-center gap-2">
            <Award className="w-5 h-5 text-burgundy-700" />
            <span>Mezun & Öğrenci Mentorluk Ağı (Alumni Mentorship Engine)</span>
          </h2>
          <p className="text-xs text-slate-500">
            Lider sanayi kuruluşlarındaki KTÜN mezunları ile lisans öğrencilerinin birebir (1-on-1) uzaktan mentörlük görüşmelerini yönetin.
          </p>
        </div>
        <span className="text-xs font-bold text-burgundy-700 bg-burgundy-50 dark:bg-burgundy-950 px-3 py-1 rounded-full border border-burgundy-200 flex items-center gap-1">
          <Users className="w-4 h-4" /> 340 Aktif Mezun Mentor
        </span>
      </div>

      {/* Available Alumni Mentors Directory */}
      <div className="space-y-4">
        <h3 className="text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-2 uppercase tracking-wider">
          <Calendar className="w-4 h-4 text-burgundy-700" />
          <span>Birebir Görüşmeye Açık KTÜN Mezun Mentorları</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {mentors.map((m) => {
            const isBooked = isMentorAlreadyBooked(m.name);

            return (
              <div
                key={m.id}
                className="p-6 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xs space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <img src={m.avatar} alt={m.name} className="w-12 h-12 rounded-full object-cover border-2 border-burgundy-700/30" />
                    <div>
                      <h4 className="text-sm font-extrabold text-slate-900 dark:text-white">{m.name}</h4>
                      <p className="text-xs text-burgundy-700 font-bold">{m.position}</p>
                      <p className="text-[11px] text-slate-400 font-medium">{m.company} • KTÜN {m.graduationYear}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-xs font-bold text-slate-700 dark:text-slate-300 pt-1">
                    <span className="flex items-center gap-1 text-amber-500">
                      <Star className="w-3.5 h-3.5 fill-current" /> {m.rating}
                    </span>
                    <span>•</span>
                    <span>{m.sessionCount} Tamamlanan Oturum</span>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {m.skills.map((sk, idx) => (
                      <span key={idx} className="px-2 py-0.5 rounded bg-white dark:bg-slate-900 text-[10px] font-bold text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                        {sk}
                      </span>
                    ))}
                  </div>
                </div>

                {isBooked ? (
                  <Button
                    variant="secondary"
                    size="sm"
                    fullWidth
                    disabled
                    leftIcon={<CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                  >
                    Zaten Randevu Alındı
                  </Button>
                ) : (
                  <Button
                    variant="primary"
                    size="sm"
                    fullWidth
                    leftIcon={<Video className="w-4 h-4" />}
                    onClick={() => {
                      setSelectedMentor(m);
                      setSelectedSlot(m.availableSlots[0]);
                      setTopic('');
                    }}
                    className="bg-burgundy-700 hover:bg-burgundy-800 font-bold"
                  >
                    1-on-1 Randevu Al
                  </Button>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Active Mentorship Requests List */}
      <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
        <h3 className="text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-2 uppercase tracking-wider">
          <Clock className="w-4 h-4 text-burgundy-700" />
          <span>Randevu Alınmış Mentorluk Oturumları</span>
        </h3>

        <div className="space-y-4">
          {requests.map((req) => (
            <div
              key={req.id}
              className="p-5 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-3 text-xs"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-700 pb-3">
                <div>
                  <span className="font-bold text-slate-900 dark:text-white text-sm block">
                    Öğrenci: {req.studentName} ({req.studentDepartment})
                  </span>
                  <span className="text-burgundy-700 font-semibold block mt-0.5">
                    Mentor: {req.mentorName} • {req.mentorCompany} ({req.mentorPosition})
                  </span>
                </div>
                <Badge variant={req.status === 'Approved' ? 'success' : req.status === 'Pending' ? 'warning' : 'error'}>
                  {req.status === 'Approved' ? 'Onaylandı' : req.status === 'Pending' ? 'Onay Bekliyor' : 'Reddedildi'}
                </Badge>
              </div>

              <div className="space-y-2">
                <p className="text-slate-700 dark:text-slate-300 font-medium">
                  <strong>Görüşme Konusu:</strong> {req.topic}
                </p>
                <div className="flex flex-wrap items-center gap-4 text-slate-500 font-semibold">
                  <span>📅 Zaman: {req.scheduledTime}</span>
                  <span>🗓️ Talep Tarihi: {req.requestDate}</span>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center gap-2 text-slate-600 dark:text-slate-300 text-xs">
                  <Info className="w-4 h-4 text-burgundy-700 shrink-0" />
                  <span>{req.meetingNote}</span>
                </div>
              </div>

              {req.status === 'Pending' && (
                <div className="flex gap-2 pt-2 border-t border-slate-200 dark:border-slate-700">
                  <Button size="sm" variant="secondary" onClick={() => handleApprove(req.id)} leftIcon={<CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}>
                    Onayla
                  </Button>
                  <Button size="sm" variant="ghost" onClick={() => handleReject(req.id)} leftIcon={<XCircle className="w-3.5 h-3.5 text-red-600" />}>
                    Reddet
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Booking Modal */}
      <Modal
        isOpen={!!selectedMentor}
        onClose={() => setSelectedMentor(null)}
        title="Mezun Mentör Birebir Randevusu Al"
        size="md"
      >
        {selectedMentor && (
          <form onSubmit={handleCreateBooking} className="space-y-5 py-2">
            {bookingSuccess && (
              <Alert variant="success" title="Randevu İletildi!">
                Mentörlük oturum talebiniz mentöre iletildi.
              </Alert>
            )}

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center gap-3">
              <img src={selectedMentor.avatar} alt={selectedMentor.name} className="w-10 h-10 rounded-full object-cover" />
              <div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white">{selectedMentor.name}</h4>
                <p className="text-[11px] text-burgundy-700 font-semibold">{selectedMentor.company} • {selectedMentor.position}</p>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                Uygun Saat Dilimi Seçin *
              </label>
              <select
                value={selectedSlot}
                onChange={(e) => setSelectedSlot(e.target.value)}
                className="w-full p-2.5 text-xs bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-burgundy-700/20 font-bold"
              >
                {selectedMentor.availableSlots.map((slot, idx) => (
                  <option key={idx} value={slot}>
                    {slot}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                Görüşme Konusu & Sorularınız *
              </label>
              <textarea
                rows={3}
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="Örn: C++ gömülü yazılım projelerimin incelenmesi ve savunma sanayii İK mülakat tavsiyeleri."
                className="w-full p-3 text-xs bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-burgundy-700/20"
                required
              />
            </div>

            <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center gap-2 text-slate-600 dark:text-slate-300 text-xs">
              <Info className="w-4 h-4 text-burgundy-700 shrink-0" />
              <span>Toplantı bağlantısı onay sonrası oluşturulacaktır.</span>
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
              <Button variant="secondary" onClick={() => setSelectedMentor(null)}>
                İptal
              </Button>
              <Button variant="primary" type="submit" leftIcon={<Send className="w-4 h-4" />} className="bg-burgundy-700 hover:bg-burgundy-800 font-bold">
                Randevuyu Onayla
              </Button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
};
