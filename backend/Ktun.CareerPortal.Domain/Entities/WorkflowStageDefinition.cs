using System;

namespace Ktun.CareerPortal.Domain.Entities
{
    public class WorkflowStageDefinition
    {
        public string Id { get; set; } = Guid.NewGuid().ToString();
        public string Code { get; set; } = string.Empty;
        public string Title { get; set; } = string.Empty;
        public int Order { get; set; }
        public string ColorClass { get; set; } = "bg-slate-100 text-slate-800";
        public bool IsRequired { get; set; } = true;
        public string RequiredPermission { get; set; } = "Applications.ManageStages";
        public string ApprovalRule { get; set; } = "AUTO_PASS";
        public string RollbackRule { get; set; } = "REQUIRES_REASON";
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
