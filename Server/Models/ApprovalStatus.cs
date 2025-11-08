using System.ComponentModel.DataAnnotations;

namespace ISD_Project.Server.Models
{
    public class ApprovalStatus
    {
        [Key]
        public int Id { get; set; }
        // Foreign key to Customer
        [Required]
        public int CustomerId { get; set; }
        public Customer? Customer { get; set; }
        //Foreign key to Insurance
        [Required]
        public int InsuranceId { get; set; }
        public Insurance? Insurance { get; set; }

        // Foreign key to ValidateDepartment
        [Required]
        public int ValidationDepartmentId { get; set; }
        public ValidationDepartment? ValidationDepartment { get; set; }
        [Required]
        public ProfileStatus ProfileStatus { get; set; }
        public DateOnly ApprovalDate { get; set; }
        public string ApprovalComment { get; set; } = String.Empty;
    }
}