namespace Ktun.CareerPortal.UnitTests;

using Xunit;
using Ktun.CareerPortal.Infrastructure.Services;
using Ktun.CareerPortal.Domain.Entities;

public class JwtTokenServiceTests
{
    [Fact]
    public void GenerateTokens_ShouldReturnValidAccessTokenAndRefreshToken()
    {
        // Arrange
        var jwtService = new JwtTokenServiceSpec();
        var userId = Guid.NewGuid().ToString();
        var email = "emre.tunc@ogr.ktun.edu.tr";
        var role = "Student";

        // Act
        var (accessToken, refreshToken, expiresInSeconds) = jwtService.GenerateTokens(userId, email, role);

        // Assert
        Assert.False(string.IsNullOrWhiteSpace(accessToken));
        Assert.False(string.IsNullOrWhiteSpace(refreshToken));
        Assert.Equal(7200, expiresInSeconds);
    }

    [Fact]
    public void IdentityAuthService_PasswordHashing_ShouldVerifyCorrectly()
    {
        // Arrange
        var jwtService = new JwtTokenServiceSpec();
        var authService = new IdentityAuthServiceSpec(jwtService);
        var password = "SecurePassword123!";

        // Act
        var hash = authService.HashPassword(password);
        var isVerified = authService.VerifyPassword(password, hash);

        // Assert
        Assert.False(string.IsNullOrWhiteSpace(hash));
        Assert.True(isVerified);
    }
}
