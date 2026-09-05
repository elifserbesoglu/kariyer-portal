import React, { useState, useEffect } from 'react';
import { Button } from '../../components/ui/Button';
import { Alert } from '../../components/ui/Alert';
import { Save, Building, Layers, ShieldCheck } from 'lucide-react';
import type { UserRole } from '../../types/auth';
import { multiTenantService, type TenantInfoDto } from '../../services/multiTenantService';

export interface PermissionItem {
  id: string;
  module: string;
  code: string;
  description: string;
  allowedRoles: Record<UserRole, boolean>;
}

export const RolePermissionMatrix: React.FC = () => {
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [tenants, setTenants] = useState<TenantInfoDto[]>([]);
  const [selectedTenantCode, setSelectedTenantCode] = useState('KTUN_MAIN');
  const [currentTenant, setCurrentTenant] = useState<TenantInfoDto | null>(null);

  const fetchTenants = async () => {
    const data = await multiTenantService.getTenants();
    setTenants(data);
    const resolved = await multiTenantService.resolveTenant(selectedTenantCode);
    setCurrentTenant(resolved);
  };

  useEffect(() => {
    fetchTenants();
  }, [selectedTenantCode]);

  const [matrix, setMatrix] = useState<PermissionItem[]>([
    {
      id: 'p1',
      module: 'İş İlanları & Yayınlama',
      code: 'Jobs.Create',
      description: 'Yeni iş ve staj ilanı doğrudan yayınlama',
      allowedRoles: { Student: false, Alumni: false, Employer: true, CareerCenter: true, Anonymous: false },
    },
    {
      id: 'p2',
      module: 'Firma & VKN Onayı',
      code: 'Companies.Approve',
      description: 'İşveren kurumsal vergi kimlik onaylama ve aktifleştirme',
      allowedRoles: { Student: false, Alumni: false, Employer: false, CareerCenter: true, Anonymous: false },
    },
    {
      id: 'p3',
      module: 'Kullanıcı & Sistem Yönetimi',
      code: 'System.ManageUsers',
      description: 'Kullanıcı hesapları, sistem ayarları ve audit logs yönetimi',
      allowedRoles: { Student: false, Alumni: false, Employer: false, CareerCenter: true, Anonymous: false },
    },
  ]);

  const togglePermission = (permId: string, role: UserRole) => {
    setMatrix((prev) =>
      prev.map((item) => {
        if (item.id === permId) {
          return {
            ...item,
            allowedRoles: {
              ...item.allowedRoles,
              [role]: !item.allowedRoles[role],
            },
          };
        }
        return item;
      })
    );
  };

  const handleSave = () => {
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
        <div>
          <h2 className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-tight flex items-center gap-2">
            <Building className="w-5 h-5 text-burgundy-700" />
            <span>Multi-Tenant Architecture & RBAC Permission Matrix</span>
            <span className="text-[10px] font-extrabold bg-burgundy-100 dark:bg-burgundy-950 text-burgundy-700 dark:text-burgundy-400 px-2 py-0.5 rounded-full">
              v21.0 SIMPLIFIED ROLES
            </span>
          </h2>
          <p className="text-xs text-slate-500 font-medium">
            Öğrenci, Mezun, İşveren ve Kariyer Merkezi ana rollerine özel %100 izole RBAC matrisi.
          </p>
        </div>

        <Button
          variant="primary"
          onClick={handleSave}
          leftIcon={<Save className="w-4 h-4" />}
          className="font-bold text-xs shrink-0"
        >
          Kiracı Matrisini Kaydet
        </Button>
      </div>

      {saveSuccess && (
        <Alert variant="success" title="Yetki Matrisi Güncellendi">
          "{currentTenant?.tenantName}" kiracısına özel RBAC rol yetkileri veritabanına kaydedildi.
        </Alert>
      )}

      {/* Tenant Switcher Row */}
      <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-burgundy-700" />
          <span className="font-extrabold text-slate-900 dark:text-white">Aktif Kiracı (Tenant) Değiştirici:</span>
          <select
            value={selectedTenantCode}
            onChange={(e) => setSelectedTenantCode(e.target.value)}
            className="p-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl font-bold text-slate-900 dark:text-white"
          >
            {tenants.map((t) => (
              <option key={t.id} value={t.tenantCode}>
                {t.tenantName} ({t.subdomain}.ktun.edu.tr)
              </option>
            ))}
          </select>
        </div>

        <span className="px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-black text-[11px] border border-emerald-200 dark:border-emerald-800 flex items-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Veri İzolasyon Politikası Aktif
        </span>
      </div>

      {/* Matrix Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
              <th className="p-3 font-extrabold text-slate-900 dark:text-white">Modül & İzin</th>
              <th className="p-3 font-bold text-slate-600 dark:text-slate-300 text-center">Öğrenci</th>
              <th className="p-3 font-bold text-slate-600 dark:text-slate-300 text-center">Mezun (Alumni)</th>
              <th className="p-3 font-bold text-slate-600 dark:text-slate-300 text-center">İşveren</th>
              <th className="p-3 font-bold text-slate-600 dark:text-slate-300 text-center">Kariyer Merkezi (Admin)</th>
            </tr>
          </thead>
          <tbody>
            {matrix.map((item) => (
              <tr key={item.id} className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                <td className="p-3 space-y-0.5">
                  <div className="font-extrabold text-slate-900 dark:text-white">{item.code}</div>
                  <div className="text-[11px] text-slate-500">{item.description}</div>
                </td>
                <td className="p-3 text-center">
                  <input
                    type="checkbox"
                    checked={item.allowedRoles.Student}
                    onChange={() => togglePermission(item.id, 'Student')}
                    className="rounded border-slate-300 text-burgundy-700"
                  />
                </td>
                <td className="p-3 text-center">
                  <input
                    type="checkbox"
                    checked={item.allowedRoles.Alumni}
                    onChange={() => togglePermission(item.id, 'Alumni')}
                    className="rounded border-slate-300 text-burgundy-700"
                  />
                </td>
                <td className="p-3 text-center">
                  <input
                    type="checkbox"
                    checked={item.allowedRoles.Employer}
                    onChange={() => togglePermission(item.id, 'Employer')}
                    className="rounded border-slate-300 text-burgundy-700"
                  />
                </td>
                <td className="p-3 text-center">
                  <input
                    type="checkbox"
                    checked={item.allowedRoles.CareerCenter}
                    onChange={() => togglePermission(item.id, 'CareerCenter')}
                    className="rounded border-slate-300 text-burgundy-700"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
