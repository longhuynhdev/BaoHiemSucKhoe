using System.ComponentModel.DataAnnotations;
using Core.Enums;

namespace Core.DTOs;

public class UserAccountDto
{
    [Key]
    public int Id { get; set; }
    [Required, EmailAddress]
    public string Email { get; set; } = String.Empty;
    public int IsActivated { get; set; } = (int)AccountStatus.Inactive;
    public UserRole? UserRole { get; set; }
    public int? UserId { get; set; }
}
