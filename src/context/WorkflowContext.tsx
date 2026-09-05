import React, { createContext, useContext, useState, useEffect } from 'react';
import type { UserRole } from '../types/auth';
import { companyService } from '../services/companyService';
import { jobService } from '../services/jobService';
import { applicationService } from '../services/applicationService';
import { authService } from '../services/authService';

export interface WorkflowCompany {
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
  riskLevel?: 'Low' | 'Medium' | 'High';
  notes?: string;
}

export interface WorkflowJob {
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

export interface WorkflowApplication {
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
  matchScore?: string;
}

export interface WorkflowNotification {
  id: string;
  recipientEmail?: string;
  recipientDepartment?: string;
  recipientRole?: UserRole;
  title: string;
  message: string;
  timestamp: string;
  status: 'unread' | 'read' | 'archived';
  type: 'info' | 'success' | 'warning';
}

export interface WorkflowAuditLog {
  id: string;
  timestamp: string;
  userEmail: string;
  action: string;
  entityName: string;
  entityId: string;
  ipAddress: string;
  details: string;
}

interface WorkflowContextType {
  companies: WorkflowCompany[];
  jobs: WorkflowJob[];
  applications: WorkflowApplication[];
  notifications: WorkflowNotification[];
  auditLogs: WorkflowAuditLog[];

  registerEmployerCompany: (data: Omit<WorkflowCompany, 'id' | 'applicationDate' | 'approvalStatus'>) => WorkflowCompany;
  approveCompany: (companyId: string, reviewerEmail: string, notes?: string) => void;
  rejectCompany: (companyId: string, reviewerEmail: string, notes: string) => void;

  createJobPosting: (data: Omit<WorkflowJob, 'id' | 'createdDate' | 'moderationStatus'>, isDraft?: boolean) => WorkflowJob;
  updateJobPosting: (jobId: string, updatedData: Partial<WorkflowJob>) => void;
  deleteJobPosting: (jobId: string) => void;
  approveJobPosting: (jobId: string, reviewerEmail: string) => void;
  requestJobRevision: (jobId: string, reviewerEmail: string, revisionNotes: string) => void;

  submitStudentApplication: (jobId: string, studentId: string, studentName: string, studentEmail: string, department: string, gpa: string, cvTitle: string, userRole?: string) => WorkflowApplication;
  moveAtsCandidateStage: (applicationId: string, newStage: WorkflowApplication['stage'], updatedByEmail: string, notes?: string) => void;

  markNotificationRead: (notificationId: string) => void;
  archiveNotification: (notificationId: string) => void;
  logAudit: (userEmail: string, action: string, entityName: string, entityId: string, details: string) => void;
}

const WorkflowContext = createContext<WorkflowContextType | undefined>(undefined);

export const WorkflowProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [companies, setCompanies] = useState<WorkflowCompany[]>(() => {
    const saved = localStorage.getItem('ktun_wf_companies');
    return saved ? JSON.parse(saved) : [
      {
        id: 'cmp-101',
        companyName: 'ASELSAN Konya Silah Sistemleri A.Ş.',
        taxNumber: '1234567890',
        taxOffice: 'Selçuklu Vergi Dairesi',
        authorizedPerson: 'Mehmet Yılmaz (İK Müdürü)',
        phone: '+90 332 333 44 55',
        email: 'ik@aselsankonya.com.tr',
        sector: 'Savunma Sanayii',
        applicationDate: '10.05.2024',
        taxDocumentUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=600&q=80',
        approvalStatus: 'Approved',
        riskLevel: 'Low',
      },
      {
        id: 'cmp-102',
        companyName: 'Yeni Teknoloji ve Robotik Ltd.',
        taxNumber: '9876543210',
        taxOffice: 'Meram Vergi Dairesi',
        authorizedPerson: 'Ahmet Kaya',
        phone: '+90 332 999 88 77',
        email: 'info@yeni-teknoloji.com',
        sector: 'Robotik & Otomasyon',
        applicationDate: '14.05.2024',
        taxDocumentUrl: 'https://images.unsplash.com/photo-1568992687947-868a62a9f521?auto=format&fit=crop&w=600&q=80',
        approvalStatus: 'PendingApproval',
        riskLevel: 'Low',
      },
    ];
  });

  const [jobs, setJobs] = useState<WorkflowJob[]>(() => {
    const saved = localStorage.getItem('ktun_wf_jobs');
    return saved ? JSON.parse(saved) : [
      {
        id: 'job-1',
        companyId: 'cmp-101',
        companyName: 'ASELSAN Konya Silah Sistemleri A.Ş.',
        title: 'Yazılım Geliştirme Mühendisi (Gömülü C++)',
        location: 'Konya / Selçuklu',
        workType: 'Tam Zamanlı',
        description: 'Gömülü sistemler, C/C++ ve RTOS konularında çalışacak KTÜN mezun ve 4. sınıf öğrencileri.',
        requirements: ['C++20 ve STL hakimiyeti', 'ROS2 veya RTOS tecrübesi', 'GANO ≥ 3.00'],
        targetedDepartments: ['Bilgisayar Mühendisliği', 'Elektrik-Elektronik Mühendisliği'],
        createdDate: '15.05.2024',
        deadlineDate: '30.06.2024',
        moderationStatus: 'Published',
      },
      {
        id: 'job-2',
        companyId: 'cmp-102',
        companyName: 'Yeni Teknoloji ve Robotik Ltd.',
        title: 'Otonom Sistemler Araştırma Stajyeri',
        location: 'Konya Teknokent',
        workType: 'Aday Mühendis',
        description: 'Görüntü işleme ve otonom araç algoritmaları geliştirecek stajyer mühendisler.',
        requirements: ['Python, OpenCV, PyTorch', 'ROS2 altyapısı'],
        targetedDepartments: ['Bilgisayar Mühendisliği', 'Makine Mühendisliği'],
        createdDate: '16.05.2024',
        deadlineDate: '15.07.2024',
        moderationStatus: 'PendingModeration',
      },
    ];
  });

  const [applications, setApplications] = useState<WorkflowApplication[]>(() => {
    const saved = localStorage.getItem('ktun_wf_applications');
    return saved ? JSON.parse(saved) : [
      {
        id: 'app-1',
        jobId: 'job-1',
        jobTitle: 'Yazılım Geliştirme Mühendisi (Gömülü C++)',
        companyName: 'ASELSAN Konya Silah Sistemleri A.Ş.',
        studentId: '20120033001',
        studentName: 'Emre Tunç',
        studentEmail: 'emre.tunc@ogr.ktun.edu.tr',
        studentPhone: '+90 555 123 45 67',
        department: 'Bilgisayar Mühendisliği',
        gpa: '3.42',
        appliedDate: '15.05.2024',
        stage: 'interview',
        cvTitle: 'ATS_Format_Emre_Tunc_CV.pdf',
      },
    ];
  });

  const [notifications, setNotifications] = useState<WorkflowNotification[]>(() => {
    const saved = localStorage.getItem('ktun_wf_notifications');
    return saved ? JSON.parse(saved) : [
      {
        id: 'notif-1',
        recipientEmail: 'emre.tunc@ogr.ktun.edu.tr',
        recipientDepartment: 'Bilgisayar Mühendisliği',
        title: 'Mülakat Daveti Alındı!',
        message: 'ASELSAN Konya başvurdunuz ilan için mülakat aşamasına ilerlediniz.',
        timestamp: '15.05.2024 14:30',
        status: 'unread',
        type: 'success',
      },
    ];
  });

  const [auditLogs, setAuditLogs] = useState<WorkflowAuditLog[]>(() => {
    const saved = localStorage.getItem('ktun_wf_audit_logs');
    return saved ? JSON.parse(saved) : [
      {
        id: 'audit-1',
        timestamp: '15.05.2024 10:00',
        userEmail: 'system@ktun.edu.tr',
        action: 'SYSTEM_INITIALIZED',
        entityName: 'System',
        entityId: 'root',
        ipAddress: '127.0.0.1',
        details: 'KTÜN Kariyer Portalı İş Akış Motoru Başlatıldı.',
      },
    ];
  });

  const safeSave = (key: string, data: any) => {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
      console.warn(`[WorkflowStorage] Quota limit encountered for ${key}, skipping storage update.`, e);
    }
  };

  useEffect(() => { safeSave('ktun_wf_companies', companies); }, [companies]);
  useEffect(() => { safeSave('ktun_wf_jobs', jobs); }, [jobs]);
  useEffect(() => { safeSave('ktun_wf_applications', applications); }, [applications]);
  useEffect(() => { safeSave('ktun_wf_notifications', notifications); }, [notifications]);
  useEffect(() => { safeSave('ktun_wf_audit_logs', auditLogs.slice(0, 50)); }, [auditLogs]);

  const logAudit = (userEmail: string, action: string, entityName: string, entityId: string, details: string) => {
    const newLog: WorkflowAuditLog = {
      id: `audit-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      timestamp: new Date().toLocaleString('tr-TR'),
      userEmail,
      action,
      entityName,
      entityId,
      ipAddress: '193.140.230.15',
      details,
    };
    setAuditLogs((prev) => [newLog, ...prev]);
  };

  const registerEmployerCompany = (data: Omit<WorkflowCompany, 'id' | 'applicationDate' | 'approvalStatus'>): WorkflowCompany => {
    const newCompany: WorkflowCompany = {
      ...data,
      id: `cmp-${Date.now()}`,
      applicationDate: new Date().toLocaleDateString('tr-TR'),
      approvalStatus: 'PendingApproval',
      riskLevel: 'Low',
    };
    setCompanies((prev) => [newCompany, ...prev]);
    logAudit(data.email, 'REGISTER_EMPLOYER', 'Company', newCompany.id, `${data.companyName} firması kayıt oldu. Durum: PendingApproval.`);

    // Async REST API Call
    authService.registerEmployer({
      companyName: data.companyName,
      taxNumber: data.taxNumber,
      taxOffice: data.taxOffice,
      authorizedPerson: data.authorizedPerson,
      email: data.email,
      phone: data.phone,
      sector: data.sector,
      taxDocumentUrl: data.taxDocumentUrl,
    }).catch((e) => console.info('[REST API Sync] Register Employer queued.', e));

    return newCompany;
  };

  const approveCompany = (companyId: string, reviewerEmail: string, notes?: string) => {
    setCompanies((prev) =>
      prev.map((c) => (c.id === companyId ? { ...c, approvalStatus: 'Approved', notes } : c))
    );
    const target = companies.find((c) => c.id === companyId);
    if (target) {
      logAudit(reviewerEmail, 'APPROVE_COMPANY', 'Company', companyId, `${target.companyName} onaylandı.`);
    }

    // Async REST API Call
    companyService.approveCompany(companyId, reviewerEmail, notes)
      .catch((e) => console.info('[REST API Sync] Approve Company queued.', e));
  };

  const rejectCompany = (companyId: string, reviewerEmail: string, notes: string) => {
    setCompanies((prev) =>
      prev.map((c) => (c.id === companyId ? { ...c, approvalStatus: 'Rejected', notes } : c))
    );
    const target = companies.find((c) => c.id === companyId);
    if (target) {
      logAudit(reviewerEmail, 'REJECT_COMPANY', 'Company', companyId, `${target.companyName} reddedildi. Not: ${notes}`);
    }

    // Async REST API Call
    companyService.rejectCompany(companyId, reviewerEmail, notes)
      .catch((e) => console.info('[REST API Sync] Reject Company queued.', e));
  };

  const createJobPosting = (data: Omit<WorkflowJob, 'id' | 'createdDate' | 'moderationStatus'>, isDraft?: boolean): WorkflowJob => {
    const newJob: WorkflowJob = {
      ...data,
      id: `job-${Date.now()}`,
      createdDate: new Date().toLocaleDateString('tr-TR'),
      moderationStatus: isDraft ? 'Draft' : 'Published',
    };
    setJobs((prev) => [newJob, ...prev]);
    logAudit(data.companyName, 'CREATE_JOB', 'JobPosting', newJob.id, `${data.title} ilanı oluşturuldu. Durum: ${newJob.moderationStatus}.`);

    // Async REST API Call
    jobService.createJobPosting({
      title: data.title,
      workType: data.workType,
      location: data.location,
      description: data.description,
      requirements: data.requirements,
      targetedDepartments: data.targetedDepartments,
      deadlineDate: data.deadlineDate,
      isDraft,
    }).catch((e) => console.info('[REST API Sync] Create Job Posting queued.', e));

    return newJob;
  };

  const updateJobPosting = (jobId: string, updatedData: Partial<WorkflowJob>) => {
    setJobs((prev) =>
      prev.map((j) => (j.id === jobId ? { ...j, ...updatedData } : j))
    );
    const target = jobs.find((j) => j.id === jobId);
    if (target) {
      logAudit(target.companyName, 'UPDATE_JOB', 'JobPosting', jobId, `İlan güncellendi: ${updatedData.title || target.title}`);
    }
  };

  const deleteJobPosting = (jobId: string) => {
    const target = jobs.find((j) => j.id === jobId);
    setJobs((prev) => prev.filter((j) => j.id !== jobId));
    if (target) {
      logAudit(target.companyName, 'DELETE_JOB', 'JobPosting', jobId, `İlan silindi: ${target.title}`);
    }
  };

  const approveJobPosting = (jobId: string, reviewerEmail: string) => {
    setJobs((prev) =>
      prev.map((j) => (j.id === jobId ? { ...j, moderationStatus: 'Published' } : j))
    );
    const target = jobs.find((j) => j.id === jobId);
    if (target) {
      logAudit(reviewerEmail, 'APPROVE_JOB', 'JobPosting', jobId, `İlan onaylandı ve yayınlandı: ${target.title}`);
    }

    // Async REST API Call
    jobService.approveJobPosting(jobId, reviewerEmail)
      .catch((e) => console.info('[REST API Sync] Approve Job Posting queued.', e));
  };

  const requestJobRevision = (jobId: string, reviewerEmail: string, revisionNotes: string) => {
    setJobs((prev) =>
      prev.map((j) => (j.id === jobId ? { ...j, moderationStatus: 'RevisionRequested', revisionNotes } : j))
    );
    const target = jobs.find((j) => j.id === jobId);
    if (target) {
      logAudit(reviewerEmail, 'REVISE_JOB', 'JobPosting', jobId, `İlan için düzenleme istendi: ${target.title}. Not: ${revisionNotes}`);
    }

    // Async REST API Call
    jobService.requestJobRevision(jobId, reviewerEmail, revisionNotes)
      .catch((e) => console.info('[REST API Sync] Request Job Revision queued.', e));
  };

  const submitStudentApplication = (
    jobId: string,
    studentId: string,
    studentName: string,
    studentEmail: string,
    department: string,
    gpa: string,
    cvTitle: string,
    userRole?: string
  ): WorkflowApplication => {
    if (userRole && userRole !== 'Student' && userRole !== 'Alumni') {
      console.warn(`[Security Audit] Role '${userRole}' blocked from job application.`);
      throw new Error(`[403 Forbidden] '${userRole}' hesabı ile aday başvurusu oluşturulamaz.`);
    }
    const job = jobs.find((j) => j.id === jobId);
    const newApp: WorkflowApplication = {
      id: `app-${Date.now()}`,
      jobId,
      jobTitle: job?.title || 'İlan',
      companyName: job?.companyName || 'Firma',
      studentId,
      studentName,
      studentEmail,
      studentPhone: '+90 555 000 00 00',
      department,
      gpa,
      appliedDate: new Date().toLocaleDateString('tr-TR'),
      stage: 'applied',
      cvTitle,
    };
    setApplications((prev) => [newApp, ...prev]);
    logAudit(studentEmail, 'SUBMIT_APPLICATION', 'Application', newApp.id, `${job?.companyName} - ${job?.title} pozisyonuna başvuru yapıldı.`);

    // Async REST API Call
    applicationService.submitApplication(jobId, studentId, cvTitle)
      .catch((e) => console.info('[REST API Sync] Submit Application queued.', e));

    return newApp;
  };

  const moveAtsCandidateStage = (applicationId: string, newStage: WorkflowApplication['stage'], updatedByEmail: string, notes?: string) => {
    setApplications((prev) =>
      prev.map((a) => (a.id === applicationId ? { ...a, stage: newStage, stageNotes: notes } : a))
    );
    const target = applications.find((a) => a.id === applicationId);
    if (target) {
      logAudit(updatedByEmail, 'MOVE_ATS_STAGE', 'Application', applicationId, `${target.studentName} adlı adayın aşaması '${newStage}' olarak güncellendi.`);
    }

    // Async REST API Call
    applicationService.updateCandidateStage(applicationId, newStage, updatedByEmail, notes)
      .catch((e) => console.info('[REST API Sync] Move ATS Stage queued.', e));
  };

  const markNotificationRead = (notificationId: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === notificationId ? { ...n, status: 'read' } : n))
    );
  };

  const archiveNotification = (notificationId: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === notificationId ? { ...n, status: 'archived' } : n))
    );
  };

  return (
    <WorkflowContext.Provider
      value={{
        companies,
        jobs,
        applications,
        notifications,
        auditLogs,
        registerEmployerCompany,
        approveCompany,
        rejectCompany,
        createJobPosting,
        updateJobPosting,
        deleteJobPosting,
        approveJobPosting,
        requestJobRevision,
        submitStudentApplication,
        moveAtsCandidateStage,
        markNotificationRead,
        archiveNotification,
        logAudit,
      }}
    >
      {children}
    </WorkflowContext.Provider>
  );
};

export const useWorkflow = () => {
  const context = useContext(WorkflowContext);
  if (!context) {
    throw new Error('useWorkflow must be used within a WorkflowProvider');
  }
  return context;
};
