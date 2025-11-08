using ISD_Project.Server.Models.DTOs;
using ISD_Project.Server.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ISD_Project.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class InsuranceContractController : ControllerBase
    {
        private readonly IInsuranceContractService _insuranceContractService;
        public InsuranceContractController(IInsuranceContractService insuranceContractService)
        {
            _insuranceContractService = insuranceContractService;
        }

        [HttpGet("get-insurance-contract")]
        public async Task<IActionResult> GetAllInsuranceContract()
        {
            try
            {
                var insuranceContracts = await _insuranceContractService.GetInsuranceContractsAsync();
                return Ok(insuranceContracts);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message); // Internal Server Error
            }
        }
        [HttpGet("get-insurance-contract-pending-approval")]
        public async Task<IActionResult> GetAllInsuranceContractPendingApproval()
        {
            try
            {
                var insuranceContracts = await _insuranceContractService.GetInsuranceContractsPendingApproval();
                return Ok(insuranceContracts);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message); // Internal Server Error
            }
        }

        [HttpPost("add-insurance-contract")]
        public async Task<IActionResult> AddInsuranceContract(InsuranceContractDto insuranceContractDto)
        {
            return await _insuranceContractService.AddInsuranceContractAsync(insuranceContractDto);
        }

        [HttpGet("pending-contracts")]
        public async Task<IActionResult> InsuranceApproval()
        {
            return await _insuranceContractService.GetInsuranceApproval();
        }
      
    }
}
