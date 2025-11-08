using System.ComponentModel.DataAnnotations;

namespace ISD_Project.Server.Models.DTOs;

public class InsuranceType
{
    [Key]
    public int Id { get; set; }

    [Required]
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;

    // 1 InsuranceType có thể có nhiều Insurance
    public List<Insurance>? Insurances { get; set; }
}
