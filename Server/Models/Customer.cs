namespace ISD_Project.Server.Models
{
    public class Customer : User
    {
        public string Nationality { get; set; } = String.Empty;
        public string Job { get; set; } = String.Empty;
        // 1 Customer có 1 HealthInformation
        public HealthInformation? HealthInformation { get; set; }
        // 1 Customer có nhiều InsuranceContract
        public ICollection<InsuranceContract>? InsuranceContracts { get; set; }
        // 1 Customer có nhiều ApprovalStatus
        public ICollection<ApprovalStatus>? ApprovalStatuses { get; set; }
    }
}
