namespace Ktun.CareerPortal.Domain.Entities;

public interface ISoftDelete
{
    bool Arsiv { get; set; }
    DateTime? DeletedAt { get; set; }
    string? DeletedBy { get; set; }
}

public abstract class BaseEntity<TId> : ISoftDelete
{
    public TId Id { get; set; } = default!;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public string CreatedBy { get; set; } = "System";
    public DateTime? UpdatedAt { get; set; }
    public string? UpdatedBy { get; set; }
    
    // School Rule: Soft Delete 'Arsiv' column (true = archived/deleted, false = active)
    public bool Arsiv { get; set; } = false;
    public bool IsDeleted { get => Arsiv; set => Arsiv = value; }
    public DateTime? DeletedAt { get; set; }
    public string? DeletedBy { get; set; }
}

public class User : BaseEntity<Guid>
{
    public Guid KullaniciID { get => Id; set => Id = value; }
    public string Email { get; set; } = null!;
    public string PasswordHash { get; set; } = null!;
    public string FullName { get; set; } = null!;
    public string PhoneNumber { get; set; } = null!;
    public string Role { get; set; } = null!;
    public string? StudentNumber { get; set; }
    public string? Faculty { get; set; }
    public string? Department { get; set; }
    public string? Grade { get; set; }
    public decimal? Gpa { get; set; }
    public Guid? CompanyId { get; set; }
}

public class Company : BaseEntity<Guid>
{
    public Guid FirmaID { get => Id; set => Id = value; }
    public string CompanyName { get; set; } = null!;
    public string TaxNumber { get; set; } = null!;
    public string TaxOffice { get; set; } = null!;
    public string AuthorizedPerson { get; set; } = null!;
    public string Phone { get; set; } = null!;
    public string Email { get; set; } = null!;
    public string Sector { get; set; } = null!;
    public string TaxDocumentUrl { get; set; } = null!;
    public int ApprovalStatus { get; set; } // 0: Pending, 1: Approved, 2: Rejected
}

public class JobPosting : BaseEntity<Guid>
{
    public Guid IsIlaniID { get => Id; set => Id = value; }
    public Guid CompanyId { get; set; }
    public string Title { get; set; } = null!;
    public string Location { get; set; } = null!;
    public string WorkType { get; set; } = null!;
    public string Description { get; set; } = null!;
    public string RequirementsJson { get; set; } = null!;
    public string TargetedDepartmentsJson { get; set; } = null!;
    public DateTime DeadlineDate { get; set; }
    public int ModerationStatus { get; set; } // 0: Draft, 1: Pending, 2: Published, 3: Revision, 4: Rejected
}

public class Application : BaseEntity<Guid>
{
    public Guid BasvuruID { get => Id; set => Id = value; }
    public Guid JobPostingId { get; set; }
    public Guid StudentId { get; set; }
    public string StudentFullName { get; set; } = null!;
    public string StudentEmail { get; set; } = null!;
    public string Department { get; set; } = null!;
    public string Gpa { get; set; } = null!;
    public string CvFileUrl { get; set; } = null!;
    public string Status { get; set; } = "Değerlendirmede"; // Değerlendirmede, Mülakata Çağrıldı, Kabul Edildi, Reddedildi
    public DateTime AppliedAt { get; set; } = DateTime.UtcNow;
}
