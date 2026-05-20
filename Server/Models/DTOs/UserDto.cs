using System.ComponentModel.DataAnnotations;

namespace ISD_Project.Server.Models.DTOs
{
    public class UserDto
    {
        public int Id { get; set; }
        [Required]
        [StringLength(12, MinimumLength = 12)]
        [RegularExpression(@"^[0-9]*$", ErrorMessage = "Only numbers are allowed.")]
        public string IdentityDocumentId { get; set; } = String.Empty;
        public DateOnly DateIssued { get; set; }
        public DateOnly ValidUntil { get; set; }
        [Required, EmailAddress]
        public string Email { get; set; } = String.Empty;
        [Required]
        public string Name { get; set; } = String.Empty;
        [Required]
        public int Gender { get; set; } = (int)GenderType.Male;
        public DateOnly DateOfBirth { get; set; }
        public string Address { get; set; } = String.Empty;
        [Required]
        [RegularExpression(@"^\+84[0-9]*$", ErrorMessage = "The phone number must start with the country code +84.")]
        [StringLength(13)]
        public string PhoneNumber { get; set; } = String.Empty;

        public string Discriminator { get; set; } = String.Empty;
    }
}
