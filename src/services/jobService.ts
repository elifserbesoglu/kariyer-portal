import { apiClient } from './apiClient';
import type { ApiResult, CreateJobPostingDto, JobPostingDto } from '../types/api';

export const jobService = {
  createJobPosting: async (dto: CreateJobPostingDto): Promise<ApiResult<JobPostingDto>> => {
    return apiClient.post<JobPostingDto>('/jobs', dto);
  },

  getPendingModerationJobs: async (): Promise<ApiResult<JobPostingDto[]>> => {
    return apiClient.get<JobPostingDto[]>('/jobs/pending-moderation');
  },

  approveJobPosting: async (jobId: string, reviewerEmail: string): Promise<ApiResult<boolean>> => {
    return apiClient.post<boolean>(`/jobs/${jobId}/approve`, { reviewerEmail });
  },

  requestJobRevision: async (jobId: string, reviewerEmail: string, revisionNotes: string): Promise<ApiResult<boolean>> => {
    return apiClient.post<boolean>(`/jobs/${jobId}/request-revision`, { reviewerEmail, revisionNotes });
  },

  getPublishedJobsByDepartment: async (department: string): Promise<ApiResult<JobPostingDto[]>> => {
    return apiClient.get<JobPostingDto[]>(`/jobs/published?department=${encodeURIComponent(department)}`);
  },
};
