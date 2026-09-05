import React, { useState } from 'react';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Checkbox } from '../../components/ui/Checkbox';
import { Alert } from '../../components/ui/Alert';
import { Target, Save } from 'lucide-react';

export const StudentCareerGoals: React.FC = () => {
  const [goals, setGoals] = useState({
    workTypeFullTime: true,
    workTypeInternship: true,
    workTypePartTime: false,
    workTypeRemote: true,
    locationDomestic: true,
    locationAbroad: true,
    preferredCities: 'Konya, Ankara, İstanbul',
    targetField: 'Otonom Sistemler, Gömülü C++ ve Gerçek Zamanlı Yazılım',
  });

  const [savedMsg, setSavedMsg] = useState(false);

  const handleSaveGoals = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedMsg(true);
    setTimeout(() => setSavedMsg(false), 3000);
  };

  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-6 max-w-4xl">
      <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-tight flex items-center gap-2">
          <Target className="w-4 h-4 text-burgundy-700" />
          <span>Kariyer Hedefleri & Çalışma Tercihleri</span>
        </h3>
      </div>

      {savedMsg && (
        <Alert variant="success" title="Hedefler Güncellendi">
          Kariyer tercihleriniz kaydedildi. Uygun ilanlar eşleştiğinde size özel bildirim gönderilecektir.
        </Alert>
      )}

      <form onSubmit={handleSaveGoals} className="space-y-6 text-xs">
        <div className="space-y-2">
          <label className="font-bold text-slate-900 dark:text-white block">Çalışma Tipi Tercihleri:</label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 dark:bg-slate-800/40 p-4 rounded-xl border">
            <Checkbox
              label="Tam Zamanlı (Full-Time)"
              checked={goals.workTypeFullTime}
              onChange={(e) => setGoals({ ...goals, workTypeFullTime: e.target.checked })}
            />
            <Checkbox
              label="Zorunlu / Gönüllü Staj"
              checked={goals.workTypeInternship}
              onChange={(e) => setGoals({ ...goals, workTypeInternship: e.target.checked })}
            />
            <Checkbox
              label="Yarı Zamanlı (Part-Time)"
              checked={goals.workTypePartTime}
              onChange={(e) => setGoals({ ...goals, workTypePartTime: e.target.checked })}
            />
            <Checkbox
              label="Uzaktan (Remote)"
              checked={goals.workTypeRemote}
              onChange={(e) => setGoals({ ...goals, workTypeRemote: e.target.checked })}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="font-bold text-slate-900 dark:text-white block mb-1">Lokasyon Kapsamı:</label>
            <div className="flex items-center gap-4 bg-slate-50 dark:bg-slate-800/40 p-3 rounded-xl border">
              <Checkbox
                label="Yurt İçi"
                checked={goals.locationDomestic}
                onChange={(e) => setGoals({ ...goals, locationDomestic: e.target.checked })}
              />
              <Checkbox
                label="Yurt Dışı Global"
                checked={goals.locationAbroad}
                onChange={(e) => setGoals({ ...goals, locationAbroad: e.target.checked })}
              />
            </div>
          </div>

          <Input
            label="Tercih Edilen Şehirler"
            value={goals.preferredCities}
            onChange={(e) => setGoals({ ...goals, preferredCities: e.target.value })}
          />
        </div>

        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <label className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[11px] block">
              Uzmanlaşmak İstenen Hedef Alan
            </label>
            <span className="text-xs text-slate-400 font-semibold">
              {goals.targetField?.length || 0} / 1000 Karakter
            </span>
          </div>
          <textarea
            rows={4}
            maxLength={1000}
            value={goals.targetField}
            onChange={(e) => setGoals({ ...goals, targetField: e.target.value })}
            placeholder="Uzmanlaşmak istediğiniz alanları, hedef sektörleri veya ilgilendiğiniz teknolojileri açıklayınız (maksimum 1000 karakter)..."
            className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl p-3 text-xs font-medium focus:ring-2 focus:ring-burgundy-500 outline-none text-slate-900 dark:text-white resize-y leading-relaxed"
          />
        </div>

        <Button type="submit" variant="primary" size="md" leftIcon={<Save className="w-4 h-4" />}>
          Kariyer Tercihlerini Kaydet
        </Button>
      </form>
    </div>
  );
};
