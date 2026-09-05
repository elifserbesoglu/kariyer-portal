namespace Ktun.CareerPortal.IntegrationTests;

using Xunit;
using Ktun.CareerPortal.Api.Controllers;

public class StudentApiIntegrationTests
{
    [Fact]
    public void StudentController_GetProfile_ShouldReturnValidPayload()
    {
        // Arrange
        var controller = new StudentControllerSpec();

        // Act
        var actionResult = controller.GetStudentProfile();

        // Assert
        Assert.NotNull(actionResult);
    }
}
