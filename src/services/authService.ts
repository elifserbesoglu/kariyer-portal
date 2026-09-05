import { apiClient } from './apiClient';
import type { ApiResult, AuthTokensDto, LoginRequestDto, RegisterEmployerDto } from '../types/api';

export const authService = {
  login: async (credentials: LoginRequestDto): Promise<ApiResult<AuthTokensDto>> => {
    return apiClient.post<AuthTokensDto>('/auth/login', credentials);
  },

  registerEmployer: async (data: RegisterEmployerDto): Promise<ApiResult<{ companyId: string }>> => {
    return apiClient.post<{ companyId: string }>('/auth/register-employer', data);
  },

  refreshToken: async (refreshToken: string): Promise<ApiResult<AuthTokensDto>> => {
    return apiClient.post<AuthTokensDto>('/auth/refresh-token', { refreshToken });
  },

  verifyObsStudent: async (studentNumber: string, tcKn: string): Promise<ApiResult<{ isVerified: boolean; fullName: string; gpa: string }>> => {
    return apiClient.post<{ isVerified: boolean; fullName: string; gpa: string }>('/auth/obs-verify', { studentNumber, tcKn });
  },

  logout: async (): Promise<ApiResult<boolean>> => {
    return apiClient.post<boolean>('/auth/logout', {});
  },
};
