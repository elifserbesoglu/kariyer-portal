namespace Ktun.CareerPortal.Api.Attributes;

using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using System.Security.Claims;

[AttributeUsage(AttributeTargets.Class | AttributeTargets.Method, AllowMultiple = true)]
public class RequireRoleAttribute : Attribute, IAuthorizationFilter
{
    private readonly string[] _allowedRoles;

    public RequireRoleAttribute(params string[] allowedRoles)
    {
        _allowedRoles = allowedRoles;
    }

    public void OnAuthorization(AuthorizationFilterContext context)
    {
        var user = context.HttpContext.User;
        if (user == null || !user.Identity?.IsAuthenticated == true)
        {
            context.Result = new JsonResult(new { statusCode = 401, message = "Oturum açılması gerekiyor." }) { StatusCode = 401 };
            return;
        }

        var userRole = user.FindFirst(ClaimTypes.Role)?.Value;
        if (string.IsNullOrEmpty(userRole) || !_allowedRoles.Contains(userRole))
        {
            context.Result = new JsonResult(new { statusCode = 403, message = $"Yetkisiz erişim. Rolünüz: '{userRole}' bu işlem için yetersiz." }) { StatusCode = 403 };
        }
    }
}
