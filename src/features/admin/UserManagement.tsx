import React, { useState } from 'react';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';
import { Search, Edit, Users } from 'lucide-react';
import type { UserRole } from '../../types/auth';

export interface SystemUserItem {
  id: string;
  fullName: string;
  email: string;
  role: UserRole;
  isActive: boolean;
  emailVerified: boolean;
  detail: string;
  createdAt: string;
}

export const getRoleLabel = (role: UserRole | string): string => {
  switch (role) {
    case 'Student':
      return 'Öğrenci';
    case 'Alumni':
      return 'Mezun';
    case 'Employer':
      return 'İşveren';
    case 'CareerCenter':
      return 'Kariyer Merkezi';
    default:
      return role;
  }
};

export const UserManagement: React.FC = () => {
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('ALL');
  const [selectedUser, setSelectedUser] = useState<SystemUserItem | null>(null);

  const [users, setUsers] = useState<SystemUserItem[]>([
    { id: 'u1', fullName: 'Emre Tunç', email: 'emre.tunc@ogr.ktun.edu.tr', role: 'Student', isActive: true, emailVerified: true, detail: 'Bilgisayar Müh. (20120033001)', createdAt: '15.05.2024' },
    { id: 'u2', fullName: 'ASELSAN Konya İK', email: 'ik@aselsankonya.com.tr', role: 'Employer', isActive: true, emailVerified: true, detail: 'VKN: 1234567890 (Approved)', createdAt: '10.05.2024' },
    { id: 'u3', fullName: 'Yeni Teknoloji A.Ş.', email: 'info@yeni-teknoloji.com', role: 'Employer', isActive: false, emailVerified: true, detail: 'VKN: 9876543210 (PendingApproval)', createdAt: '14.05.2024' },
    { id: 'u4', fullName: 'Zeynep Yılmaz', email: 'zeynep.yilmaz@mezun.ktun.edu.tr', role: 'Alumni', isActive: true, emailVerified: true, detail: 'Makine Müh. Mezunu (2022)', createdAt: '01.06.2023' },
    { id: 'u5', fullName: 'Kariyer Merkezi Yönetimi', email: 'kariyer@ktun.edu.tr', role: 'CareerCenter', isActive: true, emailVerified: true, detail: 'KTÜN Kariyer Merkezi & Sistem Yöneticisi', createdAt: '01.01.2024' },
  ]);

  const handleToggleActive = (id: string) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, isActive: !u.isActive } : u))
    );
  };

  const filteredUsers = users.filter((u) => {
    const matchesSearch =
      u.fullName.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      u.detail.toLowerCase().includes(search.toLowerCase());
    const matchesRole = roleFilter === 'ALL' || u.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const getRoleBadgeVariant = (role: UserRole) => {
    switch (role) {
      case 'Student':
        return 'primary';
      case 'Alumni':
        return 'warning';
      case 'Employer':
        return 'success';
      case 'CareerCenter':
        return 'error';
      default:
        return 'secondary';
    }
  };

  const [editRole, setEditRole] = useState<UserRole>('Student');
  const [editName, setEditName] = useState('');
  const [editDetail, setEditDetail] = useState('');
  const [userActionMsg, setUserActionMsg] = useState<string | null>(null);

  const handleOpenEdit = (user: SystemUserItem) => {
    setSelectedUser(user);
    setEditRole(user.role);
    setEditName(user.fullName);
    setEditDetail(user.detail);
  };

  const handleSaveUser = () => {
    if (!selectedUser) return;
    setUsers((prev) =>
      prev.map((u) =>
        u.id === selectedUser.id
          ? { ...u, fullName: editName, role: editRole, detail: editDetail }
          : u
      )
    );
    setUserActionMsg(`"${editName}" adlı kullanıcının rolü ve bilgileri başarıyla güncellendi.`);
    setSelectedUser(null);
    setTimeout(() => setUserActionMsg(null), 4000);
  };

  const handleDeleteUser = (id: string, name: string) => {
    if (window.confirm(`"${name}" kullanıcısını silmek istediğinize emin misiniz?`)) {
      setUsers((prev) => prev.filter((u) => u.id !== id));
      setUserActionMsg(`"${name}" adlı kullanıcı sistemden tamamen silindi.`);
      setSelectedUser(null);
      setTimeout(() => setUserActionMsg(null), 4000);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
        <div>
          <h2 className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-tight flex items-center gap-2">
            <Users className="w-5 h-5 text-burgundy-700" />
            <span>Kullanıcı Yönetim Merkezi</span>
          </h2>
          <p className="text-xs text-slate-500 font-medium">
            Öğrenci, Mezun, İşveren ve Kariyer Merkezi yönetici hesaplarının merkezi veritabanı.
          </p>
        </div>
      </div>

      {userActionMsg && (
        <div className="p-3 bg-emerald-50 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200 rounded-xl text-xs font-bold border border-emerald-200 dark:border-emerald-800">
          {userActionMsg}
        </div>
      )}

      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="w-full sm:w-72">
          <Input
            type="text"
            placeholder="İsim, e-posta veya bilgi ara..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            leftIcon={<Search className="w-4 h-4 text-slate-400" />}
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="font-bold text-slate-500">Rol Filtresi:</span>
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="p-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-bold text-slate-900 dark:text-white"
          >
            <option value="ALL">Tüm Roller</option>
            <option value="Student">Öğrenci</option>
            <option value="Alumni">Mezun</option>
            <option value="Employer">İşveren</option>
            <option value="CareerCenter">Kariyer Merkezi</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
              <th className="p-3 font-extrabold text-slate-900 dark:text-white">Kullanıcı</th>
              <th className="p-3 font-bold text-slate-600 dark:text-slate-300">Rol</th>
              <th className="p-3 font-bold text-slate-600 dark:text-slate-300">Detay / Kurum</th>
              <th className="p-3 font-bold text-slate-600 dark:text-slate-300">Durum</th>
              <th className="p-3 font-bold text-slate-600 dark:text-slate-300 text-right">İşlemler</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((u) => (
              <tr key={u.id} className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                <td className="p-3 space-y-0.5">
                  <div className="font-extrabold text-slate-900 dark:text-white">{u.fullName}</div>
                  <div className="text-[11px] text-slate-500 font-mono">{u.email}</div>
                </td>
                <td className="p-3">
                  <Badge variant={getRoleBadgeVariant(u.role)}>{getRoleLabel(u.role)}</Badge>
                </td>
                <td className="p-3 text-slate-600 dark:text-slate-400 font-medium">{u.detail}</td>
                <td className="p-3">
                  <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${u.isActive ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' : 'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300'}`}>
                    {u.isActive ? 'Aktif' : 'Pasif'}
                  </span>
                </td>
                <td className="p-3 text-right space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleOpenEdit(u)}
                    leftIcon={<Edit className="w-3.5 h-3.5" />}
                  >
                    Düzenle
                  </Button>
                  <Button
                    variant={u.isActive ? 'danger' : 'secondary'}
                    size="sm"
                    onClick={() => handleToggleActive(u.id)}
                  >
                    {u.isActive ? 'Dondur' : 'Aktifleştir'}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedUser && (
        <Modal
          isOpen={true}
          onClose={() => setSelectedUser(null)}
          title={`Kullanıcı Hesabı Düzenleme: ${selectedUser.fullName}`}
        >
          <div className="space-y-4 text-xs">
            <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl space-y-1">
              <p>E-Posta Adresi: <strong className="text-slate-900 dark:text-white font-mono">{selectedUser.email}</strong></p>
              <p>Kayıt Tarihi: <strong className="text-slate-900 dark:text-white">{selectedUser.createdAt}</strong></p>
            </div>

            <div className="space-y-3">
              <div>
                <label className="font-bold block mb-1">Ad Soyad / Kurum Adı</label>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold"
                />
              </div>

              <div>
                <label className="font-bold block mb-1">Kullanıcı Rolü (RBAC)</label>
                <select
                  value={editRole}
                  onChange={(e) => setEditRole(e.target.value as UserRole)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold"
                >
                  <option value="Student">Öğrenci</option>
                  <option value="Alumni">Mezun</option>
                  <option value="Employer">İşveren</option>
                  <option value="CareerCenter">Kariyer Merkezi</option>
                </select>
              </div>

              <div>
                <label className="font-bold block mb-1">Detay / Bölüm / VKN Bilgisi</label>
                <input
                  type="text"
                  value={editDetail}
                  onChange={(e) => setEditDetail(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 font-medium"
                />
              </div>
            </div>

            <div className="pt-4 flex justify-between items-center border-t">
              <Button
                variant="danger"
                size="sm"
                onClick={() => handleDeleteUser(selectedUser.id, selectedUser.fullName)}
              >
                Kullanıcıyı Sil
              </Button>

              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={() => setSelectedUser(null)}>Kapat</Button>
                <Button variant="primary" size="sm" onClick={handleSaveUser}>Değişiklikleri Kaydet</Button>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
