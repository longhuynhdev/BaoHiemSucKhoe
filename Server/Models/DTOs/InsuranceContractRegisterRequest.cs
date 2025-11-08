namespace ISD_Project.Server.Models.DTOs
{
    public class InsuranceContractRegisterRequest
    {
        public int InsuranceId { get; set; }
        public required CustomerRegisterRequest CustomerRegisterRequest { get; set; }
        public required HealthInformationDto HealthInformationDto { get; set; } 
    }
}
