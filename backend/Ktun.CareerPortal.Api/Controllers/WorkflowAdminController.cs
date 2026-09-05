using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Ktun.CareerPortal.Domain.Entities;
using Ktun.CareerPortal.Infrastructure.Services.Workflow;

namespace Ktun.CareerPortal.Api.Controllers
{
    [ApiController]
    [Route("api/v1/workflow")]
    public class WorkflowAdminController : ControllerBase
    {
        private readonly DatabaseDrivenWorkflowEngine _workflowEngine;

        public WorkflowAdminController()
        {
            _workflowEngine = new DatabaseDrivenWorkflowEngine();
        }

        [HttpGet("stages")]
        public async Task<IActionResult> GetStages()
        {
            var stages = await _workflowEngine.GetActivePipelineStagesAsync();
            return Ok(stages);
        }

        [HttpPost("stages")]
        public async Task<IActionResult> AddStage([FromBody] WorkflowStageDefinition request)
        {
            var created = await _workflowEngine.AddStageAsync(request);
            return Ok(created);
        }

        [HttpPut("stages/reorder")]
        public async Task<IActionResult> ReorderStages([FromBody] List<string> orderedStageIds)
        {
            var success = await _workflowEngine.ReorderStagesAsync(orderedStageIds);
            return Ok(new { success });
        }
    }
}
