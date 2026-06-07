using Core;
using Core.DTOs;
using Microsoft.AspNetCore.Mvc;

namespace BaoHiemSucKhoe.Server.Services.Interfaces;

public interface IInsuranceContractService
{
    Task<IActionResult> AddInsuranceContractAsync(InsuranceContractDto insuranceContract);
    Task<IActionResult> DeleteInsuranceContractAsync(int id);
    Task<IActionResult> GetInsuranceContractAsync(int id);
    Task<List<InsuranceContract>> GetInsuranceContractsAsync();
    Task<List<InsuranceContract>> GetInsuranceContractsPendingApproval();
    Task<IActionResult> GetInsuranceApproval();

    Task<IActionResult> UpdateInsuranceContractAsync(InsuranceContract insuranceContract);
}
