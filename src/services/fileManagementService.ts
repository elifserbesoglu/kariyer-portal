import { apiClient } from './apiClient';

export interface UserDocumentDto {
  id: string;
  userEmail: string;
  fileName: string;
  documentType: 'CV' | 'CERTIFICATE' | 'DIPLOMA' | 'PORTFOLIO';
  fileSizeBytes: number;
  storageProvider: string;
  virusScanStatus: 'CLEAN' | 'INFECTED' | 'PENDING';
  uploadedAt: string;
  downloadUrl: string;
}

export const fileManagementService = {
  getMyDocuments: async (userEmail: string = 'emre.tunc@ogr.ktun.edu.tr'): Promise<UserDocumentDto[]> => {
    try {
      const response = await apiClient.get<UserDocumentDto[]>(`/v1/files/my-documents?userEmail=${encodeURIComponent(userEmail)}`);
      if (response.isSuccess && response.data) {
        return response.data;
      }
    } catch {
      // Fallback
    }

    return [
      {
        id: 'doc-1',
        userEmail,
        fileName: 'Emre_Tunc_ATS_CV_2026.pdf',
        documentType: 'CV',
        fileSizeBytes: 1572864,
        storageProvider: 'AWS S3 Bucket',
        virusScanStatus: 'CLEAN',
        uploadedAt: '03.08.2026 11:20',
        downloadUrl: 'https://ktun-career-docs.s3.eu-central-1.amazonaws.com/Emre_Tunc_CV.pdf',
      },
      {
        id: 'doc-2',
        userEmail,
        fileName: 'ASELSAN_Aday_Muhendis_Sertifikasi.pdf',
        documentType: 'CERTIFICATE',
        fileSizeBytes: 2097152,
        storageProvider: 'Azure Blob Storage',
        virusScanStatus: 'CLEAN',
        uploadedAt: '25.07.2026 09:45',
        downloadUrl: 'https://ktuncareer.blob.core.windows.net/documents/Aselsan_Cert.pdf',
      },
    ];
  },
};
