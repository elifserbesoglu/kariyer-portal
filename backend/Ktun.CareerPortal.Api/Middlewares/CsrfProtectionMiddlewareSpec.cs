namespace Ktun.CareerPortal.Api.Middlewares;

public class CsrfProtectionMiddlewareSpec
{
    private readonly RequestDelegate _next;

    public CsrfProtectionMiddlewareSpec(RequestDelegate next)
    {
        _next = next;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        var method = context.Request.Method;

        // Skip CSRF validation for safe HTTP GET, HEAD, OPTIONS methods
        if (HttpMethods.IsGet(method) || HttpMethods.IsHead(method) || HttpMethods.IsOptions(method))
        {
            await _next(context);
            return;
        }

        // Validate presence of Authorization header or X-XSRF-TOKEN header for state-changing requests
        var hasAuthHeader = context.Request.Headers.ContainsKey("Authorization");
        var hasCsrfHeader = context.Request.Headers.ContainsKey("X-XSRF-TOKEN");

        if (!hasAuthHeader && !hasCsrfHeader)
        {
            context.Response.StatusCode = StatusCodes.Status403Forbidden;
            context.Response.ContentType = "application/json";
            await context.Response.WriteAsync("{\"statusCode\":403,\"message\":\"Güvenlik Uyarısı: CSRF Jetonu veya Authorization başlığı eksik.\"}");
            return;
        }

        await _next(context);
    }
}
