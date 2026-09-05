import React, { createContext, useContext, useState } from 'react';

export type PublicPageRoute =
  | 'home'
  | 'jobs'
  | 'job-detail'
  | 'companies'
  | 'company-detail'
  | 'announcements'
  | 'announcement-detail'
  | 'mission'
  | 'vision'
  | 'career-center'
  | 'contact'
  | 'kvkk'
  | 'privacy'
  | 'cookie'
  | 'terms'
  | 'error-404'
  | 'error-403'
  | 'error-500';

interface RouterContextType {
  currentRoute: PublicPageRoute;
  routeParams: Record<string, string>;
  navigate: (route: PublicPageRoute, params?: Record<string, string>) => void;
  showLoginRequiredModal: (actionName?: string) => void;
}

const RouterContext = createContext<RouterContextType | undefined>(undefined);

export const PublicRouterProvider: React.FC<{ children: React.ReactNode; onOpenLoginModal?: (action?: string) => void }> = ({ children, onOpenLoginModal }) => {
  const validRoutes: PublicPageRoute[] = [
    'home', 'jobs', 'job-detail', 'companies', 'company-detail',
    'announcements', 'announcement-detail', 'mission',
    'vision', 'career-center', 'contact', 'kvkk',
    'privacy', 'cookie', 'terms', 'error-404', 'error-403', 'error-500'
  ];

  const getInitialRoute = (): PublicPageRoute => {
    if (typeof window === 'undefined') return 'home';
    const hash = window.location.hash.replace(/^#\/?/, '').split('?')[0];
    if (validRoutes.includes(hash as PublicPageRoute)) {
      return hash as PublicPageRoute;
    }
    const saved = sessionStorage.getItem('ktun_public_route');
    if (saved && validRoutes.includes(saved as PublicPageRoute)) {
      return saved as PublicPageRoute;
    }
    return 'home';
  };

  const [currentRoute, setCurrentRoute] = useState<PublicPageRoute>(getInitialRoute);
  const [routeParams, setRouteParams] = useState<Record<string, string>>({});

  React.useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace(/^#\/?/, '').split('?')[0];
      if (validRoutes.includes(hash as PublicPageRoute)) {
        setCurrentRoute(hash as PublicPageRoute);
        sessionStorage.setItem('ktun_public_route', hash);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigate = (route: PublicPageRoute, params: Record<string, string> = {}) => {
    setCurrentRoute(route);
    setRouteParams(params);
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('ktun_public_route', route);
      const targetHash = `#/${route}`;
      if (window.location.hash !== targetHash) {
        window.history.pushState(null, '', targetHash);
      }
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const showLoginRequiredModal = (actionName = 'Bu işlemi gerçekleştirmek') => {
    if (onOpenLoginModal) onOpenLoginModal(actionName);
  };

  return (
    <RouterContext.Provider value={{ currentRoute, routeParams, navigate, showLoginRequiredModal }}>
      {children}
    </RouterContext.Provider>
  );
};

export const usePublicRouter = () => {
  const context = useContext(RouterContext);
  if (!context) {
    throw new Error('usePublicRouter must be used within PublicRouterProvider');
  }
  return context;
};
