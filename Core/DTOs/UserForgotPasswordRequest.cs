using System.ComponentModel.DataAnnotations;

namespace Core.DTOs
{
    public class UserForgotPasswordRequest
    {
        [Required, EmailAddress]
        public string Email { get; set; } = string.Empty;
    }
}
