import React, { createContext, useContext, useState, useEffect } from 'react';
import type {
  UserProfile,
  RegisterStudentDto,
  RegisterEmployerDto,
  LoginDto,
  JwtTokenPair,
  AuthState,
} from '../types/auth';

interface AuthContextType extends AuthState {
  login: (dto: LoginDto) => Promise<{ success: boolean; error?: string; user?: UserProfile }>;
  registerStudent: (dto: RegisterStudentDto) => Promise<{ success: boolean; error?: string }>;
  registerEmployer: (dto: RegisterEmployerDto) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  forgotPassword: (email: string) => Promise<{ success: boolean; message: string }>;
  resetPassword: (token: string, newPassword: string) => Promise<{ success: boolean; message: string }>;
  verifyEmail: (token: string) => Promise<{ success: boolean; message: string }>;
  refreshTokens: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const SEEDED_USERS: UserProfile[] = [
  {
    id: 'usr-student-1',
    email: 'emre.tunc@ogr.ktun.edu.tr',
    studentNumber: '20120033001',
    fullName: 'Emre Tunç',
    role: 'Student',
    emailVerified: true,
    tcNo: '12345678901',
    faculty: 'Mühendislik ve Doğa Bilimleri Fakültesi',
    department: 'Bilgisayar Mühendisliği',
    grade: '4. Sınıf',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
  },
  {
    id: 'usr-employer-1',
    email: 'ik@aselsankonya.com.tr',
    fullName: 'ASELSAN Konya İK',
    companyName: 'ASELSAN Konya Silah Sistemleri A.Ş.',
    taxNumber: '1234567890',
    authorizedPerson: 'Mustafa Yılmaz',
    phone: '+90 332 220 50 00',
    role: 'Employer',
    emailVerified: true,
    approvalStatus: 'Approved',
    avatar: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&w=120&q=80',
  },
  {
    id: 'usr-employer-pending',
    email: 'info@yeni-teknoloji.com',
    fullName: 'Yeni Teknoloji A.Ş.',
    companyName: 'Yeni Teknoloji ve Robotik Ltd.',
    taxNumber: '9876543210',
    authorizedPerson: 'Ahmet Kaya',
    phone: '+90 332 333 44 55',
    role: 'Employer',
    emailVerified: true,
    approvalStatus: 'PendingApproval',
  },
  {
    id: 'usr-career-center',
    email: 'kariyer@ktun.edu.tr',
    fullName: 'Kariyer Merkezi Yönetimi',
    role: 'CareerCenter',
    emailVerified: true,
  },
  {
    id: 'usr-alumni-1',
    email: 'zeynep.yilmaz@mezun.ktun.edu.tr',
    fullName: 'Zeynep Yılmaz',
    role: 'Alumni',
    emailVerified: true,
  },
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [tokens, setTokens] = useState<JwtTokenPair | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('ktun_auth_user') || sessionStorage.getItem('ktun_auth_user');
    const savedTokens = localStorage.getItem('ktun_auth_tokens') || sessionStorage.getItem('ktun_auth_tokens');

    if (savedUser && savedTokens) {
      setUser(JSON.parse(savedUser));
      setTokens(JSON.parse(savedTokens));
    }
    setIsLoading(false);
  }, []);

  const generateTokens = (userId: string): JwtTokenPair => {
    return {
      accessToken: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.user_${userId}_exp_${Date.now() + 900000}`,
      refreshToken: `ref_${userId}_${Math.random().toString(36).substring(2)}`,
      expiresInSeconds: 900,
    };
  };

  const login = async (dto: LoginDto) => {
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 600));

    const identifierLower = dto.identifier.trim().toLowerCase();

    const found = SEEDED_USERS.find(
      (u) =>
        u.email.toLowerCase() === identifierLower ||
        (u.studentNumber && u.studentNumber === identifierLower)
    );

    if (!found) {
      setIsLoading(false);
      return { success: false, error: 'E-posta, öğrenci numarası veya şifre hatalı.' };
    }

    if (dto.password !== '123456' && dto.password.length < 6) {
      setIsLoading(false);
      return { success: false, error: 'Şifre hatalı. Lütfen tekrar deneyiniz.' };
    }

    const tokenPair = generateTokens(found.id);
    setUser(found);
    setTokens(tokenPair);

    const storage = dto.rememberMe ? localStorage : sessionStorage;
    storage.setItem('ktun_auth_user', JSON.stringify(found));
    storage.setItem('ktun_auth_tokens', JSON.stringify(tokenPair));

    setIsLoading(false);
    return { success: true, user: found };
  };

  const registerStudent = async (dto: RegisterStudentDto) => {
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 600));

    if (!dto.email.endsWith('@ogr.ktun.edu.tr') && !dto.email.endsWith('@ktun.edu.tr')) {
      setIsLoading(false);
      return { success: false, error: 'Öğrenci kaydı için kurumsal @ogr.ktun.edu.tr e-posta adresi gereklidir.' };
    }

    const newUser: UserProfile = {
      id: `usr-student-${Date.now()}`,
      email: dto.email,
      fullName: `${dto.firstName} ${dto.lastName}`,
      studentNumber: dto.studentNumber,
      tcNo: dto.tcNo,
      faculty: dto.faculty,
      department: dto.department,
      grade: dto.grade,
      role: 'Student',
      emailVerified: false,
    };

    SEEDED_USERS.push(newUser);
    setIsLoading(false);
    return { success: true };
  };

  const registerEmployer = async (dto: RegisterEmployerDto) => {
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 600));

    const newUser: UserProfile = {
      id: `usr-employer-${Date.now()}`,
      email: dto.email,
      fullName: dto.companyName,
      companyName: dto.companyName,
      taxNumber: dto.taxNumber,
      authorizedPerson: dto.authorizedPerson,
      phone: dto.phone,
      role: 'Employer',
      emailVerified: true,
      approvalStatus: 'PendingApproval',
    };

    SEEDED_USERS.push(newUser);
    setIsLoading(false);
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    setTokens(null);
    localStorage.removeItem('ktun_auth_user');
    localStorage.removeItem('ktun_auth_tokens');
    sessionStorage.removeItem('ktun_auth_user');
    sessionStorage.removeItem('ktun_auth_tokens');
  };

  const forgotPassword = async (email: string) => {
    await new Promise((r) => setTimeout(r, 500));
    return {
      success: true,
      message: `${email} adresine şifre sıfırlama bağlantısı gönderilmiştir. Lütfen gelen kutunuzu kontrol ediniz.`,
    };
  };

  const resetPassword = async (_token: string, _newPassword: string) => {
    await new Promise((r) => setTimeout(r, 500));
    return { success: true, message: 'Şifreniz başarıyla güncellenmiştir. Yeni şifrenizle giriş yapabilirsiniz.' };
  };

  const verifyEmail = async (_token: string) => {
    await new Promise((r) => setTimeout(r, 500));
    return { success: true, message: 'E-posta adresiniz doğrulandı. Hesabınız aktif hale getirilmiştir.' };
  };

  const refreshTokens = async () => {
    if (!user) return false;
    const refreshed = generateTokens(user.id);
    setTokens(refreshed);
    return true;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        tokens,
        isAuthenticated: !!user,
        isLoading,
        login,
        registerStudent,
        registerEmployer,
        logout,
        forgotPassword,
        resetPassword,
        verifyEmail,
        refreshTokens,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
