export type UserRole =
  | 'Anonymous'
  | 'Student'
  | 'Alumni'
  | 'Employer'
  | 'CareerCenter';

export type EmployerApprovalStatus = 'PendingApproval' | 'Approved' | 'Rejected';

export interface UserProfile {
  id: string;
  email: string;
  role: UserRole;
  fullName: string;
  avatar?: string;
  emailVerified: boolean;
  
  // Student Specific
  studentNumber?: string;
  tcNo?: string;
  faculty?: string;
  department?: string;
  grade?: string;

  // Employer Specific
  companyName?: string;
  taxNumber?: string;
  authorizedPerson?: string;
  phone?: string;
  approvalStatus?: EmployerApprovalStatus;
}

export interface RegisterStudentDto {
  firstName: string;
  lastName: string;
  tcNo: string;
  studentNumber: string;
  email: string;
  faculty: string;
  department: string;
  grade: string;
  password: string;
}

export interface RegisterEmployerDto {
  companyName: string;
  taxNumber: string;
  authorizedPerson: string;
  phone: string;
  email: string;
  password: string;
}

export interface LoginDto {
  identifier: string; // Email or Student Number
  password: string;
  rememberMe?: boolean;
}

export interface JwtTokenPair {
  accessToken: string;
  refreshToken: string;
  expiresInSeconds: number;
}

export interface AuthState {
  user: UserProfile | null;
  tokens: JwtTokenPair | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}
