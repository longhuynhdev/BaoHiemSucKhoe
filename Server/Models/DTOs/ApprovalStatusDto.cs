namespace ISD_Project.Server.Models.DTOs;

public class ApprovalStatusDto
{
    // Foreign key to Customer
    public int CustomerId { get; set; }
    //Foreign key to Insurance
    public int InsuranceId { get; set; }
    // Foreign key to ValidateDepartment
    public int ValidationDepartmentId { get; set; }
    public ProfileStatus ProfileStatus { get; set; }
    public DateOnly ApprovalDate { get; set; }
    public string ApprovalComment { get; set; } = String.Empty;
}
