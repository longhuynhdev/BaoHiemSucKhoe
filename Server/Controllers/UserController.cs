using ISD_Project.Server.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ISD_Project.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;
        public UserController(IUserService userService)
        {
            this._userService = userService;
        }

        [HttpGet("get-user"), AllowAnonymous]
        public Task<IActionResult> GetUser()
        {
            return _userService.GetUserAsync();
        }

        [HttpGet("get-user/{id}"), Authorize(Roles = "Admin, Customer, FinancialDepartment, ValidationDepartment, CustomerCareDepartment")]
        public Task<IActionResult> GetUserById(int id)
        {
            return _userService.GetUserByIdAsync(id);
        }

    }
}
