/**
 * ASP.NET Core 8 Web API Standard Request/Response DTO Contracts
 */

export interface ApiResult<T> {
  isSuccess: boolean;
  message: string;
  data: T;
  errors?: string[];
  timestamp: string;
}

export interface PaginatedList<T> {
  items: T[];
  pageNumber: number;
  totalPages: number;
  totalCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export interface AuthTokensDto {
  accessToken: string;
  refreshToken: string;
  expiresInSeconds: number;
  tokenType: string;
}

export interface LoginRequestDto {
  email: string;
  passwordHash: string;
}

export interface RegisterEmployerDto {
  companyName: string;
  taxNumber: string;
  taxOffice: string;
  authorizedPerson: string;
  email: string;
  phone: string;
  sector: string;
  taxDocumentUrl: string;
}

export interface CompanyApprovalDto {
  id: string;
  companyName: string;
  taxNumber: string;
  taxOffice: string;
  authorizedPerson: string;
  phone: string;
  email: string;
  sector: string;
  applicationDate: string;
  taxDocumentUrl: string;
  approvalStatus: 'PendingApproval' | 'Approved' | 'Rejected';
  riskLevel: 'Low' | 'Medium' | 'High';
  notes?: string;
}

export interface CreateJobPostingDto {
  title: string;
  workType: string;
  location: string;
  description: string;
  requirements: string[];
  targetedDepartments: string[];
  deadlineDate: string;
  isDraft?: boolean;
}

export interface JobPostingDto {
  id: string;
  companyId: string;
  companyName: string;
  title: string;
  location: string;
  workType: string;
  description: string;
  requirements: string[];
  targetedDepartments: string[];
  createdDate: string;
  deadlineDate: string;
  moderationStatus: 'Draft' | 'PendingModeration' | 'Published' | 'RevisionRequested' | 'Rejected';
  revisionNotes?: string;
}

export interface ApplicationStageDto {
  id: string;
  jobId: string;
  jobTitle: string;
  companyName: string;
  studentId: string;
  studentName: string;
  studentEmail: string;
  studentPhone: string;
  department: string;
  gpa: string;
  appliedDate: string;
  stage: 'applied' | 'screening' | 'test' | 'interview' | 'offer' | 'hired' | 'interview_rejected';
  cvTitle: string;
  stageNotes?: string;
}

export interface ErrorDetailsDto {
  statusCode: number;
  message: string;
  detailedMessage?: string;
  traceId: string;
}
