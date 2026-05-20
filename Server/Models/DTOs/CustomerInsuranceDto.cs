namespace ISD_Project.Server.Models.DTOs
{
    public class CustomerInsuranceDto
    {
        public required CustomerDto CustomerDto { get; set; }
        public required InsuranceDto InsuranceDto { get; set; }
    }
}
