import React, { createContext, useContext, useState, useEffect } from 'react';
import type { JobPostingDto } from '../types/api';

interface JobContextType {
  jobPostings: JobPostingDto[];
  approveJobPosting: (jobId: string) => void;
  requestJobRevision: (jobId: string, notes: string) => void;
}

const JobContext = createContext<JobContextType | undefined>(undefined);

export const JobProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [jobPostings, setJobPostings] = useState<JobPostingDto[]>(() => {
    try {
      const saved = localStorage.getItem('ktun_job_postings');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('ktun_job_postings', JSON.stringify(jobPostings));
    } catch {
      // Storage error fallback
    }
  }, [jobPostings]);

  const approveJobPosting = (jobId: string) => {
    setJobPostings((prev) =>
      prev.map((j) => (j.id === jobId ? { ...j, status: 'Active' as const } : j))
    );
  };

  const requestJobRevision = (jobId: string, notes: string) => {
    setJobPostings((prev) =>
      prev.map((j) => (j.id === jobId ? { ...j, status: 'Draft' as const, revisionNotes: notes } : j))
    );
  };

  return (
    <JobContext.Provider value={{ jobPostings, approveJobPosting, requestJobRevision }}>
      {children}
    </JobContext.Provider>
  );
};

export const useJob = () => {
  const context = useContext(JobContext);
  if (!context) {
    throw new Error('useJob must be used within a JobProvider');
  }
  return context;
};
