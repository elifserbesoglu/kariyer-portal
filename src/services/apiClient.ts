import type { ApiResult, AuthTokensDto, ErrorDetailsDto } from '../types/api';

const getEnvVar = (key: string, defaultValue: string) => {
  try {
    if (typeof import.meta !== 'undefined' && import.meta.env) {
      return import.meta.env[key] || defaultValue;
    }
  } catch (e) {
    // Ignore in non-vite runners
  }
  return defaultValue;
};

const API_BASE_URL = getEnvVar('VITE_API_BASE_URL', 'https://api.kariyer.ktun.edu.tr/api/v1');
const USE_MOCK_FALLBACK = getEnvVar('VITE_USE_MOCK_API', 'true') !== 'false';

class ApiClient {
  private isRefreshing = false;
  private refreshSubscribers: Array<(token: string) => void> = [];

  private getStoredAccessToken(): string | null {
    try {
      if (typeof localStorage !== 'undefined') {
        const saved = localStorage.getItem('ktun_auth_tokens');
        if (saved) {
          const tokens: AuthTokensDto = JSON.parse(saved);
          return tokens.accessToken;
        }
      }
    } catch (e) {
      console.warn('[ApiClient] Failed to read access token from storage.', e);
    }
    return null;
  }

  private getStoredRefreshToken(): string | null {
    try {
      if (typeof localStorage !== 'undefined') {
        const saved = localStorage.getItem('ktun_auth_tokens');
        if (saved) {
          const tokens: AuthTokensDto = JSON.parse(saved);
          return tokens.refreshToken;
        }
      }
    } catch (e) {
      console.warn('[ApiClient] Failed to read refresh token from storage.', e);
    }
    return null;
  }

  private onTokenRefreshed(token: string) {
    this.refreshSubscribers.forEach((cb) => cb(token));
    this.refreshSubscribers = [];
  }

  private addRefreshSubscriber(cb: (token: string) => void) {
    this.refreshSubscribers.push(cb);
  }

  private async refreshTokens(): Promise<string | null> {
    const refreshToken = this.getStoredRefreshToken();
    if (!refreshToken) return null;

    try {
      const response = await fetch(`${API_BASE_URL}/auth/refresh-token`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken }),
      });

      if (!response.ok) throw new Error('Refresh token invalid or expired.');

      const result: ApiResult<AuthTokensDto> = await response.json();
      if (result.isSuccess && result.data) {
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('ktun_auth_tokens', JSON.stringify(result.data));
        }
        return result.data.accessToken;
      }
    } catch (e) {
      console.error('[ApiClient] Token refresh failed. Clearing tokens.', e);
      if (typeof localStorage !== 'undefined') {
        localStorage.removeItem('ktun_auth_tokens');
      }
    }
    return null;
  }

  public async request<T>(endpoint: string, options: RequestInit = {}): Promise<ApiResult<T>> {
    if (USE_MOCK_FALLBACK) {
      console.info(`[ApiClient - Mock Mode] ${options.method || 'GET'} ${endpoint}`);
    }

    const token = this.getStoredAccessToken();
    const customHeaders = (options.headers || {}) as Record<string, string>;
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...customHeaders,
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const config: RequestInit = {
      ...options,
      headers,
    };

    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, config);

      if (response.status === 401 && !customHeaders['X-Skip-Refresh']) {
        if (!this.isRefreshing) {
          this.isRefreshing = true;
          const newToken = await this.refreshTokens();
          this.isRefreshing = false;

          if (newToken) {
            this.onTokenRefreshed(newToken);
            headers['Authorization'] = `Bearer ${newToken}`;
            return this.request<T>(endpoint, { ...options, headers });
          }
        } else {
          return new Promise((resolve) => {
            this.addRefreshSubscriber((newToken) => {
              headers['Authorization'] = `Bearer ${newToken}`;
              resolve(this.request<T>(endpoint, { ...options, headers }));
            });
          });
        }
      }

      if (!response.ok) {
        const errorData: ErrorDetailsDto = await response.json().catch(() => ({
          statusCode: response.status,
          message: response.statusText || 'HTTP sunucu hatası oluştu.',
          traceId: `tr-${Date.now()}`,
        }));

        return {
          isSuccess: false,
          message: errorData.message,
          data: null as any,
          errors: [errorData.detailedMessage || errorData.message],
          timestamp: new Date().toISOString(),
        };
      }

      return await response.json();
    } catch (e: any) {
      return {
        isSuccess: false,
        message: e?.message || 'Ağ sunucu bağlantı hatası.',
        data: null as any,
        errors: [e?.message || 'Sunucu yanıt vermedi.'],
        timestamp: new Date().toISOString(),
      };
    }
  }

  public get<T>(endpoint: string, options?: RequestInit): Promise<ApiResult<T>> {
    return this.request<T>(endpoint, { ...options, method: 'GET' });
  }

  public post<T>(endpoint: string, body: any, options?: RequestInit): Promise<ApiResult<T>> {
    return this.request<T>(endpoint, { ...options, method: 'POST', body: JSON.stringify(body) });
  }

  public put<T>(endpoint: string, body: any, options?: RequestInit): Promise<ApiResult<T>> {
    return this.request<T>(endpoint, { ...options, method: 'PUT', body: JSON.stringify(body) });
  }

  public delete<T>(endpoint: string, options?: RequestInit): Promise<ApiResult<T>> {
    return this.request<T>(endpoint, { ...options, method: 'DELETE' });
  }
}

export const apiClient = new ApiClient();
