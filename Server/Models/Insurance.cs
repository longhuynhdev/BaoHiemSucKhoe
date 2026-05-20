using System.ComponentModel.DataAnnotations;
using ISD_Project.Server.Models.DTOs;

namespace ISD_Project.Server.Models
{
    public class Insurance
    {
        [Key]
        public int InsuranceId { get; set; }
        [Required]
        public string InsuranceName { get; set; } = string.Empty;
        public int CoveragePeriodInYears { get; set; } // thời gian hiệu lực của bảo hiểm
        public string SummaryDescription { get; set; } = string.Empty;
        public string DetailDescription { get; set; } = string.Empty;
        public decimal PriceAmount { get; set; }
        public string? ImageUrl { get; set; } = string.Empty;

        // 1 Insurance thuộc về 1 InsuranceType
        public int? InsuranceTypeId { get; set; }
        public InsuranceType? InsuranceType { get; set; }

        // 1 Insurance có nhiều InsuranceContract
        public ICollection<InsuranceContract>? InsuranceContracts { get; set; }

        // 1 Insurance có nhiều ApprovalStatus
        public ICollection<ApprovalStatus>? ApprovalStatuses { get; set; }

    }
}
