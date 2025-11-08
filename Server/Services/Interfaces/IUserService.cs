using ISD_Project.Server.Models;
using Microsoft.AspNetCore.Mvc;

namespace ISD_Project.Server.Services.Interfaces
{
    public interface IUserService
    {
        Task<IActionResult> GetUserAsync();
        Task<IActionResult> GetUserByIdAsync(int id);
    }
}
