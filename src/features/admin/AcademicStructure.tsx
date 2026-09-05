import React, { useState } from 'react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Modal } from '../../components/ui/Modal';
import { Plus } from 'lucide-react';

export interface DepartmentItem {
  id: string;
  code: string;
  name: string;
  facultyName: string;
  studentCount: number;
  repName: string;
}

export const AcademicStructure: React.FC = () => {
  const [departments, setDepartments] = useState<DepartmentItem[]>([
    { id: 'd1', code: 'CENG', name: 'Bilgisayar Mühendisliği', facultyName: 'Mühendislik ve Doğa Bilimleri Fakültesi', studentCount: 420, repName: 'Doç. Dr. Selin Öztürk' },
    { id: 'd2', code: 'EEE', name: 'Elektrik-Elektronik Mühendisliği', facultyName: 'Mühendislik ve Doğa Bilimleri Fakültesi', studentCount: 380, repName: 'Prof. Dr. Ali Kemal' },
    { id: 'd3', code: 'MECH', name: 'Makine Mühendisliği', facultyName: 'Mühendislik ve Doğa Bilimleri Fakültesi', studentCount: 450, repName: 'Doç. Dr. Hasan Yıldız' },
    { id: 'd4', code: 'IND', name: 'Endüstri Mühendisliği', facultyName: 'Mühendislik ve Doğa Bilimleri Fakültesi', studentCount: 310, repName: 'Dr. Öğr. Üyesi Merve Şen' },
    { id: 'd5', code: 'ARCH', name: 'Mimarlık', facultyName: 'Mimarlık ve Tasarım Fakültesi', studentCount: 290, repName: 'Prof. Dr. Zeynep Can' },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newDept, setNewDept] = useState({ code: '', name: '', facultyName: 'Mühendislik ve Doğa Bilimleri Fakültesi', repName: '' });

  const handleAddDept = (e: React.FormEvent) => {
    e.preventDefault();
    if (newDept.name && newDept.code) {
      const created: DepartmentItem = {
        id: `d-${Date.now()}`,
        code: newDept.code.toUpperCase(),
        name: newDept.name,
        facultyName: newDept.facultyName,
        studentCount: 0,
        repName: newDept.repName || 'Atanmadı',
      };
      setDepartments([...departments, created]);
      setNewDept({ code: '', name: '', facultyName: 'Mühendislik ve Doğa Bilimleri Fakültesi', repName: '' });
      setIsModalOpen(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
        <div>
          <h2 className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-tight flex items-center gap-2">
            <span>Fakülte & Bölüm Yönetimi</span>
            <span className="text-[10px] font-extrabold bg-burgundy-100 text-burgundy-700 px-2 py-0.5 rounded-full">
              KTÜN Akademik Yapı
            </span>
          </h2>
          <p className="text-xs text-slate-500">
            Üniversite bünyesindeki fakülte, bölüm ve bölüm temsilcisi akademisyen atamalarını tanımlayın.
          </p>
        </div>

        <Button variant="primary" size="md" onClick={() => setIsModalOpen(true)} leftIcon={<Plus className="w-4 h-4" />}>
          Yeni Bölüm Ekle
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {departments.map((dept) => (
          <div
            key={dept.id}
            className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-3 relative"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-black text-burgundy-700 bg-burgundy-50 dark:bg-burgundy-950 px-2 py-0.5 rounded">
                {dept.code}
              </span>
              <span className="text-[11px] font-bold text-slate-400">{dept.studentCount} Kayıtlı Öğrenci</span>
            </div>

            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">{dept.name}</h3>
              <p className="text-[11px] text-slate-500 font-medium">{dept.facultyName}</p>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 text-xs flex items-center justify-between text-slate-600 dark:text-slate-300">
              <span>Temsilci: <strong>{dept.repName}</strong></span>
            </div>
          </div>
        ))}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Yeni Bölüm Tanımla">
        <form onSubmit={handleAddDept} className="space-y-4">
          <Input label="Bölüm Kodu (ör. CENG)" required value={newDept.code} onChange={(e) => setNewDept({ ...newDept, code: e.target.value })} />
          <Input label="Bölüm Adı" required value={newDept.name} onChange={(e) => setNewDept({ ...newDept, name: e.target.value })} />
          <div>
            <label className="text-xs font-medium block mb-1">Bağlı Olduğu Fakülte</label>
            <select
              value={newDept.facultyName}
              onChange={(e) => setNewDept({ ...newDept, facultyName: e.target.value })}
              className="w-full p-2.5 rounded-lg border text-xs bg-white dark:bg-slate-900"
            >
              <option value="Mühendislik ve Doğa Bilimleri Fakültesi">Mühendislik ve Doğa Bilimleri Fakültesi</option>
              <option value="Mimarlık ve Tasarım Fakültesi">Mimarlık ve Tasarım Fakültesi</option>
              <option value="Teknik Bilimler Meslek Yüksekokulu">Teknik Bilimler Meslek Yüksekokulu</option>
              <option value="Lisansüstü Eğitim Enstitüsü">Lisansüstü Eğitim Enstitüsü</option>
            </select>
          </div>
          <Input label="Bölüm Temsilcisi Akademisyen" placeholder="ör. Doç. Dr. Selin Öztürk" value={newDept.repName} onChange={(e) => setNewDept({ ...newDept, repName: e.target.value })} />

          <Button type="submit" variant="primary" fullWidth>Bölümü Kaydet</Button>
        </form>
      </Modal>
    </div>
  );
};
