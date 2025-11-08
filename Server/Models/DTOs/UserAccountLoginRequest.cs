using System.ComponentModel.DataAnnotations;

namespace ISD_Project.Server.Models.DTOs
{
    public class UserAccountLoginRequest
    {
        [Required, EmailAddress]
        public string Email { get; set; } = string.Empty;
        [Required]
        public string Password { get; set; } = string.Empty;
    }
}
