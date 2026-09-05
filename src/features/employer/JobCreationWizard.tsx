import React, { useState } from 'react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Alert } from '../../components/ui/Alert';
import { Checkbox } from '../../components/ui/Checkbox';
import { Select } from '../../components/ui/Select';
import { Plus, Trash2, Send, ArrowRight, ArrowLeft, Briefcase, CheckCircle2 } from 'lucide-react';
import { useWorkflow } from '../../context/WorkflowContext';

export const JobCreationWizard: React.FC<{ onComplete?: () => void }> = ({ onComplete }) => {
  const { createJobPosting } = useWorkflow();
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  const [formData, setFormData] = useState({
    title: '',
    postingType: 'İş İlanı',
    workplaceType: 'Yüz Yüze',
    employmentType: 'Tam Zamanlı',
    location: 'Konya / Selçuklu',
    salaryRange: '40.000 TL - 55.000 TL',
    deadlineDate: '2026-10-31',
    description: '',
    requirements: ['C++20 & RTOS Tecrübesi', 'GANO ≥ 3.00'],
    targetedDepartments: ['Bilgisayar Mühendisliği', 'Elektrik-Elektronik Mühendisliği'],
    customQuestions: ['İlgili alanda Teknofest / TÜBİTAK derece projeniz var mı?'],
  });

  const [newReq, setNewReq] = useState('');
  const [newQuestion, setNewQuestion] = useState('');
  const [alertMsg, setAlertMsg] = useState<string | null>(null);

  const availableDepartments = [
    'Bilgisayar Mühendisliği',
    'Elektrik-Elektronik Mühendisliği',
    'Makine Mühendisliği',
    'Endüstri Mühendisliği',
    'İnşaat Mühendisliği',
    'Harita Mühendisliği',
    'Kimya Mühendisliği',
    'Mimarlık',
  ];

  const handleAddRequirement = () => {
    if (newReq.trim()) {
      setFormData({ ...formData, requirements: [...formData.requirements, newReq.trim()] });
      setNewReq('');
    }
  };

  const handleAddQuestion = () => {
    if (newQuestion.trim()) {
      setFormData({ ...formData, customQuestions: [...formData.customQuestions, newQuestion.trim()] });
      setNewQuestion('');
    }
  };

  const toggleDepartment = (dept: string) => {
    const exists = formData.targetedDepartments.includes(dept);
    const updated = exists
      ? formData.targetedDepartments.filter((d) => d !== dept)
      : [...formData.targetedDepartments, dept];
    setFormData({ ...formData, targetedDepartments: updated });
  };

  const handleSubmitToModeration = () => {
    if (!formData.title.trim()) {
      setAlertMsg('Lütfen ilan başlığını doldurun.');
      return;
    }

    const computedWorkType = `${formData.postingType} • ${formData.employmentType} (${formData.workplaceType})`;

    createJobPosting({
      companyId: 'comp-1',
      title: formData.title,
      companyName: 'ASELSAN Konya Silah Sistemleri A.Ş.',
      location: formData.location,
      workType: computedWorkType,
      description: formData.description || 'Gömülü C++ ve Yazılım Geliştirme Pozisyonu',
      requirements: formData.requirements,
      targetedDepartments: formData.targetedDepartments,
      deadlineDate: formData.deadlineDate,
    });

    setAlertMsg('İlanınız Kariyer Merkezi moderasyon onay havuzuna başarıyla gönderildi.');
    if (onComplete) {
      setTimeout(() => onComplete(), 1500);
    }
  };

  const wizardSteps = [
    { num: 1, title: 'Pozisyon Bilgileri', desc: 'Başlık, ilan türü, çalışma şekli ve zamanı' },
    { num: 2, title: 'Nitelikler & Tanım', desc: 'İş tanımı ve aranan özellikler' },
    { num: 3, title: 'Bölümler & Sorular', desc: 'Hedef fakülteler ve özel mülakat soruları' },
    { num: 4, title: 'Önizleme & Gönderim', desc: 'Son kontrol ve moderasyon onayı' },
  ];

  return (
    <div className="bg-white dark:bg-slate-900 p-6 md:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-8 max-w-4xl mx-auto">
      {/* Wizard Header & Stepper Progress Bar */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-burgundy-700 text-white flex items-center justify-center font-bold">
            <Briefcase className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-tight">
              Kurumsal İlan Oluşturma Sihirbazı
            </h2>
            <p className="text-xs text-slate-500 font-medium">
              KTÜN öğrencilerine ve mezunlarına yönelik onaylı iş/staj ilanı yayınlayın.
            </p>
          </div>
        </div>

        {/* 4-Step Stepper Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
          {wizardSteps.map((s) => {
            const isActive = step === s.num;
            const isDone = step > s.num;

            return (
              <button
                key={s.num}
                type="button"
                onClick={() => isDone && setStep(s.num as any)}
                className={`p-3 rounded-xl text-left border transition-all ${
                  isActive
                    ? 'border-burgundy-700 bg-burgundy-50/50 dark:bg-slate-800 shadow-xs'
                    : isDone
                    ? 'border-emerald-200 bg-emerald-50/40 dark:bg-slate-800/40'
                    : 'border-slate-200 dark:border-slate-800 opacity-60'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span
                    className={`w-6 h-6 rounded-full font-bold text-xs flex items-center justify-center ${
                      isActive
                        ? 'bg-burgundy-700 text-white'
                        : isDone
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-200 text-slate-600 dark:bg-slate-700 dark:text-slate-300'
                    }`}
                  >
                    {isDone ? <CheckCircle2 className="w-4 h-4" /> : s.num}
                  </span>
                  <span className="text-xs font-bold text-slate-900 dark:text-white truncate">
                    {s.title}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {alertMsg && (
        <Alert variant={alertMsg.includes('başarıyla') ? 'success' : 'warning'} title="İşlem Durumu">
          {alertMsg}
        </Alert>
      )}

      {/* Step 1: Pozisyon Bilgileri */}
      {step === 1 && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="space-y-4">
            <Input
              label="İlan Başlığı *"
              placeholder="Örn: Gömülü Yazılım Mühendisi / Aday Mühendis"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              helperText="Öğrencilerin ve mezunların aramalarında görünecek net pozisyon unvanı."
              required
            />

            {/* İlan Türü & Çalışma Özellikleri 3-Kolon Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* 1. İlan Türü (İş / Staj) */}
              <Select
                label="İlan Türü *"
                value={formData.postingType}
                onChange={(e) => setFormData({ ...formData, postingType: e.target.value })}
                options={[
                  { value: 'İş İlanı', label: '💼 İş İlanı' },
                  { value: 'Staj İlanı', label: '🎓 Staj İlanı' },
                ]}
              />

              {/* 2. Çalışma Şekli (Yüz Yüze / Uzaktan) */}
              <Select
                label="Çalışma Şekli *"
                value={formData.workplaceType}
                onChange={(e) => setFormData({ ...formData, workplaceType: e.target.value })}
                options={[
                  { value: 'Yüz Yüze', label: '🏢 Yüz Yüze (Ofiste)' },
                  { value: 'Uzaktan', label: '🌐 Uzaktan (Remote)' },
                  { value: 'Hibrit', label: '🔄 Hibrit (Karma)' },
                ]}
              />

              {/* 3. Çalışma Zamanı (Tam Zamanlı / Yarı Zamanlı) */}
              <Select
                label="Çalışma Zamanı *"
                value={formData.employmentType}
                onChange={(e) => setFormData({ ...formData, employmentType: e.target.value })}
                options={[
                  { value: 'Tam Zamanlı', label: '⏱️ Tam Zamanlı' },
                  { value: 'Yarı Zamanlı', label: '⏳ Yarı Zamanlı' },
                ]}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Çalışma Konumu *"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="Örn: Konya / Selçuklu (OSB)"
              />

              <Input
                label="Maaş / Burs Skalası (Opsiyonel)"
                value={formData.salaryRange}
                onChange={(e) => setFormData({ ...formData, salaryRange: e.target.value })}
                placeholder="Örn: 40.000 TL - 55.000 TL"
              />
            </div>

            <div>
              <Input
                label="Son Başvuru Tarihi *"
                type="date"
                value={formData.deadlineDate}
                onChange={(e) => setFormData({ ...formData, deadlineDate: e.target.value })}
              />
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-slate-100 dark:border-slate-800">
            <Button
              variant="primary"
              onClick={() => {
                if (!formData.title.trim()) {
                  setAlertMsg('Lütfen ilan başlığını yazın.');
                  return;
                }
                setAlertMsg(null);
                setStep(2);
              }}
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Adım 2: Nitelikler & Tanım
            </Button>
          </div>
        </div>
      )}

      {/* Step 2: Nitelikler & Tanım */}
      {step === 2 && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                İş / Staj Detaylı Açıklaması *
              </label>
              <textarea
                rows={5}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Pozisyonun sorumluluklarını, çalışma ortamını ve sunulan imkanları detaylandırın..."
                className="w-full p-3 text-sm bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-burgundy-700/20 focus:border-burgundy-700 text-slate-900 dark:text-white"
              />
            </div>

            <div className="space-y-3">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                Aranan Nitelikler & Beceriler
              </label>
              <div className="flex gap-2">
                <Input
                  placeholder="Örn: C++20, ROS2 veya GANO ≥ 3.00"
                  value={newReq}
                  onChange={(e) => setNewReq(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddRequirement())}
                />
                <Button variant="secondary" onClick={handleAddRequirement} leftIcon={<Plus className="w-4 h-4" />}>
                  Ekle
                </Button>
              </div>

              <div className="flex flex-wrap gap-2 pt-2">
                {formData.requirements.map((req, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-bold border border-slate-200 dark:border-slate-700"
                  >
                    <span>{req}</span>
                    <button
                      type="button"
                      onClick={() =>
                        setFormData({
                          ...formData,
                          requirements: formData.requirements.filter((_, idx) => idx !== i),
                        })
                      }
                      className="text-slate-400 hover:text-red-600 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
            <Button variant="secondary" onClick={() => setStep(1)} leftIcon={<ArrowLeft className="w-4 h-4" />}>
              Geri
            </Button>
            <Button variant="primary" onClick={() => setStep(3)} rightIcon={<ArrowRight className="w-4 h-4" />}>
              Adım 3: Bölümler & Sorular
            </Button>
          </div>
        </div>
      )}

      {/* Step 3: Hedef Bölümler & Özel Sorular */}
      {step === 3 && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="space-y-6">
            <div className="space-y-3">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                Hedef KTÜN Mühendislik & Mimarlık Bölümleri
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {availableDepartments.map((dept) => {
                  const isChecked = formData.targetedDepartments.includes(dept);
                  return (
                    <div
                      key={dept}
                      onClick={() => toggleDepartment(dept)}
                      className={`p-3 rounded-xl border cursor-pointer transition-all ${
                        isChecked
                          ? 'border-burgundy-700 bg-burgundy-50/50 dark:bg-slate-800 font-bold text-burgundy-700 dark:text-burgundy-400'
                          : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      <Checkbox
                        label={dept}
                        checked={isChecked}
                        onChange={() => {}}
                      />
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="space-y-3">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                Ön Eleme / Mülakat Soruları (Opsiyonel)
              </label>
              <div className="flex gap-2">
                <Input
                  placeholder="Örn: TEKNOFEST veya TÜBİTAK dereceli projenizi açıklayın."
                  value={newQuestion}
                  onChange={(e) => setNewQuestion(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddQuestion())}
                />
                <Button variant="secondary" onClick={handleAddQuestion} leftIcon={<Plus className="w-4 h-4" />}>
                  Soru Ekle
                </Button>
              </div>

              <div className="space-y-2 pt-2">
                {formData.customQuestions.map((q, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold"
                  >
                    <span>{q}</span>
                    <button
                      type="button"
                      onClick={() =>
                        setFormData({
                          ...formData,
                          customQuestions: formData.customQuestions.filter((_, idx) => idx !== i),
                        })
                      }
                      className="text-slate-400 hover:text-red-600 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
            <Button variant="secondary" onClick={() => setStep(2)} leftIcon={<ArrowLeft className="w-4 h-4" />}>
              Geri
            </Button>
            <Button variant="primary" onClick={() => setStep(4)} rightIcon={<ArrowRight className="w-4 h-4" />}>
              Adım 4: Önizleme & Gönderim
            </Button>
          </div>
        </div>
      )}

      {/* Step 4: Önizleme & Moderasyon Gönderimi */}
      {step === 4 && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-4">
            <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
              {formData.title || 'Başlıksız İlan'}
            </h3>
            <div className="flex flex-wrap gap-2 text-xs font-bold">
              <span className="px-2.5 py-1 rounded-lg bg-burgundy-50 dark:bg-burgundy-950 text-burgundy-700 dark:text-burgundy-300 border border-burgundy-200 dark:border-burgundy-800">
                📋 {formData.postingType}
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                🏢 {formData.workplaceType}
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                ⏱️ {formData.employmentType}
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                📍 {formData.location}
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                💰 {formData.salaryRange}
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-amber-50 dark:bg-amber-950 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                ⏳ Son Başvuru: {formData.deadlineDate}
              </span>
            </div>

            <div className="space-y-2 pt-2 border-t border-slate-200 dark:border-slate-700">
              <span className="text-xs font-bold uppercase text-slate-500">Hedef Bölümler</span>
              <p className="text-xs font-medium text-slate-800 dark:text-slate-200">
                {formData.targetedDepartments.join(', ') || 'Tüm Mühendislik Bölümleri'}
              </p>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold uppercase text-slate-500">Aranan Nitelikler</span>
              <ul className="list-disc list-inside text-xs space-y-1 text-slate-700 dark:text-slate-300">
                {formData.requirements.map((r, i) => (
                  <li key={i}>{r}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
            <Button variant="secondary" onClick={() => setStep(3)} leftIcon={<ArrowLeft className="w-4 h-4" />}>
              Geri
            </Button>

            <Button
              variant="primary"
              onClick={handleSubmitToModeration}
              leftIcon={<Send className="w-4 h-4" />}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold"
            >
              Kariyer Merkezine Gönder (Moderasyon)
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
