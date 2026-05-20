namespace ISD_Project.Server.Models.DTOs;

public class InsuranceContractDto
{
    public InsuranceContractDto() { 
        ProfileStatus = ProfileStatus.Pending;
        StartDate = DateOnly.FromDateTime(DateTime.Now);
        EndDate = DateOnly.FromDateTime(DateTime.Now.AddYears(5));
    }
    public InsuranceContractDto(int customerId, int insuranceId) : this()
    {
        CustomerId = customerId;
        InsuranceId = insuranceId;
    }
    public int CustomerId { get; set; }
    public int InsuranceId { get; set; }
    public ProfileStatus ProfileStatus { get; set; }
    public DateOnly StartDate { get; set; }
    public DateOnly EndDate { get; set; }
}
