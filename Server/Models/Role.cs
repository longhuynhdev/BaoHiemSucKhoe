using System.ComponentModel.DataAnnotations;

namespace ISD_Project.Server.Models
{
    public class Role
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; } = String.Empty;
        public ICollection<UserRole>? UserRoles { get; set; }
    }
    
}
