using BaoHiemSucKhoe.Server.Services.Interfaces;
using Core.DTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BaoHiemSucKhoe.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ValidateController : ControllerBase
    {
        private readonly IValidationService _validationService;
        public ValidateController(IValidationService validationService)
        {
            this._validationService = validationService;
        }
        [HttpPost("validate-insurance-contract"), Authorize(Roles = "Admin, ValidationDepartment")]
        public Task<IActionResult> ValidateInsuranceContract(InsuranceContractRegisterRequest request)
        {
            return _validationService.ValidateInsuranceContractAsync(request);
        }
        [HttpPost("validate-user-account")]
        public Task<IActionResult> ValidateUserAccount(UserAccountValidateRequest request)
        {
            return _validationService.ValidateUserAccountAsync(request);
        }
    }
}
