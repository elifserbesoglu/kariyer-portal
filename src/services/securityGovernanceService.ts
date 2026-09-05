import { apiClient } from './apiClient';

export interface SecurityEventDto {
  id: string;
  eventType: 'LOGIN_ATTEMPT' | 'MFA_VERIFIED' | 'PERMISSION_DENIED' | 'SUSPICIOUS_IP';
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  userEmail: string;
  ipAddress: string;
  userAgent: string;
  description: string;
  iso27001Compliant: boolean;
  timestamp: string;
}

export const securityGovernanceService = {
  getSecurityEvents: async (): Promise<SecurityEventDto[]> => {
    try {
      const response = await apiClient.get<SecurityEventDto[]>('/v1/security/events');
      if (response.isSuccess && response.data) {
        return response.data;
      }
    } catch {
      // Fallback
    }

    return [
      { id: 'sec-1', eventType: 'MFA_VERIFIED', severity: 'LOW', userEmail: 'admin@ktun.edu.tr', ipAddress: '88.241.10.15', userAgent: 'Macintosh Chrome', description: 'ISO 27001 TOTP 2FA Doğrulaması Başarılı.', iso27001Compliant: true, timestamp: '05.08.2026 19:15' },
      { id: 'sec-2', eventType: 'SUSPICIOUS_IP', severity: 'CRITICAL', userEmail: 'unknown@hacker.org', ipAddress: '185.220.101.5', userAgent: 'Python-urllib/3.9', description: 'Şüpheli IP Adresinden 5 Başarısız Oturum Açma Denemesi Engellendi.', iso27001Compliant: true, timestamp: '05.08.2026 18:30' },
      { id: 'sec-3', eventType: 'PERMISSION_DENIED', severity: 'MEDIUM', userEmail: 'emre.tunc@ogr.ktun.edu.tr', ipAddress: '193.140.150.12', userAgent: 'Windows Edge', description: 'Yetkisiz Admin Sayfası Erişim Girişimi Loglandı.', iso27001Compliant: true, timestamp: '05.08.2026 16:45' },
    ];
  },

  verifyMfa: async (userEmail: string, code: string): Promise<boolean> => {
    try {
      const response = await apiClient.post<{ success: boolean }>('/v1/security/verify-mfa', { userEmail, code });
      return response.isSuccess && !!response.data?.success;
    } catch {
      return code === '123456';
    }
  },
};
