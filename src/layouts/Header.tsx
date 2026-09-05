import React, { useState } from 'react';
import {
  Phone,
  Mail,
  ChevronDown,
  Menu,
  LogOut,
  User,
  Settings,
  FileText,
  Bookmark,
  Building2,
  Shield,
  LayoutDashboard,
  Plus,
} from 'lucide-react';
import { Dropdown, type DropdownItem } from '../components/ui/Dropdown';
import { Drawer } from '../components/ui/Drawer';
import { KtunLogo } from '../components/ui/KtunLogo';
import { usePublicRouter, type PublicPageRoute } from '../router/PublicRouter';
import { useAuth } from '../context/AuthContext';

export interface HeaderProps {
  currentRole?: 'public' | 'student' | 'employer' | 'career-center';
  onRoleChange?: (role: string, subTab?: string) => void;
  currentView?: string;
}

export const Header: React.FC<HeaderProps> = ({ onRoleChange, currentView = 'public' }) => {
  const { user, isAuthenticated, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCorporateMegaMenuOpen, setIsCorporateMegaMenuOpen] = useState(false);

  let currentRoute: PublicPageRoute = 'home';
  let navigate: (route: PublicPageRoute, params?: Record<string, string>) => void = () => {};
  try {
    const router = usePublicRouter();
    navigate = router.navigate;
    currentRoute = router.currentRoute;
  } catch (e) {
    // Fallback if context is initializing
  }

  const handleNavClick = (route: PublicPageRoute, params?: Record<string, string>) => {
    setIsCorporateMegaMenuOpen(false);
    setIsMobileMenuOpen(false);
    if (onRoleChange) {
      onRoleChange('public');
    }
    navigate(route, params);
  };

  const isActiveRoute = (route: PublicPageRoute) => {
    if (currentView !== 'public') return false;
    return currentRoute === route;
  };

  const isCorporateActive = () => {
    if (currentView !== 'public') return false;
    return ['mission', 'vision', 'career-center', 'kvkk', 'privacy', 'cookie', 'terms'].includes(currentRoute);
  };

  const getLinkClass = (isActive: boolean) =>
    `px-3 py-2 rounded-lg transition-colors font-semibold text-xs ${
      isActive
        ? 'text-burgundy-700 dark:text-burgundy-400 font-extrabold bg-burgundy-50 dark:bg-burgundy-950/40 border border-burgundy-200/60 dark:border-burgundy-800/60 shadow-xs'
        : 'text-slate-700 dark:text-slate-200 hover:text-burgundy-700 hover:bg-slate-100 dark:hover:bg-slate-800'
    }`;

  const handleGoToDashboard = () => {
    if (!user || !onRoleChange) return;
    if (user.role === 'Student' || user.role === 'Alumni') onRoleChange('student', 'dashboard');
    else if (user.role === 'Employer') onRoleChange('employer', 'ats');
    else if (user.role === 'CareerCenter') onRoleChange('career-center', 'cockpit');
  };

  const handleLogout = () => {
    logout();
    if (onRoleChange) onRoleChange('public');
    navigate('home');
  };

  let profileDropdownItems: DropdownItem[] = [];

  if (isAuthenticated) {
    if (user?.role === 'Employer') {
      profileDropdownItems = [
        {
          id: 'employer-ats',
          label: 'Firma Paneli',
          icon: <LayoutDashboard className="w-4 h-4 text-burgundy-700 font-bold" />,
          onClick: () => {
            if (onRoleChange) onRoleChange('employer-ats');
          },
        },
        {
          id: 'employer-create-job',
          label: 'Yeni İlan',
          icon: <Plus className="w-4 h-4 text-emerald-600 font-bold" />,
          onClick: () => {
            if (onRoleChange) onRoleChange('employer-create-job');
          },
        },
        {
          id: 'employer-profile',
          label: 'Profil ve Hesap Ayarları',
          icon: <Settings className="w-4 h-4 text-slate-700 dark:text-slate-200" />,
          onClick: () => {
            if (onRoleChange) onRoleChange('employer-profile');
          },
        },
        {
          id: 'logout',
          label: 'Çıkış Yap',
          icon: <LogOut className="w-4 h-4" />,
          danger: true,
          onClick: handleLogout,
          divider: true,
        },
      ];
    } else if (user?.role === 'CareerCenter') {
      profileDropdownItems = [
        {
          id: 'dashboard',
          label: 'Kariyer Merkezi Komuta Paneli',
          icon: <LayoutDashboard className="w-4 h-4 text-burgundy-700 font-bold" />,
          onClick: () => {
            if (onRoleChange) onRoleChange('career-center', 'cockpit');
          },
        },
        {
          id: 'users',
          label: 'Kullanıcı & Firma Yönetimi',
          icon: <Shield className="w-4 h-4 text-burgundy-700" />,
          onClick: () => {
            if (onRoleChange) onRoleChange('career-center', 'users');
          },
        },
        {
          id: 'settings',
          label: 'Sistem Ayarları',
          icon: <Settings className="w-4 h-4" />,
          onClick: () => {
            if (onRoleChange) onRoleChange('career-center', 'settings');
          },
        },
        {
          id: 'logout',
          label: 'Çıkış Yap',
          icon: <LogOut className="w-4 h-4" />,
          danger: true,
          onClick: handleLogout,
          divider: true,
        },
      ];
    } else {
      // Default: Student / Alumni
      profileDropdownItems = [
        {
          id: 'dashboard',
          label: 'Öğrenci Paneli',
          icon: <LayoutDashboard className="w-4 h-4 text-burgundy-700 font-bold" />,
          onClick: () => {
            if (onRoleChange) onRoleChange('student', 'dashboard');
          },
        },
        {
          id: 'cv',
          label: 'Profilim',
          icon: <FileText className="w-4 h-4 text-burgundy-700" />,
          onClick: () => {
            if (onRoleChange) onRoleChange('student', 'cv');
          },
        },
        {
          id: 'applications',
          label: 'Başvurularım',
          icon: <FileText className="w-4 h-4 text-blue-600" />,
          onClick: () => {
            if (onRoleChange) onRoleChange('student', 'applications');
          },
        },
        {
          id: 'bookmarks',
          label: 'Favori İlanlarım',
          icon: <Bookmark className="w-4 h-4 text-amber-500" />,
          onClick: () => {
            if (onRoleChange) onRoleChange('student', 'bookmarks');
          },
        },
        {
          id: 'documents',
          label: 'Belgelerim',
          icon: <FileText className="w-4 h-4 text-emerald-600" />,
          onClick: () => {
            if (onRoleChange) onRoleChange('student', 'documents');
          },
        },
        {
          id: 'logout',
          label: 'Çıkış Yap',
          icon: <LogOut className="w-4 h-4" />,
          danger: true,
          onClick: handleLogout,
          divider: true,
        },
      ];
    }
  } else {
    profileDropdownItems = [
      { id: 'login', label: 'Giriş Yap', icon: <User className="w-4 h-4" />, onClick: () => (onRoleChange ? onRoleChange('login') : navigate('home')) },
      { id: 'register', label: 'Kayıt Ol', icon: <FileText className="w-4 h-4" />, onClick: () => (onRoleChange ? onRoleChange('register') : navigate('home')) },
    ];
  }

  return (
    <header className="w-full z-40 sticky top-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 shadow-xs transition-colors">
      {/* Top Banner Bar */}
      <div className="bg-burgundy-700 text-white text-xs py-1.5 px-4 md:px-8 font-medium">
        <div className="max-w-1440 mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <a href="tel:+903322051111" className="flex items-center gap-1.5 hover:text-slate-200 transition-colors">
              <Phone className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">+90 332 205 11 11</span>
            </a>
            <span className="opacity-40">|</span>
            <a href="mailto:kariyer@ktun.edu.tr" className="flex items-center gap-1.5 hover:text-slate-200 transition-colors">
              <Mail className="w-3.5 h-3.5" />
              <span>kariyer@ktun.edu.tr</span>
            </a>
          </div>

          <div className="flex items-center gap-4">
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-1440 mx-auto px-4 md:px-8 py-3 flex items-center justify-between gap-4">
        {/* Official KTÜN Logo Branding */}
        <button onClick={() => handleNavClick('home')} className="text-left flex items-center gap-3 group focus:outline-none">
          <KtunLogo size="md" showSubtitle={true} />
        </button>

        {/* Desktop Main Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 font-semibold text-xs text-slate-700 dark:text-slate-200">
          {/* Ana Sayfa */}
          <button
            onClick={() => handleNavClick('home')}
            className={getLinkClass(isActiveRoute('home'))}
          >
            Ana Sayfa
          </button>

          {/* Kurumsal (Mega Menu Trigger) */}
          <div
            className="relative"
            onMouseEnter={() => setIsCorporateMegaMenuOpen(true)}
            onMouseLeave={() => setIsCorporateMegaMenuOpen(false)}
          >
            <button
              onClick={() => setIsCorporateMegaMenuOpen(!isCorporateMegaMenuOpen)}
              className={`flex items-center gap-1 ${getLinkClass(isCorporateActive())}`}
            >
              <span>Kurumsal</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isCorporateMegaMenuOpen ? 'rotate-180 text-burgundy-700' : ''}`} />
            </button>

            {/* Categorized Mega Menu Dropdown */}
            {isCorporateMegaMenuOpen && (
              <div className="absolute top-full left-0 w-[480px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl rounded-2xl p-6 grid grid-cols-2 gap-6 animate-in fade-in slide-in-from-top-2 duration-150 z-50">
                {/* Category 1: Kurumsal Bilgiler */}
                <div className="space-y-3">
                  <span className="text-[11px] font-black uppercase tracking-wider text-burgundy-700 flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5" />
                    Kurumsal Bilgiler
                  </span>
                  <div className="space-y-1 text-xs">
                    <button onClick={() => handleNavClick('mission')} className="block w-full text-left p-1.5 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-700 dark:text-slate-300">
                      Misyon & Vizyon
                    </button>
                    <button onClick={() => handleNavClick('career-center')} className="block w-full text-left p-1.5 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-700 dark:text-slate-300">
                      Kariyer Merkezi Yönetimi
                    </button>
                  </div>
                </div>

                {/* Category 2: Mevzuat & Yasal */}
                <div className="space-y-3">
                  <span className="text-[11px] font-black uppercase tracking-wider text-burgundy-700 flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5" />
                    Mevzuat & Yasal
                  </span>
                  <div className="space-y-1 text-xs">
                    <button onClick={() => handleNavClick('kvkk')} className="block w-full text-left p-1.5 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-700 dark:text-slate-300">
                      KVKK Aydınlatma Metni
                    </button>
                    <button onClick={() => handleNavClick('privacy')} className="block w-full text-left p-1.5 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-700 dark:text-slate-300">
                      Gizlilik Politikası
                    </button>
                    <button onClick={() => handleNavClick('cookie')} className="block w-full text-left p-1.5 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-700 dark:text-slate-300">
                      Çerez Politikası
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* İş / Staj İlanları (Öğrenci & Kamusal için, Şirket rolünden gizli) */}
          {user?.role !== 'Employer' && (
            <button
              onClick={() => handleNavClick('jobs')}
              className={getLinkClass(isActiveRoute('jobs'))}
            >
              İş / Staj İlanları
            </button>
          )}

          {/* Firmalar (Şirket rolünden gizli) */}
          {user?.role !== 'Employer' && (
            <button
              onClick={() => handleNavClick('companies')}
              className={getLinkClass(isActiveRoute('companies'))}
            >
              Firmalar
            </button>
          )}



          {/* Duyurular */}
          <button
            onClick={() => handleNavClick('announcements')}
            className={getLinkClass(isActiveRoute('announcements'))}
          >
            Duyurular
          </button>

          {/* İletişim */}
          <button
            onClick={() => handleNavClick('contact')}
            className={getLinkClass(isActiveRoute('contact'))}
          >
            İletişim
          </button>
        </nav>

        {/* User Right Action Controls (Profile Dropdown & Role Dashboard) */}
        <div className="flex items-center gap-3">


          {/* User Profile Badge / Login Dropdown */}
          <Dropdown
            trigger={
              <button className="flex items-center gap-2 p-1.5 pr-3 rounded-full border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors">
                <div className="w-8 h-8 rounded-full bg-burgundy-700 text-white flex items-center justify-center font-extrabold text-xs shadow-xs overflow-hidden">
                  {user?.avatar ? (
                    <img src={user.avatar} alt={user.fullName} className="w-full h-full object-cover" />
                  ) : (
                    <span>{user ? user.fullName.substring(0, 2).toUpperCase() : 'GİR'}</span>
                  )}
                </div>
                <div className="hidden sm:flex flex-col text-left">
                  <span className="text-xs font-bold text-slate-900 dark:text-white leading-tight">
                    {isAuthenticated ? user?.fullName : 'Giriş Yap'}
                  </span>
                  <span className="text-[10px] text-slate-500 font-medium leading-tight">
                    {isAuthenticated ? user?.role : 'Kullanıcı Paneli'}
                  </span>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>
            }
            items={profileDropdownItems}
          />

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="lg:hidden p-2 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Mobil Menü Aç"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Mobile Responsive Navigation Drawer */}
      <Drawer isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} title="KTÜN Kariyer Portalı">
        <div className="space-y-4 py-2">
          {isAuthenticated && (
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                handleGoToDashboard();
              }}
              className="w-full text-left p-3 rounded-xl bg-burgundy-700 text-white font-bold text-sm flex items-center gap-2"
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Rol Panelime Geç ({user?.role === 'Student' ? 'Öğrenci' : user?.role === 'Employer' ? 'İşveren' : user?.role === 'CareerCenter' ? 'Kariyer Merkezi' : user?.role === 'Alumni' ? 'Mezun' : user?.role})</span>
            </button>
          )}

          <button onClick={() => handleNavClick('home')} className="w-full text-left p-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 font-semibold text-sm">
            Ana Sayfa
          </button>

          <div className="space-y-1 pl-3 border-l-2 border-burgundy-700">
            <span className="text-xs font-extrabold uppercase text-burgundy-700 tracking-wider">Kurumsal</span>
            <button onClick={() => handleNavClick('mission')} className="block w-full text-left p-2 text-xs font-medium text-slate-600 dark:text-slate-300">
              Misyon & Vizyon
            </button>
            <button onClick={() => handleNavClick('career-center')} className="block w-full text-left p-2 text-xs font-medium text-slate-600 dark:text-slate-300">
              Kariyer Merkezi
            </button>
          </div>

          {user?.role !== 'Employer' && (
            <button onClick={() => handleNavClick('jobs')} className="w-full text-left p-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 font-semibold text-sm">
              İş / Staj İlanları
            </button>
          )}

          {user?.role !== 'Employer' && (
            <button onClick={() => handleNavClick('companies')} className="w-full text-left p-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 font-semibold text-sm">
              Firmalar
            </button>
          )}



          <button onClick={() => handleNavClick('announcements')} className="w-full text-left p-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 font-semibold text-sm">
            Duyurular
          </button>
        </div>
      </Drawer>
    </header>
  );
};
