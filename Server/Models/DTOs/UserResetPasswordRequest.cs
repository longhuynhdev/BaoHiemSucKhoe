using System.ComponentModel.DataAnnotations;

namespace ISD_Project.Server.Models.DTOs;

public class UserResetPasswordRequest
{
    [Required]
    public string Token { get; set; } = string.Empty;
    [Required]
    public string Password { get; set; } = string.Empty;
    //Makes sure that the password and confirm password are the same
    [Required, Compare("Password")]
    public string ConfirmPassword { get; set; } = string.Empty;
}
