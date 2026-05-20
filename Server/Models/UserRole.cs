using System.ComponentModel.DataAnnotations;

namespace ISD_Project.Server.Models
{

    public class UserRole
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public int UserAccountId { get; set; }
        public UserAccount? UserAccount { get; set; }
        [Required]
        public int RoleId { get; set; }
        public Role? Role { get; set; }
    }


}
