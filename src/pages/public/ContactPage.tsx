import React, { useState, useEffect } from 'react';
import { setPageTitle } from '../../utils/seo';
import { Breadcrumb } from '../../components/ui/Breadcrumb';
import { SectionTitle } from '../../components/ui/SectionTitle';
import { Input } from '../../components/ui/Input';
import { Textarea } from '../../components/ui/Textarea';
import { Button } from '../../components/ui/Button';
import { Checkbox } from '../../components/ui/Checkbox';
import { useToast } from '../../hooks/useToast';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { addToast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    kvkkApproved: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setPageTitle('İletişim', 'Konya Teknik Üniversitesi Kariyer Gelişim Merkezi iletişim bilgileri ve harita.');
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      addToast({ title: 'Eksik Alan', description: 'Lütfen zorunlu alanları doldurunuz.', variant: 'error' });
      return;
    }
    if (!formData.kvkkApproved) {
      addToast({ title: 'KVKK Onayı', description: 'Lütfen KVKK aydınlatma metnini onaylayınız.', variant: 'warning' });
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      addToast({
        title: 'Mesajınız Alındı',
        description: 'Talebiniz Kariyer Merkezimize iletilmiştir. En kısa sürede e-posta ile dönüş yapılacaktır.',
        variant: 'success',
      });
      setFormData({ name: '', email: '', subject: '', message: '', kvkkApproved: false });
    }, 1000);
  };

  return (
    <div className="space-y-8">
      <Breadcrumb items={[{ label: 'İletişim' }]} />

      <SectionTitle
        title="İletişim & Ulaşım"
        subtitle="Sorularınız, önerileriniz veya kurumsal iş birliği talepleriniz için bize ulaşın."
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Contact Info & Map */}
        <div className="space-y-6">
          <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white border-b pb-3">
              Merkez İletişim Bilgileri
            </h3>
            <div className="space-y-3.5 text-xs text-slate-700 dark:text-slate-300">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-burgundy-50 dark:bg-burgundy-950/50 text-burgundy-700 flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold block text-slate-900 dark:text-white">Adres</span>
                  <span>Akademi Mah. Yeni İstanbul Cad. No:369, 42130 Selçuklu / KONYA</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-burgundy-50 dark:bg-burgundy-950/50 text-burgundy-700 flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold block text-slate-900 dark:text-white">Telefon</span>
                  <span>+90 332 205 11 11</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-burgundy-50 dark:bg-burgundy-950/50 text-burgundy-700 flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold block text-slate-900 dark:text-white">E-Posta</span>
                  <span>kariyer@ktun.edu.tr</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-burgundy-50 dark:bg-burgundy-950/50 text-burgundy-700 flex items-center justify-center shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold block text-slate-900 dark:text-white">Çalışma Saatleri</span>
                  <span>Hafta İçi: 08:30 - 17:30</span>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Map */}
          <div className="p-4 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Haritada Yerimiz</h3>
            <div className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-800 h-52 flex flex-col items-center justify-center text-center p-4">
              <MapPin className="w-10 h-10 text-burgundy-700 animate-bounce mb-2" />
              <span className="text-sm font-bold text-slate-900 dark:text-white">KTÜN Gelişim Yerleşkesi</span>
              <p className="text-xs text-slate-500">Selçuklu / Konya</p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-2 p-6 md:p-8 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-4">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white border-b pb-3">İletişim Formu</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Ad Soyad"
                required
                placeholder="Adınız ve soyadınız..."
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
              <Input
                label="E-Posta Adresi"
                type="email"
                required
                placeholder="eposta@domain.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            <Input
              label="Konu / Başlık"
              placeholder="Mesajınızın konusu..."
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
            />

            <Textarea
              label="Mesajınız"
              required
              placeholder="Talebinizi detaylıca yazınız..."
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            />

            <Checkbox
              label="KVKK Aydınlatma Metnini okudum ve kişisel verilerimin işlenmesini kabul ediyorum."
              checked={formData.kvkkApproved}
              onChange={(e) => setFormData({ ...formData, kvkkApproved: e.target.checked })}
            />

            <Button
              type="submit"
              variant="primary"
              size="lg"
              isLoading={isSubmitting}
              leftIcon={<Send className="w-4 h-4" />}
            >
              Mesajı Gönder
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};
