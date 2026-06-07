using Core.DTOs;
using Microsoft.AspNetCore.Mvc;

namespace BaoHiemSucKhoe.Server.Services.Interfaces
{
    public interface ICustomerService
    {
        Task<IActionResult> GetCustomerAsync();
        Task<IActionResult> GetCustomerAsync(int id);
        Task<(IActionResult result, int customerId)> AddCustomerAsync(CustomerRegisterRequest request);
        Task<IActionResult> DeleteCustomerForceAsync(int userId);
    }
}
