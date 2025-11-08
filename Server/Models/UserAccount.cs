using System.ComponentModel.DataAnnotations;
namespace ISD_Project.Server.Models
{
    public class UserAccount
    {
        [Key]
        public int Id { get; set; }
        [Required, EmailAddress]
        public string Email { get; set; } = String.Empty;
        public byte[] PasswordHash { get; set; } = new byte[32];
        public byte[] PasswordSalt { get; set; } = new byte[32];
        public string VerificationToken { get; set; } = String.Empty;
        public DateTime? VerifiedAt { get; set; }
        public string? PasswordResetToken { get; set; }
        public DateTime? RestTokenExpires { get; set; }
        public int IsActivated { get; set; } = (int)AccountStatus.Inactive;
        public UserRole? UserRole { get; set; }
        public int? UserId { get; set; }
        public User? User { get; set; }

    }

}
