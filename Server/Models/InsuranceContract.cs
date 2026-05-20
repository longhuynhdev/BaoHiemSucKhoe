using System.ComponentModel.DataAnnotations;
using ISD_Project.Server.Models;

namespace ISD_Project.Server;

public class InsuranceContract
{
    [Key]
    public int Id { get; set; }
    // 1 Hợp đồng bảo hiểm thuộc về 1 khách hàng
    [Required]
    public int CustomerId { get; set; }
    public Customer? Customer { get; set; }
    // 1 Hợp đồng bảo hiểm thuộc về 1 sản phẩm bảo hiểm
    [Required]
    public int InsuranceId { get; set; }
    public Insurance? Insurance { get; set; }
    [Required]
    public ProfileStatus ProfileStatus { get; set; }
    public DateOnly StartDate { get; set; }
    public DateOnly EndDate { get; set; }
}
