namespace Ktun.CareerPortal.Infrastructure.Persistence;

using Microsoft.EntityFrameworkCore;
using Ktun.CareerPortal.Domain.Entities;

public class KtunDbContextSpec : DbContext
{
    public KtunDbContextSpec(DbContextOptions<KtunDbContextSpec> options) : base(options) { }

    public DbSet<User> Users => Set<User>();
    public DbSet<Company> Companies => Set<Company>();
    public DbSet<JobPosting> JobPostings => Set<JobPosting>();
    public DbSet<Application> Applications => Set<Application>();
    public DbSet<UserDocument> UserDocuments => Set<UserDocument>();
    public DbSet<CalendarEvent> CalendarEvents => Set<CalendarEvent>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // School Rule 1: Turkish Table Names
        // School Rule 2: PK naming convention <TabloName>ID as the first column
        // School Rule 3: Soft delete with 'Arsiv' column as the last column, filtered out when Arsiv == true

        // 1. User -> Kullanici Table Configuration
        modelBuilder.Entity<User>(builder =>
        {
            builder.ToTable("Kullanici");
            builder.HasKey(u => u.Id);
            builder.Property(u => u.Id).HasColumnName("KullaniciID");
            builder.HasIndex(u => u.Email).IsUnique();
            builder.HasIndex(u => u.StudentNumber).IsUnique().HasFilter("[StudentNumber] IS NOT NULL");
            builder.Property(u => u.Email).HasMaxLength(150).IsRequired();
            builder.Property(u => u.FullName).HasMaxLength(100).IsRequired();
            builder.Property(u => u.Arsiv).HasColumnName("Arsiv").HasDefaultValue(false);
            builder.HasQueryFilter(u => !u.Arsiv);
        });

        // 2. Company -> Firma Table Configuration
        modelBuilder.Entity<Company>(builder =>
        {
            builder.ToTable("Firma");
            builder.HasKey(c => c.Id);
            builder.Property(c => c.Id).HasColumnName("FirmaID");
            builder.HasIndex(c => c.TaxNumber).IsUnique();
            builder.HasIndex(c => c.Email).IsUnique();
            builder.Property(c => c.CompanyName).HasMaxLength(200).IsRequired();
            builder.Property(c => c.TaxNumber).HasMaxLength(11).IsRequired();
            builder.Property(c => c.Arsiv).HasColumnName("Arsiv").HasDefaultValue(false);
            builder.HasQueryFilter(c => !c.Arsiv);
        });

        // 3. JobPosting -> IsIlani Table Configuration
        modelBuilder.Entity<JobPosting>(builder =>
        {
            builder.ToTable("IsIlani");
            builder.HasKey(j => j.Id);
            builder.Property(j => j.Id).HasColumnName("IsIlaniID");
            builder.HasIndex(j => j.CompanyId);
            builder.HasIndex(j => j.ModerationStatus);
            builder.Property(j => j.Arsiv).HasColumnName("Arsiv").HasDefaultValue(false);
            builder.HasQueryFilter(j => !j.Arsiv);
        });

        // 4. Application -> Basvuru Table Configuration
        modelBuilder.Entity<Application>(builder =>
        {
            builder.ToTable("Basvuru");
            builder.HasKey(a => a.Id);
            builder.Property(a => a.Id).HasColumnName("BasvuruID");
            builder.HasIndex(a => a.JobPostingId);
            builder.HasIndex(a => a.StudentId);
            builder.Property(a => a.Arsiv).HasColumnName("Arsiv").HasDefaultValue(false);
            builder.HasQueryFilter(a => !a.Arsiv);
        });

        // 5. UserDocument -> KullaniciBelgesi Table Configuration
        modelBuilder.Entity<UserDocument>(builder =>
        {
            builder.ToTable("KullaniciBelgesi");
            builder.HasKey(d => d.Id);
            builder.Property(d => d.Id).HasColumnName("KullaniciBelgesiID");
            builder.Property(d => d.Arsiv).HasColumnName("Arsiv").HasDefaultValue(false);
            builder.HasQueryFilter(d => !d.Arsiv);
        });

        // 6. CalendarEvent -> TakvimEtkinligi Table Configuration
        modelBuilder.Entity<CalendarEvent>(builder =>
        {
            builder.ToTable("TakvimEtkinligi");
            builder.HasKey(e => e.Id);
            builder.Property(e => e.Id).HasColumnName("TakvimEtkinligiID");
            builder.Property(e => e.Arsiv).HasColumnName("Arsiv").HasDefaultValue(false);
            builder.HasQueryFilter(e => !e.Arsiv);
        });
    }

    public override async Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
    {
        foreach (var entry in ChangeTracker.Entries<ISoftDelete>())
        {
            switch (entry.State)
            {
                case EntityState.Deleted:
                    // School Rule: Soft Delete method - set Arsiv = true and do NOT physically delete
                    entry.State = EntityState.Modified;
                    entry.Entity.Arsiv = true;
                    entry.Entity.DeletedAt = DateTime.UtcNow;
                    break;
            }
        }
        return await base.SaveChangesAsync(cancellationToken);
    }
}
