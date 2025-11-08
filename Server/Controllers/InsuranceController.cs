using ISD_Project.Server.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ISD_Project.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class InsuranceController : ControllerBase
    {
        private readonly IInsuranceService _insuranceService;
        public InsuranceController(IInsuranceService insuranceService)
        {
            this._insuranceService = insuranceService;
        }

        [HttpGet("get-insurance"), AllowAnonymous]
        public Task<IActionResult> GetInsurances()
        {
            return _insuranceService.GetInsurancesAsync();
        }

        [HttpGet("get-insurance/{id}"), AllowAnonymous]
        public Task<IActionResult> GetInsurances(int id)
        {
            return _insuranceService.GetInsuranceByTypesAsync(id);
        }

        [HttpGet("get-insurance-detail/{id}"), AllowAnonymous]
        public Task<IActionResult> GetInsurancesDetail(int id)
        {
            return _insuranceService.GetInsuranceDetailAsync(id);
        }

        [HttpGet("get-insurance-type"), AllowAnonymous]
        public Task<IActionResult> GetInsurancesType()
        {
            return _insuranceService.GetInsuranceTypesAsync();
        }
    }
}
