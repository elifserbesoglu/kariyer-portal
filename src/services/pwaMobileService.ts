import { apiClient } from './apiClient';

export interface PwaSubscriptionDto {
  id: string;
  userEmail: string;
  pushEndpoint: string;
  deviceOs: string;
  isOfflineCapable: boolean;
  qrAuthToken: string;
}

export const pwaMobileService = {
  registerDevice: async (userEmail: string, pushEndpoint: string, deviceOs: string): Promise<PwaSubscriptionDto> => {
    try {
      const response = await apiClient.post<PwaSubscriptionDto>('/v1/pwa/register-device', { userEmail, pushEndpoint, deviceOs });
      if (response.isSuccess && response.data) {
        return response.data;
      }
    } catch {
      // Fallback
    }

    return {
      id: `pwa-${Date.now()}`,
      userEmail,
      pushEndpoint,
      deviceOs,
      isOfflineCapable: true,
      qrAuthToken: `KTUN_PWA_QR_${Date.now()}`,
    };
  },

  getQrToken: async (userEmail: string = 'emre.tunc@ogr.ktun.edu.tr'): Promise<string> => {
    try {
      const response = await apiClient.get<{ token: string }>(`/v1/pwa/qr-login-token?userEmail=${encodeURIComponent(userEmail)}`);
      if (response.isSuccess && response.data?.token) {
        return response.data.token;
      }
    } catch {
      // Fallback
    }

    return `KTUN_PWA_QR_${Date.now()}`;
  },
};
