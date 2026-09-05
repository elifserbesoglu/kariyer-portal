namespace Ktun.CareerPortal.Api.Middlewares;

using System.Diagnostics;
using System.Security.Claims;

public class AuditLoggingMiddlewareSpec
{
    private readonly RequestDelegate _next;

    public AuditLoggingMiddlewareSpec(RequestDelegate next)
    {
        _next = next;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        var stopwatch = Stopwatch.StartNew();
        var requestMethod = context.Request.Method;
        var requestPath = context.Request.Path;
        var clientIp = context.Connection.RemoteIpAddress?.ToString() ?? "unknown";

        await _next(context);

        stopwatch.Stop();
        var statusCode = context.Response.StatusCode;
        var elapsedMs = stopwatch.ElapsedMilliseconds;
        var userEmail = context.User.FindFirst(ClaimTypes.Email)?.Value ?? "Anonymous";

        SerilogLoggingSpec.LogSystemEvent(
            "AUDIT",
            $"{requestMethod} {requestPath} responded {statusCode} in {elapsedMs}ms (IP: {clientIp})",
            userEmail
        );
    }
}
