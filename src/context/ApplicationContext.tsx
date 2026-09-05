import React, { createContext, useContext, useState, useEffect } from 'react';

export interface ApplicationItem {
  id: string;
  jobId: string;
  studentId: string;
  studentName: string;
  stage: 'applied' | 'screening' | 'test' | 'interview' | 'offer' | 'hired';
  appliedDate: string;
}

interface ApplicationContextType {
  applications: ApplicationItem[];
  updateApplicationStage: (appId: string, stage: ApplicationItem['stage']) => void;
}

const ApplicationContext = createContext<ApplicationContextType | undefined>(undefined);

export const ApplicationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [applications, setApplications] = useState<ApplicationItem[]>(() => {
    try {
      const saved = localStorage.getItem('ktun_applications');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('ktun_applications', JSON.stringify(applications));
    } catch {
      // Storage error fallback
    }
  }, [applications]);

  const updateApplicationStage = (appId: string, stage: ApplicationItem['stage']) => {
    setApplications((prev) =>
      prev.map((app) => (app.id === appId ? { ...app, stage } : app))
    );
  };

  return (
    <ApplicationContext.Provider value={{ applications, updateApplicationStage }}>
      {children}
    </ApplicationContext.Provider>
  );
};

export const useApplication = () => {
  const context = useContext(ApplicationContext);
  if (!context) {
    throw new Error('useApplication must be used within an ApplicationProvider');
  }
  return context;
};
