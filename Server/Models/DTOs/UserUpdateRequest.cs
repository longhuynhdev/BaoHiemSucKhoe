using System.ComponentModel.DataAnnotations;

namespace ISD_Project.Server.Models.DTOs
{
    public class UserUpdateModel
    {
        [Key]
        public int Id { get; set; }

        public string? Name { get; set; } = String.Empty;

        [EmailAddress]
        public string? Email { get; set; } = String.Empty;

        [Required]
        [RegularExpression(@"^\+84[0-9]*$", ErrorMessage = "The phone number must start with the country code +84.")]
        [MinLength(13), MaxLength(13)]
        public string? Phone { get; set; } = String.Empty;

        [StringLength(12, MinimumLength = 12)]
        [RegularExpression(@"^[0-9]*$", ErrorMessage = "Only numbers are allowed.")]
        public string? IdentityDocumentId { get; set; } = String.Empty;
        
        public DateOnly? DateIssued { get; set; }
        
        public DateOnly? ValidUntil { get; set; }
        
        public DateOnly? DateOfBirth { get; set; }

        public int? Gender { get; set; } = (int)GenderType.Male;

        public string? Address { get; set; } = String.Empty;
    }
}