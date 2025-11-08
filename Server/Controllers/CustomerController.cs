using ISD_Project.Server.Models.DTOs;
using ISD_Project.Server.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ISD_Project.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class CustomerController : ControllerBase
    {
        private readonly ICustomerService _customerService;
        public CustomerController(ICustomerService customerService)
        {
            _customerService = customerService;

        }

        [HttpPost("add-customer")]
        public async Task<IActionResult> AddCustomer(CustomerRegisterRequest request)
        {
            var result = await _customerService.AddCustomerAsync(request);
            return result.result;
        }

        [HttpDelete("delete-customer/{id}"), Authorize(Roles = "Admin")]
        public Task<IActionResult> DeleteCustomer(int id)
        {
            return _customerService.DeleteCustomerForceAsync(id);
        }
        
        [HttpGet("get-customer"), Authorize(Roles = "Admin")]
        public Task<IActionResult> GetCustomer()
        {
            return _customerService.GetCustomerAsync();
        }

        [HttpGet("get-customer/{id}"), Authorize(Roles = "Admin")]
        public Task<IActionResult> GetCustomer(int id)
        {
            return _customerService.GetCustomerAsync(id);
        }


    }
}
