import { apiClient } from './apiClient';
import type { ApiResult, ApplicationStageDto } from '../types/api';

export const applicationService = {
  submitApplication: async (jobId: string, studentId: string, cvTitle: string): Promise<ApiResult<ApplicationStageDto>> => {
    return apiClient.post<ApplicationStageDto>('/applications', { jobId, studentId, cvTitle });
  },

  getEmployerApplications: async (companyId: string): Promise<ApiResult<ApplicationStageDto[]>> => {
    return apiClient.get<ApplicationStageDto[]>(`/applications/employer/${companyId}`);
  },

  updateCandidateStage: async (
    applicationId: string,
    newStage: ApplicationStageDto['stage'],
    updatedByEmail: string,
    notes?: string
  ): Promise<ApiResult<boolean>> => {
    return apiClient.put<boolean>(`/applications/${applicationId}/stage`, { newStage, updatedByEmail, notes });
  },
};
