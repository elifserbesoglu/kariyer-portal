import React from 'react';
import { usePublicRouter } from '../../router/PublicRouter';
import { PublicLayout } from '../../layouts/PublicLayout';

import { HomePage } from './HomePage';
import { JobSearchPage } from './JobSearchPage';
import { JobDetailPage } from './JobDetailPage';
import { CompaniesPage } from './CompaniesPage';
import { CompanyDetailPage } from './CompanyDetailPage';
import { AnnouncementsPage } from './AnnouncementsPage';
import { AnnouncementDetailPage } from './AnnouncementDetailPage';
import { MissionPage } from './MissionPage';
import { VisionPage } from './VisionPage';
import { CareerCenterPage } from './CareerCenterPage';
import { ContactPage } from './ContactPage';
import { KvkkPage, PrivacyPage, CookiePolicyPage, TermsPage } from './LegalPages';
import { Error404, Error403, Error500 } from '../../features/errors/ErrorPages';

export const PublicAppContent: React.FC<{ onSwitchRole?: (role: string) => void }> = ({ onSwitchRole }) => {
  const { currentRoute, navigate } = usePublicRouter();

  const renderPage = () => {
    switch (currentRoute) {
      case 'home':
        return <HomePage />;
      case 'jobs':
        return <JobSearchPage />;
      case 'job-detail':
        return <JobDetailPage />;
      case 'companies':
        return <CompaniesPage />;
      case 'company-detail':
        return <CompanyDetailPage />;
      case 'announcements':
        return <AnnouncementsPage />;
      case 'announcement-detail':
        return <AnnouncementDetailPage />;
      case 'mission':
        return <MissionPage />;
      case 'vision':
        return <VisionPage />;
      case 'career-center':
        return <CareerCenterPage />;
      case 'contact':
        return <ContactPage />;
      case 'kvkk':
        return <KvkkPage />;
      case 'privacy':
        return <PrivacyPage />;
      case 'cookie':
        return <CookiePolicyPage />;
      case 'terms':
        return <TermsPage />;
      case 'error-403':
        return <Error403 onGoHome={() => navigate('home')} />;
      case 'error-500':
        return <Error500 onRetry={() => navigate('home')} />;
      case 'error-404':
      default:
        return <Error404 onGoHome={() => navigate('home')} />;
    }
  };

  return (
    <PublicLayout onRoleChange={onSwitchRole}>
      {renderPage()}
    </PublicLayout>
  );
};

export const PublicAppContainer: React.FC<{ onSwitchRole?: (role: string) => void }> = ({ onSwitchRole }) => {
  return <PublicAppContent onSwitchRole={onSwitchRole} />;
};
