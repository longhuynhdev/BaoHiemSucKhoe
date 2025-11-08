namespace ISD_Project.Server.Models.DTOs;

public class ApprovalStatusResponse
{
    public string CustomerName { get; set; } = String.Empty;
    public string CustomerEmail { get; set; } = String.Empty;
    public string ValidationDepartmentName { get; set; } = String.Empty;
    public string InsuranceName { get; set; } = String.Empty;

    public string ProfileStatus { get; set; } = String.Empty;
    public DateOnly ApprovalDate { get; set; }
    public string ApprovalComment { get; set; } = String.Empty;
}
