using Xunit;
using Microsoft.EntityFrameworkCore;
using Ktun.CareerPortal.Domain.Entities;
using Ktun.CareerPortal.Infrastructure.Persistence;
using System;
using System.Threading.Tasks;
using System.Linq;

namespace Ktun.CareerPortal.UnitTests
{
    public class SchoolDatabaseRulesTests
    {
        private KtunDbContextSpec GetInMemoryDbContext()
        {
            var options = new DbContextOptionsBuilder<KtunDbContextSpec>()
                .UseInMemoryDatabase(databaseName: $"KtunTestDb_{Guid.NewGuid()}")
                .Options;

            return new KtunDbContextSpec(options);
        }

        [Fact]
        public async Task Rule1_SoftDelete_Sets_Arsiv_True_And_Filters_From_QueryResults()
        {
            // Arrange
            using var context = GetInMemoryDbContext();
            var user = new User
            {
                Email = "student.test@ogr.ktun.edu.tr",
                PasswordHash = "hash123",
                FullName = "Ahmet Yılmaz",
                PhoneNumber = "+90 555 111 2233",
                Role = "Student",
                Arsiv = false
            };

            await context.Users.AddAsync(user);
            await context.SaveChangesAsync();

            // Act - Soft Delete User
            context.Users.Remove(user);
            await context.SaveChangesAsync();

            // Assert - Query without IgnoreQueryFilters should yield 0 records (hidden from UI)
            var activeUsersCount = await context.Users.CountAsync();
            Assert.Equal(0, activeUsersCount);

            // Assert - Query with IgnoreQueryFilters should reveal Arsiv == true
            var archivedUser = await context.Users.IgnoreQueryFilters().FirstOrDefaultAsync(u => u.Email == "student.test@ogr.ktun.edu.tr");
            Assert.NotNull(archivedUser);
            Assert.True(archivedUser!.Arsiv);
        }

        [Fact]
        public void Rule2_Table_And_PK_Aliases_Match_School_Specification()
        {
            var user = new User();
            var company = new Company();
            var job = new JobPosting();
            var app = new Application();

            var guid = Guid.NewGuid();
            user.KullaniciID = guid;
            company.FirmaID = guid;
            job.IsIlaniID = guid;
            app.BasvuruID = guid;

            Assert.Equal(guid, user.Id);
            Assert.Equal(guid, company.Id);
            Assert.Equal(guid, job.Id);
            Assert.Equal(guid, app.Id);
        }
    }
}
