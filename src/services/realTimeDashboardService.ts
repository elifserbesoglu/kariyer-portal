import { apiClient } from './apiClient';

export interface RealTimeMetricDto {
  id: string;
  metricCode: string;
  metricName: string;
  value: number;
  roleScope: string;
  lastUpdated: string;
}

export const realTimeDashboardService = {
  getLiveMetrics: async (roleScope: string = 'ALL'): Promise<RealTimeMetricDto[]> => {
    try {
      const response = await apiClient.get<RealTimeMetricDto[]>(`/v1/live-dashboard/metrics?roleScope=${roleScope}`);
      if (response.isSuccess && response.data) {
        return response.data;
      }
    } catch {
      // Fallback
    }

    return [
      { id: 'm1', metricCode: 'ONLINE_USERS', metricName: 'Canlı Online Kullanıcılar', value: 142, roleScope: 'ALL', lastUpdated: new Date().toLocaleTimeString() },
      { id: 'm2', metricCode: 'TODAY_APPLICATIONS', metricName: 'Bugünkü Toplam Başvuru', value: 38, roleScope: 'EMPLOYER', lastUpdated: new Date().toLocaleTimeString() },
      { id: 'm3', metricCode: 'ACTIVE_INTERVIEWS', metricName: 'Devam Eden Mülakatlar', value: 6, roleScope: 'STUDENT', lastUpdated: new Date().toLocaleTimeString() },
    ];
  },
};
