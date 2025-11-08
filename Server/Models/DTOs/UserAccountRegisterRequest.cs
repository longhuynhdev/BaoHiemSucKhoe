using System.ComponentModel.DataAnnotations;

namespace ISD_Project.Server.Models.DTOs
{
    public class UserAccountRegisterRequest
    {
        public UserAccountRegisterRequest()
        {
            Email = string.Empty;
            Password = string.Empty;
            ConfirmPassword = string.Empty;

        }
        public UserAccountRegisterRequest(string email, string password, string confirmPassword, RoleType role)
        {
            Email = email;
            Password = password;
            ConfirmPassword = confirmPassword;
            Role = role;
        }
        //Validates that the email is in the correct format
        [Required, EmailAddress]
        public string Email { get; set; }
        [Required]
        public string Password { get; set; }
        //Makes sure that the password and confirm password are the same
        [Required, Compare("Password")]
        public string ConfirmPassword { get; set; }
        public RoleType Role { get; set; }
    }


}
