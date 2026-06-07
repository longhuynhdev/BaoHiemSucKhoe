using Microsoft.AspNetCore.Mvc;

namespace BaoHiemSucKhoe.Server.Services.Interfaces
{
    public interface IUserService
    {
        Task<IActionResult> GetUserAsync();
        Task<IActionResult> GetUserByIdAsync(int id);
    }
}
