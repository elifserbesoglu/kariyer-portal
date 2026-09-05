import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { setPageTitle } from '../../utils/seo';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { Button } from '../../components/ui/Button';
import { Checkbox } from '../../components/ui/Checkbox';
import { Alert } from '../../components/ui/Alert';
import { Tabs } from '../../components/ui/Tabs';
import { GraduationCap, Building2, UserPlus, ShieldAlert } from 'lucide-react';

export const RegisterPage: React.FC<{
  onNavigateLogin?: () => void;
  onNavigatePendingApproval?: () => void;
}> = ({ onNavigateLogin, onNavigatePendingApproval }) => {
  const { registerStudent, registerEmployer, isLoading } = useAuth();
  const [activeTab, setActiveTab] = useState('student');
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const [studentForm, setStudentForm] = useState({
    firstName: '',
    lastName: '',
    tcNo: '',
    studentNumber: '',
    email: '',
    faculty: 'Mühendislik ve Doğa Bilimleri Fakültesi',
    department: 'Bilgisayar Mühendisliği',
    grade: '3. Sınıf',
    password: '',
    kvkkApproved: false,
  });

  const [employerForm, setEmployerForm] = useState({
    companyName: '',
    taxNumber: '',
    authorizedPerson: '',
    phone: '',
    email: '',
    password: '',
    kvkkApproved: false,
  });

  useEffect(() => {
    setPageTitle('Kayıt Ol', 'KTÜN Kariyer Portalı Öğrenci ve İşveren Kayıt Ekranı.');
  }, []);

  const handleStudentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);

    if (!studentForm.firstName.trim() || !studentForm.lastName.trim()) {
      setError('Lütfen ad ve soyad alanlarını doldurunuz.');
      return;
    }

    if (studentForm.tcNo && !/^\d{11}$/.test(studentForm.tcNo)) {
      setError('T.C. Kimlik Numarası 11 haneli rakamlardan oluşmalıdır.');
      return;
    }

    if (!studentForm.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(studentForm.email)) {
      setError('Lütfen geçerli bir e-posta adresi giriniz.');
      return;
    }

    if (!studentForm.password || studentForm.password.length < 6) {
      setError('Şifreniz en az 6 karakter olmalıdır.');
      return;
    }

    if (!studentForm.kvkkApproved) {
      setError('Lütfen KVKK Aydınlatma Metnini onaylayınız.');
      return;
    }

    const result = await registerStudent({
      firstName: studentForm.firstName,
      lastName: studentForm.lastName,
      tcNo: studentForm.tcNo,
      studentNumber: studentForm.studentNumber,
      email: studentForm.email,
      faculty: studentForm.faculty,
      department: studentForm.department,
      grade: studentForm.grade,
      password: studentForm.password,
    });

    if (result.success) {
      setSuccessMsg('Öğrenci kaydınız başarıyla oluşturulmuştur. Giriş ekranına yönlendiriliyorsunuz...');
      setStudentForm({
        firstName: '',
        lastName: '',
        tcNo: '',
        studentNumber: '',
        email: '',
        faculty: 'Mühendislik ve Doğa Bilimleri Fakültesi',
        department: 'Bilgisayar Mühendisliği',
        grade: '3. Sınıf',
        password: '',
        kvkkApproved: false,
      });
      setTimeout(() => {
        if (onNavigateLogin) onNavigateLogin();
      }, 1500);
    } else {
      setError(result.error || 'Kayıt işlemi başarısız.');
    }
  };

  const handleEmployerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);

    if (!employerForm.companyName.trim()) {
      setError('Lütfen firma / kurum adını giriniz.');
      return;
    }

    if (employerForm.taxNumber && !/^\d{10}$/.test(employerForm.taxNumber)) {
      setError('Vergi Kimlik Numarası (VKN) 10 haneli rakamlardan oluşmalıdır.');
      return;
    }

    if (!employerForm.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(employerForm.email)) {
      setError('Lütfen geçerli bir kurumsal e-posta adresi giriniz.');
      return;
    }

    if (!employerForm.password || employerForm.password.length < 6) {
      setError('Şifreniz en az 6 karakter olmalıdır.');
      return;
    }

    if (!employerForm.kvkkApproved) {
      setError('Lütfen Kurumsal Veri İşleme Onayını kabul ediniz.');
      return;
    }

    const result = await registerEmployer({
      companyName: employerForm.companyName,
      taxNumber: employerForm.taxNumber,
      authorizedPerson: employerForm.authorizedPerson,
      phone: employerForm.phone,
      email: employerForm.email,
      password: employerForm.password,
    });

    if (result.success) {
      setSuccessMsg('İşveren kayıt başvurunuz alındı. Onay sürecine yönlendiriliyorsunuz...');
      setEmployerForm({
        companyName: '',
        taxNumber: '',
        authorizedPerson: '',
        phone: '',
        email: '',
        password: '',
        kvkkApproved: false,
      });
      setTimeout(() => {
        if (onNavigatePendingApproval) onNavigatePendingApproval();
      }, 1500);
    } else {
      setError(result.error || 'İşveren kaydı başarısız.');
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl w-full space-y-6">
        <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Yeni Hesap Oluştur
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Kariyer Portalına katılmak için hesap türünüzü seçiniz.
            </p>
          </div>

          <Tabs
            tabs={[
              { id: 'student', label: 'Öğrenci / Mezun Kaydı', icon: <GraduationCap className="w-4 h-4" /> },
              { id: 'employer', label: 'İşveren Kaydı', icon: <Building2 className="w-4 h-4" /> },
            ]}
            activeTab={activeTab}
            onChange={(id) => {
              setActiveTab(id);
              setError(null);
              setSuccessMsg(null);
            }}
          />

          {error && <Alert variant="error" title="Hata">{error}</Alert>}
          {successMsg && <Alert variant="success" title="Başarılı">{successMsg}</Alert>}

          {/* Student Form */}
          {activeTab === 'student' && (
            <form onSubmit={handleStudentSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Ad"
                  required
                  placeholder="Adınız..."
                  value={studentForm.firstName}
                  onChange={(e) => setStudentForm({ ...studentForm, firstName: e.target.value })}
                />
                <Input
                  label="Soyad"
                  required
                  placeholder="Soyadınız..."
                  value={studentForm.lastName}
                  onChange={(e) => setStudentForm({ ...studentForm, lastName: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="T.C. Kimlik No"
                  required
                  placeholder="11 haneli T.C. No"
                  value={studentForm.tcNo}
                  onChange={(e) => setStudentForm({ ...studentForm, tcNo: e.target.value })}
                />
                <Input
                  label="Öğrenci Numarası"
                  required
                  placeholder="ör. 20120033001"
                  value={studentForm.studentNumber}
                  onChange={(e) => setStudentForm({ ...studentForm, studentNumber: e.target.value })}
                />
              </div>

              <Input
                label="Kurumsal Öğrenci E-Postası (@ogr.ktun.edu.tr)"
                type="email"
                required
                placeholder="kullanici@ogr.ktun.edu.tr"
                value={studentForm.email}
                onChange={(e) => setStudentForm({ ...studentForm, email: e.target.value })}
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Select
                  label="Fakülte / Yüksekokul"
                  value={studentForm.faculty}
                  onChange={(e) => setStudentForm({ ...studentForm, faculty: e.target.value })}
                  options={[
                    { value: 'Mühendislik ve Doğa Bilimleri Fakültesi', label: 'Mühendislik Fakültesi' },
                    { value: 'Mimarlık ve Tasarım Fakültesi', label: 'Mimarlık ve Tasarım Fakültesi' },
                    { value: 'Teknik Bilimler Meslek Yüksekokulu', label: 'Teknik Bilimler MYO' },
                  ]}
                />
                <Select
                  label="Sınıf / Durum"
                  value={studentForm.grade}
                  onChange={(e) => setStudentForm({ ...studentForm, grade: e.target.value })}
                  options={[
                    { value: '1. Sınıf', label: '1. Sınıf' },
                    { value: '2. Sınıf', label: '2. Sınıf' },
                    { value: '3. Sınıf', label: '3. Sınıf' },
                    { value: '4. Sınıf', label: '4. Sınıf' },
                    { value: 'Mezun', label: 'Mezun' },
                  ]}
                />
              </div>

              <Input
                label="Şifre"
                type="password"
                required
                placeholder="En az 6 karakter"
                value={studentForm.password}
                onChange={(e) => setStudentForm({ ...studentForm, password: e.target.value })}
              />

              <Checkbox
                label="KVKK Aydınlatma Metnini okudum, kişisel verilerimin işlenmesini kabul ediyorum."
                checked={studentForm.kvkkApproved}
                onChange={(e) => setStudentForm({ ...studentForm, kvkkApproved: e.target.checked })}
              />

              <Button
                type="submit"
                variant="primary"
                size="lg"
                fullWidth
                isLoading={isLoading}
                leftIcon={<UserPlus className="w-4 h-4" />}
              >
                Öğrenci Kaydını Tamamla
              </Button>
            </form>
          )}

          {/* Employer Form */}
          {activeTab === 'employer' && (
            <form onSubmit={handleEmployerSubmit} className="space-y-4">
              <div className="p-3 bg-amber-50 dark:bg-amber-950/40 rounded-xl border border-amber-200 dark:border-amber-900 text-xs text-amber-800 dark:text-amber-200 flex items-start gap-2">
                <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5" />
                <span>
                  İşveren kayıtları güvenlik amacıyla Kariyer Merkezi onayına tabidir. Hesabınız incelendikten sonra aktif edilecektir.
                </span>
              </div>

              <Input
                label="Firma / Kurum Adı"
                required
                placeholder="ör. ASELSAN Konya Silah Sistemleri A.Ş."
                value={employerForm.companyName}
                onChange={(e) => setEmployerForm({ ...employerForm, companyName: e.target.value })}
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Vergi Kimlik Numarası (VKN)"
                  required
                  placeholder="10 haneli vergi no"
                  value={employerForm.taxNumber}
                  onChange={(e) => setEmployerForm({ ...employerForm, taxNumber: e.target.value })}
                />
                <Input
                  label="Yetkili Kişi (Ad Soyad)"
                  required
                  placeholder="İletişim kişisi..."
                  value={employerForm.authorizedPerson}
                  onChange={(e) => setEmployerForm({ ...employerForm, authorizedPerson: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Telefon Numarası"
                  required
                  placeholder="+90 332 000 00 00"
                  value={employerForm.phone}
                  onChange={(e) => setEmployerForm({ ...employerForm, phone: e.target.value })}
                />
                <Input
                  label="Kurumsal E-Posta Adresi"
                  type="email"
                  required
                  placeholder="ik@kurum.com"
                  value={employerForm.email}
                  onChange={(e) => setEmployerForm({ ...employerForm, email: e.target.value })}
                />
              </div>

              <Input
                label="Şifre"
                type="password"
                required
                placeholder="En az 6 karakter"
                value={employerForm.password}
                onChange={(e) => setEmployerForm({ ...employerForm, password: e.target.value })}
              />

              <Checkbox
                label="Kurumsal verilerimin onay süreçlerinde işlenmesini kabul ediyorum."
                checked={employerForm.kvkkApproved}
                onChange={(e) => setEmployerForm({ ...employerForm, kvkkApproved: e.target.checked })}
              />

              <Button
                type="submit"
                variant="navy"
                size="lg"
                fullWidth
                isLoading={isLoading}
                leftIcon={<UserPlus className="w-4 h-4" />}
              >
                İşveren Kaydını Oluştur (Onay Bekler)
              </Button>
            </form>
          )}

          <div className="pt-2 text-center text-xs text-slate-500">
            Zaten hesabınız var mı?{' '}
            <button
              type="button"
              onClick={onNavigateLogin}
              className="font-bold text-burgundy-700 dark:text-burgundy-400 hover:underline"
            >
              Giriş Yapın
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
