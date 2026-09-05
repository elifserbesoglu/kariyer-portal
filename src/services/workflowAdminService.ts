import { apiClient } from './apiClient';

export interface WorkflowStageDto {
  id: string;
  code: string;
  title: string;
  order: number;
  colorClass: string;
  isRequired: boolean;
  requiredPermission: string;
  approvalRule: string;
  rollbackRule: string;
}

export const workflowAdminService = {
  getPipelineStages: async (): Promise<WorkflowStageDto[]> => {
    try {
      const response = await apiClient.get<WorkflowStageDto[]>('/v1/workflow/stages');
      if (response.isSuccess && response.data) {
        return response.data;
      }
    } catch {
      // Fallback Engine Data
    }

    return [
      { id: 'stg-1', code: 'applied', title: 'Başvuruldu', order: 1, colorClass: 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200', isRequired: true, requiredPermission: 'Applications.Submit', approvalRule: 'AUTO_PASS', rollbackRule: 'NONE' },
      { id: 'stg-2', code: 'screening', title: 'CV İnceleme', order: 2, colorClass: 'bg-blue-50 text-blue-800 dark:bg-blue-950 dark:text-blue-200', isRequired: true, requiredPermission: 'Applications.ManageStages', approvalRule: 'HR_REVIEW', rollbackRule: 'REQUIRES_REASON' },
      { id: 'stg-3', code: 'test', title: 'Online Test', order: 3, colorClass: 'bg-purple-50 text-purple-800 dark:bg-purple-950 dark:text-purple-200', isRequired: false, requiredPermission: 'Applications.ManageStages', approvalRule: 'MIN_SCORE_70', rollbackRule: 'REQUIRES_REASON' },
      { id: 'stg-4', code: 'interview', title: 'Mülakat', order: 4, colorClass: 'bg-amber-50 text-amber-800 dark:bg-amber-950 dark:text-amber-200', isRequired: true, requiredPermission: 'Applications.ManageStages', approvalRule: 'PANEL_VERDICT', rollbackRule: 'REQUIRES_REASON' },
      { id: 'stg-5', code: 'offer', title: 'Teklif', order: 5, colorClass: 'bg-emerald-50 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200', isRequired: true, requiredPermission: 'Applications.ManageStages', approvalRule: 'EXEC_SIGN_OFF', rollbackRule: 'REQUIRES_REASON' },
      { id: 'stg-6', code: 'hired', title: 'İşe Alındı', order: 6, colorClass: 'bg-burgundy-50 text-burgundy-800 dark:bg-burgundy-950 dark:text-burgundy-200', isRequired: true, requiredPermission: 'Applications.ManageStages', approvalRule: 'CONTRACT_SIGNED', rollbackRule: 'NONE' },
    ];
  },

  addStage: async (stage: Omit<WorkflowStageDto, 'id' | 'order'>): Promise<WorkflowStageDto> => {
    try {
      const response = await apiClient.post<WorkflowStageDto>('/v1/workflow/stages', stage);
      if (response.isSuccess && response.data) {
        return response.data;
      }
    } catch {
      // Fallback
    }

    return {
      id: `stg-${Date.now()}`,
      order: 7,
      ...stage,
    };
  },
};
