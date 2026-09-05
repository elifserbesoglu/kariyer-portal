namespace Ktun.CareerPortal.Infrastructure.Services;

using System.Security.Cryptography;
using System.Text;
using Ktun.CareerPortal.Domain.Entities;

public class IdentityAuthServiceSpec
{
    private readonly JwtTokenServiceSpec _jwtTokenService;

    public IdentityAuthServiceSpec(JwtTokenServiceSpec jwtTokenService)
    {
        _jwtTokenService = jwtTokenService;
    }

    public string HashPassword(string password)
    {
        using var sha256 = SHA256.Create();
        var saltedPassword = $"{password}_KTUN_SALT_2026";
        var bytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(saltedPassword));
        return Convert.ToBase64String(bytes);
    }

    public bool VerifyPassword(string password, string storedHash)
    {
        var computedHash = HashPassword(password);
        return computedHash == storedHash;
    }

    public (bool isSuccess, string message, string? accessToken, string? refreshToken) Authenticate(User user, string inputPassword)
    {
        if (user == null || user.IsDeleted)
        {
            return (false, "Kullanıcı bulunamadı veya hesabı pasif.", null, null);
        }

        if (!VerifyPassword(inputPassword, user.PasswordHash))
        {
            return (false, "E-posta veya parola hatalı.", null, null);
        }

        var (accessToken, refreshToken, _) = _jwtTokenService.GenerateTokens(user.Id.ToString(), user.Email, user.Role);
        return (true, "Giriş başarılı.", accessToken, refreshToken);
    }
}
