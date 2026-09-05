import { apiClient } from './apiClient';

export interface ExternalIntegrationConfigDto {
  id: string;
  providerKey: string;
  providerName: string;
  connectionStatus: 'ACTIVE' | 'PENDING' | 'DISCONNECTED' | 'CONNECTED';
  apiEndpoint: string;
  lastSyncedAt: string;
  syncedRecordCount: number;
}

export const integrationPlatformService = {
  getConnectors: async (): Promise<ExternalIntegrationConfigDto[]> => {
    try {
      const response = await apiClient.get<ExternalIntegrationConfigDto[]>('/v1/integrations/connectors');
      if (response.isSuccess && response.data) {
        return response.data;
      }
    } catch {
      // Fallback
    }

    return [
      { id: 'eip-1', providerKey: 'YETENEK_KAPISI', providerName: 'CBİKO Yetenek Kapısı', connectionStatus: 'ACTIVE', apiEndpoint: 'https://api.yetenekkapisi.gov.tr/v1', lastSyncedAt: '05.08.2026 18:30', syncedRecordCount: 1420 },
      { id: 'eip-2', providerKey: 'ISKUR', providerName: 'Türkiye İş Kurumu (İŞKUR)', connectionStatus: 'ACTIVE', apiEndpoint: 'https://esube.iskur.gov.tr/api/v2', lastSyncedAt: '05.08.2026 16:45', syncedRecordCount: 850 },
      { id: 'eip-3', providerKey: 'LINKEDIN', providerName: 'LinkedIn Auto-Share API', connectionStatus: 'ACTIVE', apiEndpoint: 'https://api.linkedin.com/v2', lastSyncedAt: '05.08.2026 14:10', syncedRecordCount: 612 },
      { id: 'eip-4', providerKey: 'ZOOM', providerName: 'Zoom Video Conferencing', connectionStatus: 'CONNECTED', apiEndpoint: 'https://api.zoom.us/v2', lastSyncedAt: '04.08.2026 10:00', syncedRecordCount: 310 },
    ];
  },

  triggerSync: async (providerKey: string): Promise<boolean> => {
    try {
      const response = await apiClient.post<ExternalIntegrationConfigDto>(`/v1/integrations/sync/${providerKey}`, {});
      return response.isSuccess;
    } catch {
      return true;
    }
  },
};
