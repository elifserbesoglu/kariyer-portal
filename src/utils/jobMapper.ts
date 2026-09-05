import { MOCK_JOBS, type JobItem } from '../mockData/publicData';
import type { WorkflowJob } from '../context/WorkflowContext';

export const mapWorkflowJobToJobItem = (wfJob: WorkflowJob): JobItem => {
  const isStaj = wfJob.workType.toLowerCase().includes('staj') || wfJob.workType.toLowerCase().includes('aday');
  
  let parsedWorkType: 'Tam Zamanlı' | 'Yarı Zamanlı' | 'Uzaktan' | 'Hibrit' = 'Tam Zamanlı';
  if (wfJob.workType.includes('Uzaktan')) parsedWorkType = 'Uzaktan';
  else if (wfJob.workType.includes('Hibrit')) parsedWorkType = 'Hibrit';
  else if (wfJob.workType.includes('Yarı Zamanlı')) parsedWorkType = 'Yarı Zamanlı';

  return {
    id: wfJob.id,
    companyId: wfJob.companyId || 'comp-1',
    companyName: wfJob.companyName || 'KTÜN Anlaşmalı Kurum',
    companyLogo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=100&auto=format&fit=crop&q=80',
    title: wfJob.title,
    location: wfJob.location || 'Konya / Selçuklu',
    workType: parsedWorkType,
    jobType: isStaj ? 'Staj İlanı' : 'İş İlanı',
    experience: 'Yeni Mezun / 0-2 Yıl',
    department: wfJob.targetedDepartments[0] || 'Mühendislik Fakültesi',
    publishedDate: wfJob.createdDate || 'Bugün',
    deadline: wfJob.deadlineDate || '30 Gün',
    isFeatured: true,
    viewCount: 1,
    sector: 'Savunma & Teknoloji',
    description: wfJob.description || 'Yeni oluşturulan iş/staj ilanı.',
    responsibilities: [
      'Proje gereksinimlerine uygun yazılım/mühendislik geliştirmeleri yapmak.',
      'Ekip ile düzenli koordinasyon toplantılarına katılmak.',
    ],
    qualifications: wfJob.requirements && wfJob.requirements.length > 0 ? wfJob.requirements : ['KTÜN İlgili Lisans/Önlisans Öğrencisi veya Mezunu', 'GANO ≥ 2.50'],
    perks: ['Servis İmkânı', 'Yemek Kartı', 'Kariyer Gelişim Desteği'],
  };
};

export const getCombinedJobListings = (workflowJobs: WorkflowJob[]): JobItem[] => {
  const publishedWfJobs = workflowJobs.filter(
    (j) => j.moderationStatus === 'Published' || j.moderationStatus === 'PendingModeration'
  );
  
  const mappedWfJobs = publishedWfJobs.map(mapWorkflowJobToJobItem);
  
  const existingIds = new Set(mappedWfJobs.map((j) => j.id));
  const uniqueMockJobs = MOCK_JOBS.filter((j) => !existingIds.has(j.id));
  
  return [...mappedWfJobs, ...uniqueMockJobs];
};
