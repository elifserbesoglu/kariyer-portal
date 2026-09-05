using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Ktun.CareerPortal.Domain.Entities;

namespace Ktun.CareerPortal.Infrastructure.Services.Workflow
{
    public class DatabaseDrivenWorkflowEngine : IWorkflowEngine
    {
        private readonly List<WorkflowStageDefinition> _stagesStore;

        public DatabaseDrivenWorkflowEngine()
        {
            _stagesStore = new List<WorkflowStageDefinition>
            {
                new WorkflowStageDefinition { Id = "stg-1", Code = "applied", Title = "Başvuruldu", Order = 1, ColorClass = "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200" },
                new WorkflowStageDefinition { Id = "stg-2", Code = "screening", Title = "CV İnceleme", Order = 2, ColorClass = "bg-blue-50 text-blue-800 dark:bg-blue-950 dark:text-blue-200" },
                new WorkflowStageDefinition { Id = "stg-3", Code = "test", Title = "Online Test", Order = 3, ColorClass = "bg-purple-50 text-purple-800 dark:bg-purple-950 dark:text-purple-200" },
                new WorkflowStageDefinition { Id = "stg-4", Code = "interview", Title = "Mülakat", Order = 4, ColorClass = "bg-amber-50 text-amber-800 dark:bg-amber-950 dark:text-amber-200" },
                new WorkflowStageDefinition { Id = "stg-5", Code = "offer", Title = "Teklif", Order = 5, ColorClass = "bg-emerald-50 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200" },
                new WorkflowStageDefinition { Id = "stg-6", Code = "hired", Title = "İşe Alındı", Order = 6, ColorClass = "bg-burgundy-50 text-burgundy-800 dark:bg-burgundy-950 dark:text-burgundy-200" }
            };
        }

        public Task<IEnumerable<WorkflowStageDefinition>> GetActivePipelineStagesAsync()
        {
            return Task.FromResult<IEnumerable<WorkflowStageDefinition>>(_stagesStore.OrderBy(s => s.Order));
        }

        public Task<WorkflowStageDefinition> AddStageAsync(WorkflowStageDefinition stage)
        {
            stage.Order = _stagesStore.Count + 1;
            _stagesStore.Add(stage);
            return Task.FromResult(stage);
        }

        public Task<bool> ReorderStagesAsync(List<string> orderedStageIds)
        {
            for (int i = 0; i < orderedStageIds.Count; i++)
            {
                var stg = _stagesStore.FirstOrDefault(s => s.Id == orderedStageIds[i]);
                if (stg != null)
                {
                    stg.Order = i + 1;
                }
            }
            return Task.FromResult(true);
        }
    }
}
