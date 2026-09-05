import { apiClient } from './apiClient';

export interface SearchResultDto {
  id: string;
  title: string;
  category: string;
  subtitle: string;
  url: string;
  isFuzzyMatched: boolean;
  relevanceScore: number;
}

export interface SavedQueryDto {
  id: string;
  queryText: string;
  category: string;
  resultCount: number;
  isSaved: boolean;
}

export const enterpriseSearchService = {
  search: async (q: string = '', category: string = 'ALL'): Promise<SearchResultDto[]> => {
    try {
      const response = await apiClient.get<SearchResultDto[]>(`/v1/search/query?q=${encodeURIComponent(q)}&category=${encodeURIComponent(category)}`);
      if (response.isSuccess && response.data) {
        return response.data;
      }
    } catch {
      // Fallback
    }

    const items: SearchResultDto[] = [
      { id: 's-1', title: 'ASELSAN Konya — Gömülü C++ Mühendisi', category: 'İş İlanları', subtitle: 'Tam Zamanlı • Konya OSB', url: '/jobs/job-1', isFuzzyMatched: false, relevanceScore: 98 },
      { id: 's-2', title: 'HAVELSAN — Otonom İHA Görüntü İşleme', category: 'İş İlanları', subtitle: 'Staj / Aday Mühendis • Ankara', url: '/jobs/job-2', isFuzzyMatched: false, relevanceScore: 95 },
      { id: 's-3', title: 'SIEMENS AG — Güç Sistemleri & Otomasyon', category: 'Şirketler', subtitle: 'Münih / Almanya • Küresel Sanayi', url: '/companies/cmp-3', isFuzzyMatched: true, relevanceScore: 90 },
    ];

    if (!q.trim()) return items;

    const lowerQ = q.toLowerCase();
    return items.filter((i) => i.title.toLowerCase().includes(lowerQ) || i.subtitle.toLowerCase().includes(lowerQ));
  },

  getSavedQueries: async (): Promise<SavedQueryDto[]> => {
    return [
      { id: 'sq-1', queryText: 'Gömülü C++ ASELSAN', category: 'İş İlanları', resultCount: 12, isSaved: true },
      { id: 'sq-2', queryText: 'ROS2 Otonom İHA', category: 'Projeler', resultCount: 8, isSaved: true },
    ];
  },
};
