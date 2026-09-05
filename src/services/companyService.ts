import { apiClient } from './apiClient';
import type { ApiResult, CompanyApprovalDto } from '../types/api';

export const companyService = {
  getPendingCompanies: async (): Promise<ApiResult<CompanyApprovalDto[]>> => {
    return apiClient.get<CompanyApprovalDto[]>('/companies/pending-approvals');
  },

  approveCompany: async (companyId: string, reviewerEmail: string, notes?: string): Promise<ApiResult<boolean>> => {
    return apiClient.post<boolean>(`/companies/${companyId}/approve`, { reviewerEmail, notes });
  },

  rejectCompany: async (companyId: string, reviewerEmail: string, notes: string): Promise<ApiResult<boolean>> => {
    return apiClient.post<boolean>(`/companies/${companyId}/reject`, { reviewerEmail, notes });
  },
};
