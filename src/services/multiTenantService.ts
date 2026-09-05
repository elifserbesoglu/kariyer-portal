import { apiClient } from './apiClient';

export interface TenantInfoDto {
  id: string;
  tenantCode: string;
  tenantName: string;
  subdomain: string;
  primaryColorHex: string;
  isActive: boolean;
  storageQuotaBytes: number;
}

export const multiTenantService = {
  getTenants: async (): Promise<TenantInfoDto[]> => {
    try {
      const response = await apiClient.get<TenantInfoDto[]>('/v1/tenants');
      if (response.isSuccess && response.data) {
        return response.data;
      }
    } catch {
      // Fallback
    }

    return [
      { id: 't-1', tenantCode: 'KTUN_MAIN', tenantName: 'KTÜN Rektörlük Ana Kiracı', subdomain: 'ktun', primaryColorHex: '#721c24', isActive: true, storageQuotaBytes: 107374182400 },
      { id: 't-2', tenantCode: 'ENG_FACULTY', tenantName: 'Mühendislik ve Doğa Bilimleri Fakültesi', subdomain: 'muhendislik', primaryColorHex: '#0056b3', isActive: true, storageQuotaBytes: 53687091200 },
      { id: 't-3', tenantCode: 'ARCH_FACULTY', tenantName: 'Mimarlık ve Tasarım Fakültesi', subdomain: 'mimarlik', primaryColorHex: '#28a745', isActive: true, storageQuotaBytes: 26843545600 },
    ];
  },

  resolveTenant: async (tenantCode: string): Promise<TenantInfoDto> => {
    try {
      const response = await apiClient.get<TenantInfoDto>(`/v1/tenants/resolve?code=${encodeURIComponent(tenantCode)}`);
      if (response.isSuccess && response.data) {
        return response.data;
      }
    } catch {
      // Fallback
    }

    const all = await multiTenantService.getTenants();
    return all.find((t) => t.tenantCode === tenantCode) || all[0];
  },
};
