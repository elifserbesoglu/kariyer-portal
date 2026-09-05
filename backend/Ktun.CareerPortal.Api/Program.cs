using Ktun.CareerPortal.Infrastructure.Persistence;
using Ktun.CareerPortal.Infrastructure.Repositories;
using Ktun.CareerPortal.Infrastructure.Services;
using Ktun.CareerPortal.Api.Middlewares;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

var connectionString = builder.Configuration.GetConnectionString("DefaultConnection") 
    ?? "Server=localhost;Database=KtunCareerPortalDb;Trusted_Connection=True;TrustServerCertificate=True;";

builder.Services.AddDbContext<KtunDbContextSpec>(options =>
    options.UseSqlServer(connectionString));

// Register Rate Limiting
builder.Services.AddCustomRateLimiter();

// Register Repository Pattern & Unit of Work Services
builder.Services.AddScoped(typeof(IRepositorySpec<,>), typeof(RepositorySpec<,>));
builder.Services.AddScoped<IUnitOfWorkSpec, UnitOfWorkSpec>();

// Register Auth Services
builder.Services.AddSingleton<JwtTokenServiceSpec>();
builder.Services.AddScoped<IdentityAuthServiceSpec>();

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();

var app = builder.Build();

app.UseMiddleware<AuditLoggingMiddlewareSpec>();
app.UseMiddleware<SecurityHeadersMiddlewareSpec>();
app.UseRateLimiter();
app.UseMiddleware<CsrfProtectionMiddlewareSpec>();
app.UseRouting();
app.UseAuthorization();
app.MapControllers();

app.Run();
