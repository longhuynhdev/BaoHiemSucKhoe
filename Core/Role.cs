using System.ComponentModel.DataAnnotations;

namespace Core
{
    public class Role
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; } = String.Empty;
        public ICollection<UserRole>? UserRoles { get; set; }
    }
    
}
