using System.ComponentModel.DataAnnotations;

namespace ISD_Project.Server.Models.DTOs
{
    public class UserForgotPasswordRequest
    {
        [Required, EmailAddress]
        public string Email { get; set; } = string.Empty;
    }
}
