namespace Ktun.CareerPortal.Api.Middlewares;

using System.Net;
using System.Text.Json;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;

public class GlobalExceptionMiddlewareSpec
{
    private readonly RequestDelegate _next;
    private readonly ILogger<GlobalExceptionMiddlewareSpec> _logger;

    public GlobalExceptionMiddlewareSpec(RequestDelegate next, ILogger<GlobalExceptionMiddlewareSpec> logger)
    {
        _next = next;
        _logger = logger;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await _next(context);
        }
        catch (Exception ex)
        {
            var traceId = context.TraceIdentifier ?? $"tr-{Guid.NewGuid():N}";
            _logger.LogError(ex, "[GlobalExceptionMiddleware] Unhandled exception caught. TraceId: {TraceId}", traceId);
            await HandleExceptionAsync(context, ex, traceId);
        }
    }

    private static Task HandleExceptionAsync(HttpContext context, Exception exception, string traceId)
    {
        context.Response.ContentType = "application/json";
        context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;

        var responsePayload = new
        {
            statusCode = context.Response.StatusCode,
            message = "Sunucuda beklenmeyen bir hata oluştu. Lütfen sistem yöneticisiyle iletişime geçin.",
            detailedMessage = exception.Message,
            traceId = traceId,
            timestamp = DateTime.UtcNow.ToString("o")
        };

        var options = new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase };
        return context.Response.WriteAsync(JsonSerializer.Serialize(responsePayload, options));
    }
}
