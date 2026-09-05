using System.Collections.Generic;
using System.Threading.Tasks;
using Ktun.CareerPortal.Domain.Entities;

namespace Ktun.CareerPortal.Infrastructure.Services.Workflow
{
    public interface IWorkflowEngine
    {
        Task<IEnumerable<WorkflowStageDefinition>> GetActivePipelineStagesAsync();
        Task<WorkflowStageDefinition> AddStageAsync(WorkflowStageDefinition stage);
        Task<bool> ReorderStagesAsync(List<string> orderedStageIds);
    }
}
