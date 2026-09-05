namespace Ktun.CareerPortal.Api.Middlewares;

public static class SerilogLoggingSpec
{
    public static void LogSystemEvent(string category, string message, string? userEmail = null)
    {
        var timestamp = DateTime.UtcNow.ToString("yyyy-MM-dd HH:mm:ss.fff");
        var logPayload = $"[{timestamp}] [{category.ToUpper()}] User: '{userEmail ?? "System"}' - {message}";
        Console.WriteLine(logPayload);
    }
}
